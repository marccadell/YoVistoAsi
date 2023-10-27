import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export const requireLoggedOut = (): boolean => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    // User is logged in, prevent navigation to login route
    return false;
  }
  // User is logged out, allow navigation
  return true;
};
