var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/tokens.ts
var encoder = new TextEncoder();
var decoder = new TextDecoder();
function b64url(bytes) {
  let raw = "";
  for (const byte of bytes) raw += String.fromCharCode(byte);
  return btoa(raw).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
__name(b64url, "b64url");
function decodeB64url(value) {
  const pad = value.length % 4 === 0 ? "" : "=".repeat(4 - value.length % 4);
  const raw = atob(value.replace(/-/g, "+").replace(/_/g, "/") + pad);
  return Uint8Array.from(raw, (char) => char.charCodeAt(0));
}
__name(decodeB64url, "decodeB64url");
async function hmacKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}
__name(hmacKey, "hmacKey");
async function signToken(payload, secret) {
  const body = b64url(encoder.encode(JSON.stringify(payload)));
  const signature = await crypto.subtle.sign("HMAC", await hmacKey(secret), encoder.encode(body));
  return `${body}.${b64url(new Uint8Array(signature))}`;
}
__name(signToken, "signToken");
async function verifyToken(token, secret) {
  if (!token || token.length > 8192) return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0 || dot === token.length - 1) return null;
  const body = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  try {
    const valid = await crypto.subtle.verify(
      "HMAC",
      await hmacKey(secret),
      decodeB64url(signature).buffer,
      encoder.encode(body)
    );
    if (!valid) return null;
    const parsed = JSON.parse(decoder.decode(decodeB64url(body)));
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}
__name(verifyToken, "verifyToken");
function isOortHandoff(value, now = Date.now()) {
  if (!value) return false;
  return value.iss === "https://oortstack.com" && value.aud === "ledger" && value.kind === "handoff" && typeof value.sub === "string" && value.sub.length >= 3 && typeof value.username === "string" && typeof value.email === "string" && typeof value.displayName === "string" && typeof value.exp === "number" && value.exp >= now && value.exp <= now + 6 * 60 * 1e3;
}
__name(isOortHandoff, "isOortHandoff");
function isLedgerSession(value, now = Date.now()) {
  if (!value) return false;
  return value.iss === "https://ledger.imagineqira.com" && value.aud === "ledger" && value.kind === "session" && typeof value.sub === "string" && typeof value.exp === "number" && value.exp >= now;
}
__name(isLedgerSession, "isLedgerSession");

