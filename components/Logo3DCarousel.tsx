"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { partners, type Partner } from "@/lib/data";

type Props = {
  logos?: Partner[];
  label?: string;
  itemHeight?: number;
  gap?: number;
  speed?: number;
  direction?: "left" | "right";
  maxBlur?: number;
  blurEnd?: number;
  pauseOnHover?: boolean;
  easingResponsiveness?: number;
  enableDrag?: boolean;
  minScale?: number;
  maxScale?: number;
};

const FALLBACK_BG = "#cbd5e1";
const MAX_SCREEN_WIDTH_BUFFER = 4840;

function calculateMagnification(
  distanceFromCenter: number,
  screenCenter: number,
  avgScale: number,
  scaleConstant: number,
  piDivCenter: number,
  centerDivPi: number,
  minScale: number,
) {
  if (Math.abs(distanceFromCenter) <= screenCenter) {
    return {
      warpedX: avgScale * distanceFromCenter + scaleConstant * centerDivPi * Math.sin(distanceFromCenter * piDivCenter),
      finalScale: avgScale + scaleConstant * Math.cos(distanceFromCenter * piDivCenter),
    };
  }

  const sign = Math.sign(distanceFromCenter);
  return {
    warpedX: sign * (avgScale * screenCenter) + minScale * (distanceFromCenter - sign * screenCenter),
    finalScale: minScale,
  };
}


