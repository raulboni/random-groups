import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className={styles.login} onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label>
        <span>Email</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      <label>
        <span>Password</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && <button className="btn">Login</button>}
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
