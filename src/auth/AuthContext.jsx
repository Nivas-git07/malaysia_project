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

/* 🔥 CLEAN NORMALIZER */
function normalizeSessionPayload(data) {
  return buildSessionFromAuthPayload(data || {});
}

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasBootstrapped = useRef(false);

  /* CLEAR SESSION */
  const clearClientSession = useCallback(async () => {
    setSession(null);
    clearStoredSession();
    await queryClient.cancelQueries();
    queryClient.clear();
  }, [queryClient]);

  /* LOGIN */
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
    [clearClientSession, queryClient]
  );

  /* LOGOUT */
  const logout = useCallback(async () => {
    await clearClientSession();
    setIsLoading(false);
  }, [clearClientSession]);

  /* 🔥 FIXED SESSION CHECK */
const checkSession = useCallback(async () => {
  setIsLoading(true);
  try {
    const response = await get_check();

    console.log("RAW API:", response?.data);

    const status = response?.data?.status;

    if (status && status !== "success") {
      setSession(null);
      return;
    }

    
    const userData = response?.data;

    console.log("EXTRACTED USER:", userData);

    const restored = normalizeSessionPayload(userData);

    if (!restored?.role) {
      await clearClientSession();
      return;
    }

    setSession(restored);
  } catch (error) {
    console.error("Session error:", error);
    setSession(null);
  } finally {
    setIsLoading(false);
  }
}, [clearClientSession]);

  /* INITIAL LOAD */
  useEffect(() => {
    if (hasBootstrapped.current) return;
    hasBootstrapped.current = true;
    checkSession();
  }, [checkSession]);

  /* FORCE LOGOUT LISTENER */
  useEffect(() => {
    const handleForceLogout = async () => {
      await clearClientSession();
    };

    window.addEventListener(AUTH_EVENTS.FORCE_LOGOUT, handleForceLogout);

    return () => {
      window.removeEventListener(
        AUTH_EVENTS.FORCE_LOGOUT,
        handleForceLogout
      );
    };
  }, [clearClientSession]);

  /* CONTEXT VALUE */
  const value = useMemo(
    () => ({
      user: session?.user ?? session ?? null,   // 🔥 ensures full access
      role: session?.role ?? null,
      session,
      isLoading,
      isAuthenticated: Boolean(session?.role),
      checkSession,
      loginWithPayload,
      logout,
    }),
    [session, isLoading, checkSession, loginWithPayload, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* HOOK */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}