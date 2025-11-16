import { eq } from "drizzle-orm";
import {
  pgTable,
  bigint,
  text,
  timestamp,
  boolean,
  index,
  uniqueIndex,
  jsonb,
} from "drizzle-orm/pg-core";

// -----------------------------------------------------
// TENANTS
// -----------------------------------------------------
export const tenants = pgTable("tenants", {
  id: bigint("id", { mode: "bigint" }).primaryKey(),

  type: text("type").notNull(), // jika enum type belum dipindah ke drizzle
  name: text("name").notNull(),
  code: text("code").notNull(),
  slug: text("slug").notNull().unique(),
  countryCode: text("country_code").notNull(),
  timezone: text("timezone").notNull(),
  isDefault: boolean("is_default").notNull(),
  status: text("status").notNull().default("pending"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});


// -----------------------------------------------------
// TENANT DOMAINS (BARU) — multi-domain, verification, SSL, provisioning
// -----------------------------------------------------
export const tenantDomains = pgTable(
  "tenant_domains",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey(),

    tenantId: bigint("tenant_id", { mode: "bigint" })
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),

    domain: text("domain").notNull().unique(),
    isPrimary: boolean("is_primary").default(false),

    // Verification info
    verificationMethod: text("verification_method").default("dns"), // dns | file | manual
    verificationCode: text("verification_code"),
    verified: boolean("verified").default(false),
    verifiedAt: timestamp("verified_at", { withTimezone: true }),

    // SSL Certificate (ACME)
    certificateStatus: text("certificate_status").default("pending"), // pending | active | failed
    certificateUpdatedAt: timestamp("certificate_updated_at", { withTimezone: true }),

    // Provisioning state
    provisioningStatus: text("provisioning_status").default("pending"), // pending | provisioning | active | error
    provisionedAt: timestamp("provisioned_at", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    idxTenantId: index("idx_tenant_domains_tenant_id").on(table.tenantId),
    idxPrimaryDomain: index("uniq_primary_domain_per_tenant")
      .on(table.tenantId)
      .where(eq(table.isPrimary, true)),
  })
);

export const tenantBranding = pgTable(
  "tenant_branding",
  {
    tenantId: bigint("tenant_id", { mode: "bigint" })
      .primaryKey()
      .references(() => tenants.id, { onDelete: "cascade" }),

    logoUrl: text("logo_url"),
    faviconUrl: text("favicon_url"),

    primaryColor: text("primary_color"),
    secondaryColor: text("secondary_color"),
    accentColor: text("accent_color"),

    darkMode: boolean("dark_mode").default(true),

    loginTitle: text("login_title").default("Sign in"),
    loginSubtitle: text("login_subtitle"),

    customCss: text("custom_css"),             // Tenant dapat override theme via CSS
    customJs: text("custom_js"),               // Optional

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  }
);

// -----------------------------------------------------
// OAUTH APPS
// -----------------------------------------------------
export const oauthApps = pgTable(
  "oauth_apps",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey(),

    tenantId: bigint("tenant_id", { mode: "bigint" })
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),

    name: text("name").notNull(),

    appType: text("app_type").notNull(), // WEB | MOBILE | M2M
    description: text("description"),
    iconUrl: text("icon_url"),

    isFirstParty: boolean("is_first_party").default(false),
    isActive: boolean("is_active").default(true),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    uniqTenantName: uniqueIndex("uniq_oauth_apps_tenant_name").on(
      table.tenantId,
      table.name
    ),
    idxTenantId: index("idx_oauth_apps_tenant_id").on(table.tenantId),
  })
);

// -----------------------------------------------------
// OAUTH CLIENTS
// -----------------------------------------------------
export const oauthClients = pgTable(
  "oauth_clients",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey(),
    tenantId: bigint("tenant_id", { mode: "bigint" })
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),

    appId: bigint("app_id", { mode: "bigint" })
      .references(() => oauthApps.id, { onDelete: "cascade" }),

    clientId: text("client_id").notNull().unique(),
    clientSecret: text("client_secret").notNull(),

    redirectUris: text("redirect_uris").array().default([]),
    grants: text("grants").array().default([]),
    scopes: text("scopes").array().default([]),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    idxTenantId: index("idx_oauth_clients_tenant_id").on(table.tenantId),
    idxClientId: index("idx_oauth_clients_client_id").on(table.clientId),
  })
);

