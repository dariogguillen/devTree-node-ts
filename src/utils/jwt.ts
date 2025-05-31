import jwt, { JwtPayload } from "jsonwebtoken";

export const generateJWT = (payload: JwtPayload) => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not found");
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "180d",
  });
  return token;
};

export const verifyJWT = (token: string) => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not found");
  return jwt.verify(token, process.env.JWT_SECRET);
};
