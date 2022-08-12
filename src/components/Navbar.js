import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

//styles
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <h1>Grupos Random</h1>
      </Link>

      <span>
        {user && <span className={styles.email}>{user.email}</span>}
        {user && <a onClick={() => logout()}>Logout</a>}
        {!user && (
          <Link to="/login">
            <a>Login</a>
          </Link>
        )}
        {!user && (
          <Link to="/signup">
            <a>Signup</a>
          </Link>
        )}
      </span>
    </nav>
  );
};

export default Navbar;
