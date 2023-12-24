import axios from "axios";
import { createContext, useState, useEffect, ReactNode, SetStateAction } from "react";


interface User {
  // Define las propiedades de tu usuario aquí
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


{/*
interface User {
  username: string;
  // Agrega más propiedades de User si son necesarias
}

interface LoginInputs {
  username: string;
  password: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (inputs: LoginInputs) => Promise<void>;
  logout: () => void;
  setCurrentUser: React.Dispatch<SetStateAction<User | null>>;
}

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => {
    throw new Error("login function is not implemented");
  },
  logout: () => {
    throw new Error("Function not implemented.");
  },
  setCurrentUser: () => {
    throw new Error("Function not implemented.");
  },
});

const API = import.meta.env.VITE_API as string;

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(JSON.parse(localStorage.getItem("user") || "null"));

  const login = async (inputs: LoginInputs) => {
    try {
      const res = await axios.post(`${API}/Login`, inputs);
      setCurrentUser(res.data.user); // Asegúrate de que esto coincida con la estructura de tu respuesta
      // Puede que necesites manejar el almacenamiento del token aquí, dependiendo de tu API
    } catch (error) {
      // Manejar errores de la solicitud aquí
      console.error("Login error:", error);
      throw error; // O manejar de otra manera, si prefieres
    }
  };

  const logout = () => {
    setCurrentUser(null);
    // Aquí también debes manejar la eliminación del token de autenticación, si es aplicable
  };

  useEffect(() => {
    // Actualizar localStorage cuando currentUser cambia
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

*/}


