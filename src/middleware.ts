import {
  NextRequest,
  NextResponse,
  NextFetchEvent,
  userAgent,
} from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (userAgent(req).isBot) {
    return new Response("I hope you are not a bot.", { status: 403 });
  }
  if (!req.cookies.has("carrotsession") && !req.url.includes("/enter")) {
    req.nextUrl.searchParams.set("from", req.nextUrl.pathname);
    req.nextUrl.pathname = "/enter";
    return NextResponse.redirect(req.nextUrl);
  }
  // return NextResponse.json({ ok: true });
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