// src/index.ts
var COOKIE = "ledger_oort";
var SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1e3;
var LEDGER_ORIGIN = "https://ledger.imagineqira.com";
function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      ...extraHeaders
    }
  });
}
__name(json, "json");
function redirect(location, cookie) {
  const headers = new Headers({ location, "cache-control": "no-store" });
  if (cookie) headers.set("set-cookie", cookie);
  return new Response(null, { status: 302, headers });
}
__name(redirect, "redirect");
function cookieValue(request, name) {
  const raw = request.headers.get("cookie") ?? "";
  const match = raw.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match?.[1] ?? null;
}
__name(cookieValue, "cookieValue");
function sessionCookie(token) {
  return `${COOKIE}=${token}; Path=/api; Max-Age=${Math.floor(SESSION_TTL_MS / 1e3)}; HttpOnly; Secure; SameSite=Lax`;
}
__name(sessionCookie, "sessionCookie");
function clearSessionCookie() {
  return `${COOKIE}=; Path=/api; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
}
__name(clearSessionCookie, "clearSessionCookie");
function normalizeHandle(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 39);
}
__name(normalizeHandle, "normalizeHandle");
function validHandle(value) {
  return /^[a-z0-9][a-z0-9-]{1,38}$/.test(value);
}
__name(validHandle, "validHandle");
function accountJson(row) {
  return {
    oortUserId: row.oort_user_id,
    handle: row.handle,
    oortUsername: row.oort_username,
    email: row.email,
    displayName: row.display_name,
    avatarColor: row.avatar_color,
    avatarUrl: row.avatar_url,
    tier: row.tier,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    ownershipClaim: "This Ledger account is controlled by the signed-in Qira account. It does not establish legal identity, authorship, skill, or source honesty."
  };
}
__name(accountJson, "accountJson");
async function accountByUser(env, userId) {
  return env.DB.prepare("SELECT * FROM ledger_accounts WHERE oort_user_id = ?").bind(userId).first();
}
__name(accountByUser, "accountByUser");
async function accountByHandle(env, handle) {
  return env.DB.prepare("SELECT * FROM ledger_accounts WHERE handle = ?").bind(handle).first();
}
__name(accountByHandle, "accountByHandle");
function shortId(userId) {
  let hash = 2166136261;
  for (let i = 0; i < userId.length; i += 1) {
    hash ^= userId.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36).slice(0, 6);
}
__name(shortId, "shortId");
async function upsertFromOort(env, handoff) {
  const existing = await accountByUser(env, handoff.sub);
  const now = (/* @__PURE__ */ new Date()).toISOString();
  if (existing) {
    await env.DB.prepare(
      `UPDATE ledger_accounts
       SET oort_username = ?, email = ?, display_name = ?, avatar_color = ?, avatar_url = ?, tier = ?, updated_at = ?
       WHERE oort_user_id = ?`
    ).bind(
      handoff.username,
      handoff.email,
      handoff.displayName,
      handoff.avatarColor || null,
      handoff.avatarUrl,
      handoff.tier || "free",
      now,
      handoff.sub
    ).run();
    return await accountByUser(env, handoff.sub);
  }
  let handle = normalizeHandle(handoff.username);
  if (!validHandle(handle)) handle = `member-${shortId(handoff.sub)}`;
  const collision = await accountByHandle(env, handle);
  if (collision && collision.oort_user_id !== handoff.sub) {
    handle = `${handle.slice(0, 32)}-${shortId(handoff.sub)}`;
  }
  await env.DB.prepare(
    `INSERT INTO ledger_accounts
      (oort_user_id, handle, oort_username, email, display_name, avatar_color, avatar_url, tier, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    handoff.sub,
    handle,
    handoff.username,
    handoff.email,
    handoff.displayName,
    handoff.avatarColor || null,
    handoff.avatarUrl,
    handoff.tier || "free",
    now,
    now
  ).run();
  return await accountByUser(env, handoff.sub);
}
__name(upsertFromOort, "upsertFromOort");
async function resolveSession(request, env) {
  const token = cookieValue(request, COOKIE);
  if (!token || !env.OORT_SSO_SECRET) return null;
  const payload = await verifyToken(token, env.OORT_SSO_SECRET);
  if (!isLedgerSession(payload)) return null;
  return accountByUser(env, payload.sub);
}
__name(resolveSession, "resolveSession");
function safeNext(value) {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return "/account";
  try {
    const parsed = new URL(value, LEDGER_ORIGIN);
    if (parsed.origin !== LEDGER_ORIGIN) return "/account";
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return "/account";
  }
}
__name(safeNext, "safeNext");
async function handleCallback(request, env) {
  const url = new URL(request.url);
  const raw = url.searchParams.get("token") ?? "";
  if (!env.OORT_SSO_SECRET || !raw) {
    return redirect(`${url.origin}/account?oort_error=missing_token`);
  }
  const payload = await verifyToken(raw, env.OORT_SSO_SECRET);
  if (!isOortHandoff(payload)) {
    return redirect(`${url.origin}/account?oort_error=invalid_token`);
  }
  await upsertFromOort(env, payload);
  const now = Date.now();
  const session = await signToken(
    {
      iss: LEDGER_ORIGIN,
      aud: "ledger",
      kind: "session",
      sub: payload.sub,
      iat: now,
      exp: now + SESSION_TTL_MS
    },
    env.OORT_SSO_SECRET
  );
  return redirect(`${url.origin}${safeNext(url.searchParams.get("next"))}`, sessionCookie(session));
}
__name(handleCallback, "handleCallback");
async function handleMe(request, env) {
  const account = await resolveSession(request, env);
  if (!account) return json({ account: null }, 200, { "set-cookie": clearSessionCookie() });
  return json({ account: accountJson(account) });
}
__name(handleMe, "handleMe");
async function handleOwnership(request, env) {
  const handle = normalizeHandle(new URL(request.url).searchParams.get("handle") ?? "");
  if (!validHandle(handle)) return json({ error: "invalid_handle" }, 400);
  const account = await accountByHandle(env, handle);
  if (!account) return json({ ownership: null }, 404);
  return json({
    ownership: {
      handle: account.handle,
      oortUsername: account.oort_username,
      displayName: account.display_name,
      linkedAt: account.created_at,
      claim: "This Ledger account is controlled by a Qira account. It does not establish legal identity, authorship, skill, or source honesty."
    }
  });
}
__name(handleOwnership, "handleOwnership");
async function handleUpdate(request, env) {
  if (request.headers.get("origin") !== LEDGER_ORIGIN) return json({ error: "origin_not_allowed" }, 403);
  const account = await resolveSession(request, env);
  if (!account) return json({ error: "sign_in_required" }, 401);
  const body = await request.json().catch(() => null);
  const handle = normalizeHandle(typeof body?.handle === "string" ? body.handle : "");
  if (!validHandle(handle)) {
    return json({ error: "invalid_handle", message: "Use 2\u201339 lowercase letters, numbers, or hyphens." }, 400);
  }
  const taken = await accountByHandle(env, handle);
  if (taken && taken.oort_user_id !== account.oort_user_id) {
    return json({ error: "handle_taken", message: "That Ledger handle is already owned." }, 409);
  }
  try {
    await env.DB.prepare("UPDATE ledger_accounts SET handle = ?, updated_at = ? WHERE oort_user_id = ?").bind(handle, (/* @__PURE__ */ new Date()).toISOString(), account.oort_user_id).run();
  } catch {
    return json({ error: "handle_taken", message: "That Ledger handle is already owned." }, 409);
  }
  const updated = await accountByUser(env, account.oort_user_id);
  return json({ account: accountJson(updated) });
}
__name(handleUpdate, "handleUpdate");
async function handleDelete(request, env) {
  if (request.headers.get("origin") !== LEDGER_ORIGIN) return json({ error: "origin_not_allowed" }, 403);
  const account = await resolveSession(request, env);
  if (!account) return json({ error: "sign_in_required" }, 401);
  await env.DB.prepare("DELETE FROM ledger_accounts WHERE oort_user_id = ?").bind(account.oort_user_id).run();
  return json(
    {
      ok: true,
      note: "The Ledger account link was deleted. Public snapshots and git history are separate and were not deleted."
    },
    200,
    { "set-cookie": clearSessionCookie() }
  );
}
__name(handleDelete, "handleDelete");
var index_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/api/health") {
      return json({ status: "ok", service: "ledger-account" });
    }
    if (request.method === "GET" && url.pathname === "/api/oort/callback") {
      return handleCallback(request, env);
    }
    if (request.method === "GET" && url.pathname === "/api/account/me") {
      return handleMe(request, env);
    }
    if (request.method === "GET" && url.pathname === "/api/account/ownership") {
      return handleOwnership(request, env);
    }
    if (request.method === "PATCH" && url.pathname === "/api/account") {
      return handleUpdate(request, env);
    }
    if (request.method === "DELETE" && url.pathname === "/api/account") {
      return handleDelete(request, env);
    }
    if (request.method === "POST" && url.pathname === "/api/oort/logout") {
      return json({ ok: true }, 200, { "set-cookie": clearSessionCookie() });
    }
    return json({ error: "not_found" }, 404);
  }
};
export {
  index_default as default,
  normalizeHandle
};
//# sourceMappingURL=index.js.map

