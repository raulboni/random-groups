import { useState, useEffect } from "react";
import { useSingup } from "../../hooks/useSignup";

import styles from "./Signup.module.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isPending, error, signup } = useSingup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.signup}>
      <h1>Sign Up</h1>
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

      {!isPending && <button className="btn">Sign Up</button>}
      {isPending && <button disabled>Loading</button>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default Signup;
