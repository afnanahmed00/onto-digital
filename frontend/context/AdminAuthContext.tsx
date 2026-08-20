"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getCurrentAdmin, loginAdmin, logoutAdmin } from "@/services/adminAuth";
import type { AdminUser } from "@/types/admin";

type AdminAuthStatus = "loading" | "authenticated" | "unauthenticated";

type AdminAuthContextValue = {
  admin: AdminUser | null;
  status: AdminAuthStatus;
  /** Re-checks the session against GET /api/v1/auth/me. */
  refresh: () => Promise<void>;
  /** POSTs to /login; on success updates `admin`/`status` in place. */
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  /** POSTs to /logout and clears local session state either way. */
  logout: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

/**
 * Single source of truth for "who is the signed-in admin, if anyone" —
 * mounted once in app/admin/layout.tsx so both the login page and the
 * protected dashboard shell read the same session state instead of each
 * polling GET /me independently. Holds no token: the actual credential is
 * an httpOnly cookie the browser manages entirely on its own (see
 * services/adminAuth.ts) — this context only ever holds the public admin
 * profile the backend returns.
 */
export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [status, setStatus] = useState<AdminAuthStatus>("loading");

  const refresh = useCallback(async () => {
    const result = await getCurrentAdmin();
    if (result.success && result.admin) {
      setAdmin(result.admin);
      setStatus("authenticated");
    } else {
      setAdmin(null);
      setStatus("unauthenticated");
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      refresh();
    });
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginAdmin(email, password);
    if (result.success && result.admin) {
      setAdmin(result.admin);
      setStatus("authenticated");
      return { success: true };
    }
    return { success: false, message: result.message ?? "Invalid email or password." };
  }, []);

  const logout = useCallback(async () => {
    await logoutAdmin();
    setAdmin(null);
    setStatus("unauthenticated");
  }, []);

  const value = useMemo(
    () => ({ admin, status, refresh, login, logout }),
    [admin, status, refresh, login, logout]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth(): AdminAuthContextValue {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider (see app/admin/layout.tsx).");
  }
  return context;
}
