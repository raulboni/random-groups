import { useEffect, useState, useRef } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const useCollection = (_c, _q) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  //since _q is not a primitive value, we need useref to include it in useEffect (otherwise constant re-renders)
  const q = useRef(_q).current;
  const c = useRef(_c).current;

  useEffect(() => {
    //no query param
    let ref = collection(db, c);

    //if query-array param we set ref to be a firestore query with where method.
    if (q) {
      ref = query(ref, where(...q));
    }

    //onSnapshot method accepts 3 args: referente to collection, func to handle snapshot, func to handle error
    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(results);
        setError(null);
      },
      (error) => setError(error.message)
    );

    // useEffect cleanup funtion (only runs when component unmounts).
    // unsub() stops asking for data.
    return () => unsub();
  }, [c, q]);

  return { documents, error };
};
