import { destroySession } from "@/lib/auth/session";
import { jsonResponse } from "@/app/oauth/utils";

export async function POST(req: Request) {
  await destroySession(req);
  return jsonResponse({ logged_out: true });
}
