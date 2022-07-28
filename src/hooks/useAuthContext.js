import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

//This custom hook returns context props but we add some logic
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuthContext must be inside the provider");
  }
  return context;
};
