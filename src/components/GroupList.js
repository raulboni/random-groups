//libraries
import { useState } from "react";
import { Link } from "react-router-dom";
//components
import Modal from "./Modal";
//assets
import deleteIcon from "../assets/delete-icon.svg";

//Styles
import styles from "./GroupList.module.css";

const GroupList = ({ groups }) => {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [maybeDelete, setMaybeDelete] = useState(false);
  const handleClick = (id) => {
    setId(id);
    setModal(true);
  };

  return (
    <div className={styles.groupList}>
      {modal && <Modal id={id} setModal={setModal} />}
      {groups.map((group) => (
        <div
          className={styles.card}
          key={group.id}
          onMouseEnter={() => setMaybeDelete(true)}
          onMouseLeave={() => setMaybeDelete(false)}
        >
          <img
            className="delete"
            style={
              !maybeDelete
                ? {
                    opacity: 0,
                  }
                : {}
            }
            src={deleteIcon}
            onClick={() => handleClick(group.id)}
          />

          <Link to={`/group/${group.id}`}>
            <h1>{group.title}</h1>
          </Link>
          <p>{group.members.length} integrantes</p>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
