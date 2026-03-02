import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "../types";
import { signin as signinService, signup as signupService, logout as logoutService, getUser } from "../services/auth.service";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signup: (data: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Au démarrage, on vérifie si un token existe et on récupère l'utilisateur
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      getUser(Number(userId))
        .then((data) => setUser(data))
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
        });
    }
  }, []);

  const signin = async (email: string, password: string) => {
    const data = await signinService(email, password);
    localStorage.setItem("userId", String(data.user.id));
    setUser(data.user);
  };

  const signup = async (data: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
  }) => {
    await signupService(data);
  };

  const logout = () => {
    logoutService();
    localStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return context;
};