import React, { createContext, useState, useEffect } from 'react';

interface User {
  
}

interface AuthContextType {
  currentUser: User | null;
  login: (inputs: any) => Promise<any>;
  logout: () => void;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface AuthContextProviderProps {
  children: ReactNode; 
}

const defaultContextValue: AuthContextType = {
  currentUser: null,
  login: async () => {},
  logout: () => {},
  setCurrentUser: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);

const API = import.meta.env.VITE_API as string;

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const login = async (inputs: any) => {
    const res = await axios.post(`${API}/Login`, inputs);
    setCurrentUser(res.data.data); 
    return res;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};