// -----------------------------------------------------
// OAUTH CODES
// -----------------------------------------------------
export const oauthCodes = pgTable(
  "oauth_codes",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey(),
    tenantId: bigint("tenant_id", { mode: "bigint" })
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),

    clientId: text("client_id").notNull(),
    userId: bigint("user_id", { mode: "bigint" }).notNull(),

    code: text("code").notNull().unique(),
    redirectUri: text("redirect_uri").notNull(),

    codeChallenge: text("code_challenge"),
    codeChallengeMethod: text("code_challenge_method"),

    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    used: boolean("used").default(false),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    idxTenantId: index("idx_oauth_codes_tenant_id").on(table.tenantId),
    idxClientId: index("idx_oauth_codes_client_id").on(table.clientId),
    idxCode: index("idx_oauth_codes_code").on(table.code),
  })
);

// -----------------------------------------------------
// OAUTH TOKENS
// -----------------------------------------------------
export const oauthTokens = pgTable(
  "oauth_tokens",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey(),
    tenantId: bigint("tenant_id", { mode: "bigint" })
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),

    clientId: text("client_id").notNull(),
    userId: bigint("user_id", { mode: "bigint" }),

    accessToken: text("access_token").notNull(),
    refreshToken: text("refresh_token"),

    scopes: text("scopes").array().default([]),

    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    revoked: boolean("revoked").default(false),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    idxTenantId: index("idx_oauth_tokens_tenant_id").on(table.tenantId),
    idxAccessToken: index("idx_oauth_tokens_access_token").on(
      table.accessToken
    ),
    idxRefreshToken: index("idx_oauth_tokens_refresh_token").on(
      table.refreshToken
    ),
  })
);

// -----------------------------------------------------
// OAUTH TENANT KEYS (private signing keys)
// -----------------------------------------------------
export const oauthTenantKeys = pgTable(
  "oauth_tenant_keys",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey(),

    tenantId: bigint("tenant_id", { mode: "bigint" })
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),

    kid: text("kid").notNull().unique(),
    algo: text("algo").notNull().default("HS256"), // HS256 / RS256
    secret: text("secret").notNull(),              // private key or shared secret
    isActive: boolean("is_active").notNull().default(true),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    rotatedAt: timestamp("rotated_at", { withTimezone: true }),
  },
  (table) => ({
    idxTenantId: index("idx_oauth_tenant_keys_tenant_id").on(table.tenantId),
  })
);


export const users = pgTable(
  "users",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey(),
    tenantId: bigint("tenant_id", { mode: "bigint" })
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),

    email: text("email").notNull(),
    emailVerified: boolean("email_verified").default(false),

    passwordHash: text("password_hash"),
    name: text("name"),

    phone: text("phone"),
    phoneVerified: boolean("phone_verified").default(false),

    avatarUrl: text("avatar_url"),
    status: text("status").notNull().default("ACTIVE"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    uniqEmailPerTenant: uniqueIndex("uniq_email_per_tenant").on(
      table.tenantId,
      table.email
    ),
  })
);


export const oauthUserIdentities = pgTable(
  "oauth_user_identities",
  {
    id: bigint("id", { mode: "bigint" }).primaryKey(),
    userId: bigint("user_id", { mode: "bigint" })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    provider: text("provider").notNull(),             // google, apple, github, phone, email
    providerUserId: text("provider_user_id").notNull(),

    email: text("email"),
    rawProfile: jsonb("raw_profile"),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    uniqProviderAndId: uniqueIndex("uniq_provider_provider_user_id").on(table.provider, table.providerUserId),
  })
);

// -----------------------------------------------------
// TENANT USERS RELATION
// -----------------------------------------------------
export const tenantUsers = pgTable(
  "tenant_users",
  {
    id: bigint("tenant_user_id", { mode: "bigint" }).primaryKey(),

    tenantId: bigint("tenant_id", { mode: "bigint" })
      .notNull()
      .references(() => tenants.id, { onDelete: "cascade" }),

    userId: bigint("user_id", { mode: "bigint" })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    role: text("role").notNull(),
    status: text("status").default("ACTIVE"),
    isDefault: boolean("is_default").default(false),

    invitedEmail: text("invited_email"),
    joinedAt: timestamp("joined_at", { withTimezone: true }).defaultNow(),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    uniqTenantUser: uniqueIndex("uniq_tenant_user").on(
      table.tenantId,
      table.userId
    ),
    idxTenant: index("idx_tenant_users_tenant_id").on(table.tenantId),
  })
);

