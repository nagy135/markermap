import { createContext, ReactNode, useContext, useState } from "react";

export type authContextType = {
  user: string | null;
  login: () => void;
  logout: () => void;
};

export const authContextDefaultValues: authContextType = {
  user: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<string | null>(null);

  const login = () => {
    setUser("efe37835-1340-4e33-a581-15876b2046e3");
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };
  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
