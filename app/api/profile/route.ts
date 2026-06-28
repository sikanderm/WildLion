// Get a token
import jwt from "jsonwebtoken";
import lionData from "@/app/api/Data/liondb.lionprofiles.json";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");

  if (!auth?.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    jwt.verify(auth.substring(7), process.env.JWT_SECRET!);
  } catch {
    return new Response("Invalid or expired token", {
      status: 401,
    });
  }

  return Response.json(lionData);
}
