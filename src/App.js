import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Create from "./pages/create/Create";
import Group from "./pages/group/Group";
import { useAuthContext } from "./hooks/useAuthContext";

import styles from "./app.css";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && ( //only renders components when we get data from useAuthContext
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />

            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />

            <Route path="/create" element={<Create />} />

            <Route path="/group/:id" element={<Group />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
