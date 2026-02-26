import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types";
import { signin as signinService, signup as signupService, logout as logoutService } from "../services/auth.service";

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

  const signin = async (email: string, password: string) => {
    const data = await signinService(email, password);
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