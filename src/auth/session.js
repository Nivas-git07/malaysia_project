const AUTH_STORAGE_KEY = "mfsa.auth.session";

const AUTH_RELATED_KEYS = [AUTH_STORAGE_KEY];

export const AUTH_EVENTS = {
  FORCE_LOGOUT: "mfsa:auth:force-logout",
};

export function readStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (error) {
    return null;
  }
}

export function writeStoredSession(session) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearStoredSession() {
  if (typeof window === "undefined") {
    return;
  }

  AUTH_RELATED_KEYS.forEach((key) => {
    window.localStorage.removeItem(key);
    window.sessionStorage.removeItem(key);
  });
}

export function getAuthScope() {
  const session = readStoredSession();
  const role = session?.role || "guest";
  const userId = session?.userId || "anonymous";
  return `${role}:${userId}`;
}

export function buildSessionFromAuthPayload(payload = {}) {
  const role = payload?.role || null;
  const userId =
    payload?.userId ??
    payload?.user_id ??
    payload?.id ??
    payload?.user?.id ??
    payload?.user?.user_id ??
    null;
  const token =
    payload?.token ??
    payload?.accessToken ??
    payload?.access_token ??
    payload?.jwt ??
    null;
  const user =
    payload?.user ??
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
    token,
  };
}
