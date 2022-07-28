import { auth } from "../firebase/config";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useSingup = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const signup = (email, password) => {
    setIsPending(true);
    createUserWithEmailAndPassword(auth, email, password)
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

  return { isPending, error, signup };
};
