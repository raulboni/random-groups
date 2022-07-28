//react
import { Link } from "react-router-dom";

//custom hooks
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";

//components
import GroupList from "../../components/GroupList";

//styles
import styles from "./Home.module.css";

const Home = () => {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("groups", ["uid", "==", user.uid]);

  return (
    <div className={styles.home}>
      {documents && <GroupList groups={documents} />}
      {error && <p>{error}</p>}
      <button className="btn">
        <Link to="/create">
          <p>Crear grupo</p>
        </Link>
      </button>
    </div>
  );
};

export default Home;
