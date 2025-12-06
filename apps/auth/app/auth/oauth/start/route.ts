import { BadRequestError, NotFoundError } from '@/lib/oauth/service';
import { oauthService } from '@/lib/oauth/service-instance';
import { resolveTenantIdFromRequest } from '@/lib/tenant/resolve-tenant';

export async function GET(req: Request) {
  const tenantId = resolveTenantIdFromRequest(req);
  if (!tenantId) {
    return jsonError('tenant_not_found', 'Tenant could not be resolved.', 404);
  }

  const url = new URL(req.url);
  const provider = url.searchParams.get('provider');
  const redirectUri = url.searchParams.get('redirect_uri');
  const scopeParam = url.searchParams.get('scope');
  const scopes = scopeParam
    ? scopeParam
        .split(/\s+/)
        .map((value) => value.trim())
        .filter(Boolean)
    : undefined;

  try {
    const result = await oauthService.startAuthorization(tenantId, {
      provider: provider ?? '',
      redirectUri: redirectUri ?? '',
      scope: scopes,
    });

    return Response.json(
      {
        authorization_url: result.authorizationUrl,
        state: result.state,
        nonce: result.nonce,
        code_verifier: result.codeVerifier,
      },
      { status: 200 }
    );
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
  console.error('Unhandled OAuth start error', error);
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
