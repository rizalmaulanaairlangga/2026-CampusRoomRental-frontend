// src/providers/AuthProvider.tsx

import { useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi, getMe } from "../api/auth";
import type { AuthUser } from "../api/auth";
import { AuthContext } from "./auth-context";

const TOKEN_KEY = "auth_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );
  const [loading, setLoading] = useState(true);

  // =========================
  // Restore session
  // =========================
  useEffect(() => {
    let isMounted = true;

    async function restore() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const me = await getMe(token);
        if (isMounted) setUser(me);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        if (isMounted) {
          setUser(null);
          setToken(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    restore();

    return () => {
      isMounted = false;
    };
  }, [token]);

  // =========================
  // Login
  // =========================
    const login = useCallback(
    async (email: string, password: string) => {
        const data = await loginApi({ email, password });

        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setUser(data.user);

        if (data.user.role === "admin") {
        navigate("/admin");
        } else {
        navigate("/dashboard");
        }

    },
    [navigate]
    );

  // =========================
  // Logout
  // =========================
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    navigate("/login"); // redirect pakai router (bukan window.location)
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
