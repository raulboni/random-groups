import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";

import styles from "./Create.module.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [newMember, setNewMember] = useState("");
  const [members, setMembers] = useState([]);
  const membersInput = useRef(null);
  let navigate = useNavigate();
  const { user } = useAuthContext();

  const { addDocument, response } = useFirestore("groups");

  const handleAdd = () => {
    const member = newMember.trim().toLowerCase();
    if (member && !members.includes(member)) {
      setMembers((prevMem) => [...prevMem, member]);
      setNewMember("");
    }
    membersInput.current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = {
      title: title,
      members: members,
      uid: user.uid,
    };
    try {
      await addDocument(doc);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err.message);
    }
  };

  //reset form when document added
  useEffect(() => {
    if (response.success) {
      setTitle("");
      setMembers([]);
    }
  }, [response.success]);

  return (
    <form className={styles.create} onSubmit={handleSubmit}>
      <h1>Crear grupo</h1>

      <label>
        <span>Nombre del grupo:</span>
        <input
          type="text"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>

      <label>
        <span>Participantes:</span>

        <input
          type="text"
          onChange={(e) => setNewMember(e.target.value)}
          value={newMember}
          ref={membersInput}
        />

        <button type="button" onClick={handleAdd}>
          Añadir
        </button>
      </label>
      <ul>
        {members.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>

      <button>Crear grupo</button>
    </form>
  );
};

export default Create;
