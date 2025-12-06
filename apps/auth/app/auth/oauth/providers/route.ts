import { BadRequestError, NotFoundError } from '@/lib/oauth/service';
import { oauthService } from '@/lib/oauth/service-instance';
import { resolveTenantIdFromRequest } from '@/lib/tenant/resolve-tenant';

export async function GET(req: Request) {
  const tenantId = resolveTenantIdFromRequest(req);
  if (!tenantId) {
    return jsonError('tenant_not_found', 'Tenant could not be resolved.', 404);
  }

  try {
    const providers = await oauthService.listProviders(tenantId);
    const payload = providers.map((provider) => ({
      name: provider.name,
      displayName: provider.displayName,
      iconURL: provider.iconURL,
      authURL: provider.authURL,
      tenantID: provider.tenantId,
      is_first_party: provider.isFirstParty ?? false,
    }));
    return Response.json(payload, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error: unknown) {
  if (error instanceof BadRequestError) {
    return jsonError('invalid_request', error.message, 400);
  }
  if (error instanceof NotFoundError) {
    return jsonError('not_found', error.message, 404);
  }
  console.error('Unhandled OAuth providers error', error);
  return jsonError('internal_error', 'OAuth service is unavailable.', 500);
}

function jsonError(code: string, message: string, status: number) {
  return Response.json(
    {
      error: code,
      message,
    },
    { status }
  );
}
