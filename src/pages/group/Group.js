import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

//components
import MemberList from "../../components/MemberList"; //Renders members and random groups

//styles
import styles from "./Group.module.css";
//------------------------------------------------------------------------------------------------

function shuffleAndChunk(array, chunkSize) {
  const shuffledArray = array.sort(() => Math.random() - 0.5);
  let chunckedArray = [];
  for (let i = 0; i < shuffledArray.length; i += chunkSize)
    chunckedArray.push(shuffledArray.slice(i, i + chunkSize));
  return chunckedArray;
}

const Group = () => {
  const { id } = useParams();
  const { response, updateDocument } = useFirestore("groups", id);
  const [num, setNum] = useState(2); //number of members per random group
  const [randomGroup, setRandomGroup] = useState(false); //array of arrays random order
  const [isMembers, setIsMembers] = useState(); //if true shows list of members
  const [title, setTitle] = useState(); //selected group title
  const [editMode, setEditMode] = useState(false); //if true shows delete btn and form to add members
  const [members, setMembers] = useState(document);
  const [newMem, setNewMem] = useState("");

  const _ref = doc(db, "groups", id);
  const ref = useRef(_ref).current;

  //Gets document firestore data and updates states(members, title) with data
  useEffect(() => {
    const unsub = async () => {
      try {
        const docSnap = await getDoc(ref);
        setMembers(docSnap.data().members);
        setTitle(docSnap.data().title);
      } catch (err) {
        console.warn(err);
      }
    };

    return () => unsub();
  }, [ref]);

  //Uses a custom hook to update document in a collection
  const handleUpdate = () => {
    updateDocument(members);
    setEditMode(false);
    setIsMembers(false);
  };

  //shuffles members and updates randomGroup state
  const handleRandomize = () => {
    setRandomGroup(members);
    setRandomGroup((prevMem) => {
      return shuffleAndChunk(prevMem, num);
    });
  };

  console.log(ref);
  return (
    <div className={styles.group}>
      {title && <h1>{title}</h1>}

      {isMembers && <MemberList members={members} setMembers={setMembers} />}

      {editMode && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let added = [newMem, ...members];
            setMembers(added);
            setNewMem("");
          }}
        >
          <label>
            <input
              type="text"
              value={newMem}
              onChange={(e) => setNewMem(e.target.value)}
            ></input>
            <button>Añadir</button>
          </label>
          <div>
            <button type="button" onClick={() => handleUpdate(members)}>
              Guardar cambios
            </button>
          </div>
        </form>
      )}
      {!editMode && (
        <button
          className="btn"
          onClick={() => {
            setEditMode(true);
            setIsMembers(true);
          }}
        >
          Editar integrantes
        </button>
      )}

      <div>
        <span>Número de miembros:</span>
        <button
          className={styles["btn-small"]}
          onClick={() => {
            setNum((p) => p - 1);
          }}
        >
          -
        </button>
        <span className={styles.counter}>{num}</span>
        <button
          className={styles["btn-small"]}
          onClick={() => {
            setNum((p) => p + 1);
          }}
        >
          +
        </button>
      </div>
      <button className="btn" onClick={handleRandomize}>
        Crear grupos
      </button>

      {randomGroup && <MemberList members={randomGroup} />}
    </div>
  );
};

export default Group;