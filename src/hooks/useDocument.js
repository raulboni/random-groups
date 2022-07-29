import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { getDoc, doc } from "firebase/firestore";

export const useDocument = (c, id) => {
  const [title, setTitle] = useState(null);
  const [members, setMembers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ref = doc(db, c, id);
    const getDocument = async () => {
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        setTitle(docSnap.data().title);
        setMembers(docSnap.data().members);
      } else {
        setError("No such document");
      }
    };
    getDocument();
  }, []);

  return { members, setMembers, title, setTitle, error };
};
