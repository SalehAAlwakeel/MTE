import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  console.log("MTE inquiry", {
    name: body.name,
    email: body.email,
    phone: body.phone ?? "",
    message: body.message,
  });

  return NextResponse.json({ ok: true });
}
