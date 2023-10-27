import axios from "axios";
import { createContext, useState, useEffect, ReactNode } from "react";

// Define el tipo para children.
type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<any | null>(null);

const API = import.meta.env.VITE_API as string;

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<any | null>(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs: any) => {
    const res = await axios.post(`${API}/login`, inputs);
    setCurrentUser(res.data.data);
    return res;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
