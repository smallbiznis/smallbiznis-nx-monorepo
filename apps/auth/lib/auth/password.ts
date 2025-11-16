import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

export function hashPassword(password: string) {
  if (!password) {
    throw new Error("Password is required");
  }
  return bcrypt.hashSync(password, SALT_ROUNDS)
}

export function verifyPassword(password: string, hash: string | null | undefined) {
  if (!hash) return Promise.resolve(false);
  return bcrypt.compare(password, hash);
}
