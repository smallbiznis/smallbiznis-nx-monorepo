import { db } from "@/lib/db/client";
import { tenantBranding } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getTenantBranding(tenantId: bigint) {
  const [row] = await db
    .select()
    .from(tenantBranding)
    .where(eq(tenantBranding.tenantId, tenantId))
    .limit(1);

  return (
    row || {
      // fallback default
      logoUrl: "/default-logo.svg",
      primaryColor: "#5B3CF6",
      secondaryColor: "#18181B",
      accentColor: "#7E65FA",
      backgroundColor: "#111113",
      textColor: "#FFFFFF",
      darkMode: true,
      loginTitle: "Sign in",
      loginButtonText: "Continue",
    }
  );
}
