import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const requireLoggedOut = (): boolean => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useContext must be used within a AuthContextProvider');
  }

  const { currentUser } = context;
  
  return !currentUser;
};