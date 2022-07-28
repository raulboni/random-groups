import { auth } from "../firebase/config";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const login = (email, password) => {
    setIsPending(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setIsPending(false);
        setError(null);
        dispatch({ type: "LOGIN", payload: res.user });
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  };

  return { isPending, error, login };
};
