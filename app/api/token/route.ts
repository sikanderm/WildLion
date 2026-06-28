import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  console.log("HEADERS ALL:", Object.fromEntries(req.headers.entries()));

  console.log("x-api-key only:", req.headers.get("x-api-key"));
  console.log("ENV API_KEY:", process.env.API_KEY);

  const apiKey = req.headers.get("x-api-key");

  if (apiKey !== process.env.API_KEY) {
    return new Response("Unauthorized", { status: 401 });
  }
  const token = jwt.sign({}, process.env.JWT_SECRET!, {
    expiresIn: "60s",
  });

  return Response.json({ token });
}
