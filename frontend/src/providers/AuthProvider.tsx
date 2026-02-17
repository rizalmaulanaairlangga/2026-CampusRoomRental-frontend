// src/providers/AuthProvider.tsx

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { login as loginApi, getMe } from "../api/auth";
import type { AuthUser } from "../api/auth";
import { AuthContext } from "./auth-context";

const TOKEN_KEY = "auth_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restore() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const me = await getMe(token);
        setUser(me);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
      } finally {
        setLoading(false);
      }
    }

    restore();
  }, [token]);

  async function login(email: string, password: string) {
    const data = await loginApi({ email, password });

    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }

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
