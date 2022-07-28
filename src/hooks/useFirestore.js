import { useReducer, useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "UPDATE":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };

    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };

    case "DELETE":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        succedd: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (c, id) => {
  const [document, setDocument] = useState("");
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  let ref = collection(db, c);
  if (id) {
    ref = doc(db, c, id);
  }

  //update Document func
  const updateDocument = async (updatedDoc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      await setDoc(ref, { members: updatedDoc }, { merge: true });
      dispatch({ type: "UPDATE", payload: updatedDoc });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  //add Document func
  const addDocument = async (docToAdd) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const addedDoc = await addDoc(ref, docToAdd);
      dispatch({ type: "ADDED_DOCUMENT", payload: addedDoc });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  //deleteDocument
  const deleteDocument = async () => {
    dispatch({ type: "IS_PENDING" });
    try {
      const deletedDoc = await deleteDoc(ref);
      dispatch({ type: "DELETE", payload: deletedDoc });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  return { addDocument, deleteDocument, updateDocument, response };
};
