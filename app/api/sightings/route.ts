import jwt from "jsonwebtoken";
import lionData from "@/app/api/Data/liondb.sightings.json";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");

  console.log("🦁 /api/sightings HIT");
  console.log("Authorization header:", auth);
  console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

  if (!auth?.startsWith("Bearer ")) {
    console.log("❌ Missing or invalid Authorization header");
    return new Response("Unauthorized", { status: 401 });
  }

  const token = auth.substring(7).trim();

  console.log("🔑 Extracted token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("✅ JWT VERIFIED:", decoded);
  } catch (err) {
    console.log("❌ JWT VERIFY FAILED:", err);
    return new Response("Invalid or expired token", {
      status: 401,
    });
  }

  console.log("✅ Returning sightings data");

  return Response.json(lionData);
}
