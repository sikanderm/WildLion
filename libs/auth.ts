import jwt from "jsonwebtoken";

export function getToken() {
  const secret = process.env.JWT_SECRET!;
  return jwt.sign({}, secret, { expiresIn: "60s" });
}
