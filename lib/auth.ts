import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import type { AuthUser } from "@/types";
import { AUTH_COOKIE_NAME } from "@/lib/constants";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable");
}

export { AUTH_COOKIE_NAME };

const SHORT_SESSION_SECONDS = 60 * 60 * 24; // 1 day
const LONG_SESSION_SECONDS = 60 * 60 * 24 * 30; // 30 days

interface TokenPayload {
  userId: string;
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signToken(userId: string, rememberMe: boolean) {
  const expiresIn = rememberMe ? LONG_SESSION_SECONDS : SHORT_SESSION_SECONDS;
  const token = jwt.sign({ userId } satisfies TokenPayload, JWT_SECRET, {
    expiresIn,
  });

  return { token, maxAge: expiresIn };
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  await connectDB();
  const user = await User.findById(payload.userId).select("name email");

  if (!user) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
}
