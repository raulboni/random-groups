import { useFirestore } from "../hooks/useFirestore";

import styles from "./Modal.module.css";

const Modal = ({ id, setModal }) => {
  const { deleteDocument } = useFirestore("groups", id);

  const handleClick = () => {
    deleteDocument();
    setModal(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.card}>
        <p>¿Seguro que quieres borrar este grupo?</p>
        <span>
          <button onClick={handleClick}>sí</button>
          <button onClick={() => setModal(false)}>no</button>
        </span>
      </div>
    </div>
  );
};

export default Modal;
