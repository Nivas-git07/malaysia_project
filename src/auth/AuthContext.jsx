import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { get_check } from "../user/api/home_api";
import {
  AUTH_EVENTS,
  buildSessionFromAuthPayload,
  clearStoredSession,
  readStoredSession,
  writeStoredSession,
} from "./session";

const AuthContext = createContext(null);

function normalizeSessionPayload(responseData, fallbackToken) {
  const payload = responseData?.data ?? responseData ?? {};
  return buildSessionFromAuthPayload({
    ...payload,
    token: payload?.token ?? fallbackToken ?? null,
  });
}

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasBootstrapped = useRef(false);

  const clearClientSession = useCallback(async () => {
    setSession(null);
    clearStoredSession();
    await queryClient.cancelQueries();
    queryClient.clear();
  }, [queryClient]);

  const loginWithPayload = useCallback(
    async (payload) => {
      const nextSession = buildSessionFromAuthPayload(payload);
      await clearClientSession();
      setSession(nextSession);
      writeStoredSession(nextSession);
      setIsLoading(false);
      await queryClient.invalidateQueries();
    },
    [clearClientSession, queryClient],
  );

  const logout = useCallback(async () => {
    await clearClientSession();
    setIsLoading(false);
  }, [clearClientSession]);

  const checkSession = useCallback(async () => {
    const storedSession = readStoredSession();
    const token = storedSession?.token;

    if (!token) {
      setSession(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await get_check();
      const restored = normalizeSessionPayload(response?.data, token);
      if (!restored?.token || !restored?.role) {
        await clearClientSession();
        return;
      }
      setSession(restored);
      writeStoredSession(restored);
    } catch (error) {
      await clearClientSession();
    } finally {
      setIsLoading(false);
    }
  }, [clearClientSession]);

  useEffect(() => {
    if (hasBootstrapped.current) return;
    hasBootstrapped.current = true;
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    const handleForceLogout = async () => {
      await clearClientSession();
    };

    window.addEventListener(AUTH_EVENTS.FORCE_LOGOUT, handleForceLogout);
    return () => {
      window.removeEventListener(AUTH_EVENTS.FORCE_LOGOUT, handleForceLogout);
    };
  }, [clearClientSession]);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      role: session?.role ?? null,
      token: session?.token ?? null,
      session,
      isLoading,
      isAuthenticated: Boolean(session?.role),
      checkSession,
      loginWithPayload,
      logout,
    }),
    [session, isLoading, checkSession, loginWithPayload, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
