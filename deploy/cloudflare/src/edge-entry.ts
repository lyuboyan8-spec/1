interface Env {
  CF_EDGE_ENV?: string;
  CF_DEFAULT_ORIGIN?: string;
  CF_CONSOLE_ORIGIN?: string;
  CF_API_ORIGIN?: string;
  CF_PREVIEW_ORIGIN?: string;
  CF_ALLOWED_HOSTS?: string;
  CF_MAINTENANCE_MODE?: string;
  CF_MAINTENANCE_TARGET?: string;
  CF_BYPASS_TOKEN?: string;
}

const TRUE_VALUES = new Set(["1", "true", "on", "yes"]);

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/__edge/health") {
      return Response.json({
        ok: true,
        edgeEnv: env.CF_EDGE_ENV ?? "unknown",
        maintenanceMode: isEnabled(env.CF_MAINTENANCE_MODE),
      });
    }

    if (isHostDenied(url.hostname, env.CF_ALLOWED_HOSTS)) {
      return new Response("host not allowed", { status: 403 });
    }

    if (isEnabled(env.CF_MAINTENANCE_MODE) && !hasBypassToken(request, env.CF_BYPASS_TOKEN)) {
      return redirectToMaintenance(url, env.CF_MAINTENANCE_TARGET);
    }

    const origin = selectOrigin(url.hostname, env);
    if (!origin) {
      return new Response("origin not configured", { status: 503 });
    }

    const upstreamUrl = new URL(request.url);
    upstreamUrl.protocol = "https:";
    upstreamUrl.host = origin;

    const upstreamRequest = new Request(upstreamUrl.toString(), request);
    upstreamRequest.headers.set("x-phantom-edge", "cloudflare-worker");
    upstreamRequest.headers.set("x-forwarded-host", url.hostname);

    return fetch(upstreamRequest);
  },
};

function isEnabled(value?: string): boolean {
  return value ? TRUE_VALUES.has(value.toLowerCase()) : false;
}

function hasBypassToken(request: Request, expected?: string): boolean {
  if (!expected) {
    return false;
  }

  return request.headers.get("x-wanman-bypass-token") === expected;
}

function isHostDenied(hostname: string, allowedHosts?: string): boolean {
  if (!allowedHosts) {
    return false;
  }

  const normalizedHosts = allowedHosts
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return normalizedHosts.length > 0 && !normalizedHosts.includes(hostname);
}

function selectOrigin(hostname: string, env: Env): string | null {
  if (hostname.startsWith("console.")) {
    return env.CF_CONSOLE_ORIGIN ?? env.CF_DEFAULT_ORIGIN ?? null;
  }

  if (hostname.startsWith("api.")) {
    return env.CF_API_ORIGIN ?? env.CF_DEFAULT_ORIGIN ?? null;
  }

  if (hostname.startsWith("preview.")) {
    return env.CF_PREVIEW_ORIGIN ?? env.CF_DEFAULT_ORIGIN ?? null;
  }

  return env.CF_DEFAULT_ORIGIN ?? null;
}

function redirectToMaintenance(url: URL, target?: string): Response {
  if (!target) {
    return new Response("maintenance mode enabled", { status: 503 });
  }

  const maintenanceUrl = new URL(target);
  maintenanceUrl.searchParams.set("from", url.hostname);

  return Response.redirect(maintenanceUrl.toString(), 302);
}
