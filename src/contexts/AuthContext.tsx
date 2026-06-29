import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { mockCurrentUser, type User } from '@/lib/mock-data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserPoints: (points: number, resolvedIncrement?: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockCurrentUser); // Auto-logged in for demo
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (_email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setUser(mockCurrentUser);
    setIsLoading(false);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setUser(mockCurrentUser);
    setIsLoading(false);
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setUser({ ...mockCurrentUser, name, email });
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateUserPoints = useCallback((points: number, resolvedIncrement = false) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        totalPoints: prev.totalPoints + points,
        resolvedReports: resolvedIncrement ? prev.resolvedReports + 1 : prev.resolvedReports,
        totalReports: resolvedIncrement ? prev.totalReports : prev.totalReports + 1,
      };
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        signup,
        logout,
        updateUserPoints,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