export function Logo3DCarousel({
  logos = partners,
  label = "Logos",
  itemHeight = 128,
  gap = 72,
  speed = 28,
  direction = "left",
  maxBlur = 5,
  blurEnd = 52,
  pauseOnHover = true,
  easingResponsiveness = 4,
  enableDrag = true,
  minScale = 0.22,
  maxScale = 2,
}: Props) {
  const propsRef = useRef({
    gap,
    speed,
    direction,
    maxBlur,
    blurEnd,
    pauseOnHover,
    easingResponsiveness,
    minScale,
    maxScale,
  });
  propsRef.current = {
    gap,
    speed,
    direction,
    maxBlur,
    blurEnd,
    pauseOnHover,
    easingResponsiveness,
    minScale,
    maxScale,
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globalOffsetRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const lastDragXRef = useRef(0);

  const [containerWidth, setContainerWidth] = useState(0);
  const [loadedImages, setLoadedImages] = useState<(HTMLImageElement | null)[]>([]);

  const containerHeight = itemHeight;
  const baseItemHeight = itemHeight / maxScale;
  const canvasPaddingY = Math.ceil(maxBlur) * 3;
  const extendedCanvasHeight = containerHeight + canvasPaddingY * 2;

  const { safeImages, renderCount, precalculatedWidths, precalculatedHeights } = useMemo(() => {
    const sImages = loadedImages.length > 0 ? loadedImages : [null];
    const widths = sImages.map((img, index) => {
      if (!img || !img.naturalHeight) return baseItemHeight;
      const scale = logos[index % logos.length]?.scale ?? 1;
      return (baseItemHeight / img.naturalHeight) * img.naturalWidth * scale;
    });
    const heights = sImages.map((_, index) => {
      const scale = logos[index % logos.length]?.scale ?? 1;
      return baseItemHeight * scale;
    });
    const setWidth = widths.reduce((sum, w) => sum + w + gap, 0);
    const setsNeeded = Math.max(2, Math.ceil(MAX_SCREEN_WIDTH_BUFFER / (setWidth || 1)));
    return {
      safeImages: sImages,
      renderCount: setsNeeded * sImages.length,
      precalculatedWidths: widths,
      precalculatedHeights: heights,
    };
  }, [loadedImages, baseItemHeight, gap, logos]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setContainerWidth(entry.contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let active = true;
    const pending: HTMLImageElement[] = [];

    Promise.all(
      logos.map(
        (logo) =>
          new Promise<HTMLImageElement | null>((resolve) => {
            if (!logo.src) return resolve(null);
            const image = new Image();
            pending.push(image);
            image.onload = () => resolve(image);
            image.onerror = () => resolve(null);
            image.src = logo.src;
          }),
      ),
    ).then((results) => {
      if (active) setLoadedImages(results);
    });

    return () => {
      active = false;
      pending.forEach((img) => {
        img.onload = null;
        img.onerror = null;
        img.src = "";
      });
    };
  }, [logos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || containerWidth === 0 || loadedImages.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let lastTime = performance.now();
    let isVisible = false;
    let hasRenderedOnce = false;
    let lastRenderedOffset = globalOffsetRef.current;
    let currentSpeed = propsRef.current.pauseOnHover && isHoveredRef.current ? 0 : propsRef.current.speed;

    const screenCenter = containerWidth / 2;
    const piDivCenter = Math.PI / screenCenter;
    const centerDivPi = screenCenter / Math.PI;
    const positions = new Float32Array(renderCount);
    let wrapLength = 0;
    let maxW = 0;

    for (let i = 0; i < renderCount; i += 1) {
      const texIdx = i % safeImages.length;
      const w = precalculatedWidths[texIdx] || baseItemHeight;
      if (w > maxW) maxW = w;
      positions[i] = wrapLength;
      wrapLength += w + propsRef.current.gap;
    }

    const minXBound = -maxW * 2;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = extendedCanvasHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const render = (currentTime: number) => {
      if (!isVisible) return;

      const p = propsRef.current;
      const scaleConstant = (p.maxScale - p.minScale) / 2;
      const avgScale = p.minScale + scaleConstant;
      const scaleRange = p.maxScale - p.minScale;
      const blurEndRadius = screenCenter * (p.blurEnd / 100);
      const dirMultiplier = p.direction === "right" ? -1 : 1;
      const delta = currentTime - lastTime;
      lastTime = currentTime;
      const dt = Math.min(delta / 1000, 0.05);

      const targetSpeed = (p.pauseOnHover && isHoveredRef.current) || isDraggingRef.current ? 0 : p.speed;
      currentSpeed += (targetSpeed - currentSpeed) * p.easingResponsiveness * dt;
      globalOffsetRef.current += currentSpeed * dt * dirMultiplier;

      const offsetChanged = Math.abs(globalOffsetRef.current - lastRenderedOffset) > 0.001;
      const isIdle = Math.abs(currentSpeed) < 0.01 && !offsetChanged;

      if (isIdle && hasRenderedOnce) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      hasRenderedOnce = true;
      lastRenderedOffset = globalOffsetRef.current;
      const currentOffset = globalOffsetRef.current;

      ctx.clearRect(0, 0, containerWidth, extendedCanvasHeight);

      for (let i = 0; i < renderCount; i += 1) {
        const texIdx = i % safeImages.length;
        const img = loadedImages[texIdx];
        const w = precalculatedWidths[texIdx] || baseItemHeight;
        const drawH = precalculatedHeights[texIdx] || baseItemHeight;
        const baseX = positions[i];
        let relativeX = (baseX - currentOffset - minXBound) % wrapLength;
        if (relativeX < 0) relativeX += wrapLength;
        const currentX = relativeX + minXBound;
        const unwarpedCenter = currentX + w / 2;
        const distanceFromCenter = unwarpedCenter - screenCenter;
        const { warpedX, finalScale } = calculateMagnification(
          distanceFromCenter,
          screenCenter,
          avgScale,
          scaleConstant,
          piDivCenter,
          centerDivPi,
          p.minScale,
        );
        const finalX = screenCenter + warpedX - w / 2;
        const absDist = Math.abs(distanceFromCenter);

        let exactBlurAmount = 0;
        if (p.maxBlur > 0) {
          if (blurEndRadius <= 0 || absDist >= blurEndRadius) {
            exactBlurAmount = p.maxBlur;
          } else {
            const blurProgress = absDist / blurEndRadius;
            const smoothProgress = blurProgress * blurProgress * (3 - 2 * blurProgress);
            exactBlurAmount = smoothProgress * p.maxBlur;
          }
        }

        const depthRatio = (finalScale - p.minScale) / scaleRange;
        const opacity = 0.45 + 0.55 * depthRatio;
        const centerX = finalX + w / 2;
        const centerY = extendedCanvasHeight / 2;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(finalScale, finalScale);
        ctx.globalAlpha = opacity;
        const localBlurAmount = exactBlurAmount / finalScale;
        ctx.filter = localBlurAmount > 0.1 ? `blur(${localBlurAmount}px)` : "none";

        const drawX = -w / 2;
        const drawY = -drawH / 2;
        if (img) {
          ctx.drawImage(img, drawX, drawY, w, drawH);
        } else {
          ctx.fillStyle = FALLBACK_BG;
          ctx.beginPath();
          ctx.roundRect(drawX, drawY, w, drawH, 8);
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isVisible = true;
        lastTime = performance.now();
        if (!animationFrameId) animationFrameId = requestAnimationFrame(render);
      } else {
        isVisible = false;
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      }
    });

    observer.observe(container);
    return () => {
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [containerWidth, loadedImages, renderCount, precalculatedWidths, precalculatedHeights, baseItemHeight, extendedCanvasHeight]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!enableDrag || logos.length === 0) return;
    isDraggingRef.current = true;
    lastDragXRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
    if (containerRef.current) containerRef.current.style.cursor = "grabbing";
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!enableDrag || !isDraggingRef.current) return;
    const deltaX = event.clientX - lastDragXRef.current;
    lastDragXRef.current = event.clientX;
    globalOffsetRef.current -= deltaX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!enableDrag) return;
    isDraggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (containerRef.current) containerRef.current.style.cursor = "grab";
  };

  return (
    <div
      ref={containerRef}
      onPointerEnter={() => {
        isHoveredRef.current = true;
      }}
      onPointerLeave={() => {
        isHoveredRef.current = false;
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-full select-none"
      role="img"
      aria-label={`${label}: ${logos.map((logo) => logo.name).join(", ")}`}
      style={{
        height: containerHeight,
        overflow: "visible",
        cursor: logos.length > 0 && enableDrag ? "grab" : "default",
        touchAction: enableDrag ? "pan-y" : "auto",
      }}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute left-0 block"
        style={{
          width: "100%",
          height: extendedCanvasHeight,
          top: -canvasPaddingY,
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      />
    </div>
  );
}
