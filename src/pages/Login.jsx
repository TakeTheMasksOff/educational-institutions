import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import { setToken } from "../store/authSlice";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_AUTH_API_URL + "auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          // expiresInMins: 60, // optional
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setToken(data.token));
      } else {
        console.error("Login failed:", response.status);
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text ">
      <form className="mb-6 w-1/3 mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="username" className="mb-2 uppercase font-bold text-lg text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border py-2 px-3 text-gray-700 rounded"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="mb-2 uppercase font-bold text-lg text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border py-2 px-3 text-gray-700 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="block bg-blue-500 hover:bg-blue-700 text-white uppercase text-lg mx-auto p-4 rounded"
        >
          {isLoading ? <Loading /> : "Login"}
        </button>
      </form>

      <Modal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)}>
        <h3>Invalid Login</h3>
        <p>Incorrect username or password.</p>
      </Modal>
    </div>
  );
}

export default Login;
