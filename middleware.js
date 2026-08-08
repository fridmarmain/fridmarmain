import { NextResponse } from "next/server";

// In-Memory store for IP tracking (resides in Edge Instance memory)
const rateLimitMap = new Map();

// CONFIGURATION
const LIMIT = 20; // Max allowed requests per window
const WINDOW_MS = 60 * 1000; // Time window: 1 minute (60,000ms)

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // 1. Reset counter if IP hasn't been seen or time window expired
  if (!record || now - record.startTime > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, startTime: now });
    return { limited: false, remaining: LIMIT - 1 };
  }

  // 2. Block request if IP exceeded limit within window
  if (record.count >= LIMIT) {
    return { limited: true, remaining: 0 };
  }

  // 3. Increment counter for valid request
  record.count += 1;
  return { limited: false, remaining: LIMIT - record.count };
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // ----------------------------------------------------
  // STEP 1: Bot Trap Check (Malformed Slugs & Parameters)
  // ----------------------------------------------------
  if (pathname.startsWith("/practice")) {
    const isMalformedSlug =
      pathname.includes(",") ||
      pathname.includes("%2C") ||
      pathname.split("/").filter(Boolean).length > 4;

    if (isMalformedSlug) {
      // Reject instantly at the edge
      return new NextResponse("Invalid request structure", { status: 400 });
    }
  }

  // ----------------------------------------------------
  // STEP 2: In-Memory Rate Limiter
  // ----------------------------------------------------
  // Extract client IP (Vercel provides this in x-forwarded-for header)
  const xff = request.headers.get("x-forwarded-for");
  const ip = xff ? xff.split(",")[0].trim() : "127.0.0.1";

  // Check rate limit status for this IP
  const { limited, remaining } = isRateLimited(ip);

  if (limited) {
    return new NextResponse(
      JSON.stringify({
        error: "Too Many Requests",
        message: "You have exceeded the request limit for dynamic routes.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
        },
      },
    );
  }

  // ----------------------------------------------------
  // STEP 3: Pass request along with RateLimit Headers
  // ----------------------------------------------------
  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Limit", String(LIMIT));
  response.headers.set("X-RateLimit-Remaining", String(remaining));

  return response;
}

// Apply middleware to all dynamic/vulnerable slug paths
export const config = {
  matcher: ["/practice/:path*", "/blog/:path*", "/category/:path*"],
};
