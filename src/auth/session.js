const AUTH_STORAGE_KEY = "mfsa.auth.session";

const AUTH_RELATED_KEYS = [AUTH_STORAGE_KEY];

export const AUTH_EVENTS = {
  FORCE_LOGOUT: "mfsa:auth:force-logout",
};

export function readStoredSession() {
  return null;
}

export function writeStoredSession(session) {
  // Backend cookie session is the source of truth.
  return session;
}

export function clearStoredSession() {
  // No client-side auth storage to clear.
  return AUTH_RELATED_KEYS;
}

export function getAuthScope() {
  return "cookie-session";
}

export function buildSessionFromAuthPayload(payload = {}) {
  const role =
    payload?.role ??
    payload?.user?.role ??
    payload?.user_data?.role ??
    payload?.account?.role ??
    null;
  const userId =
    payload?.userId ??
    payload?.user_id ??
    payload?.id ??
    payload?.user?.id ??
    payload?.user?.user_id ??
    null;
  const user =
    payload?.user ??
    payload?.user_data ??
    payload?.account ??
    {
      id: userId,
      role,
      full_name: payload?.full_name ?? payload?.name ?? null,
      email_id: payload?.email_id ?? payload?.email ?? null,
    };

  return {
    user,
    role,
    userId,
  };
}
