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
} from "./session";

const AuthContext = createContext(null);

function normalizeSessionPayload(responseData) {
  const payload =
    responseData?.data?.data ??
    responseData?.data ??
    responseData?.user ??
    responseData ??
    {};
  return buildSessionFromAuthPayload({
    ...payload,
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
      const nextSession = normalizeSessionPayload(payload);
      if (!nextSession?.role) {
        setSession(null);
        setIsLoading(false);
        return;
      }
      await clearClientSession();
      setSession(nextSession);
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
    setIsLoading(true);
    try {
      const response = await get_check();

      const status = response?.data?.status;
      if (status && status !== "success") {
        setSession(null);
        return;
      }
      const restored = normalizeSessionPayload(response?.data);
      if (!restored?.role) {
        await clearClientSession();
        return;
      }
      setSession(restored);
    } catch (error) {
      setSession(null);
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
