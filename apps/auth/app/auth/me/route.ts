import { getSessionUser } from "@/lib/auth/session";
import { jsonError, jsonResponse } from "@/app/oauth/utils";

export async function GET(req: Request) {
  const sessionUser = await getSessionUser(req);
  if (!sessionUser) {
    return jsonError("unauthorized", "No active session", 401);
  }

  return jsonResponse({
    user: {
      id: sessionUser.id,
      email: sessionUser.email,
      name: sessionUser.name,
      tenant_id: sessionUser.tenantId,
    },
  });
}
