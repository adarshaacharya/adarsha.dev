import { NextRequest, NextResponse } from "next/server";
import { unsubscribeNewsletterSubscriber } from "@/lib/turso";

const tokenPattern = /^[A-Za-z0-9_-]{43}$/;

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const destination = new URL("/newsletter/unsubscribe", request.url);

  if (token) {
    destination.searchParams.set("token", token);
  }

  return NextResponse.redirect(destination);
}

export async function POST(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (token && tokenPattern.test(token)) {
    await unsubscribeNewsletterSubscriber(token);
  }

  return new NextResponse(null, { status: 200 });
}
