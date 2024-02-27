import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Authentication from "./components/Authentication.jsx";
import { activate, deactivate, setToken } from "./store/authSlice.js";
import OpenRoutes from "./components/OpenRoutes.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import { storageConstants } from "./config/config.js";

function App() {
  const sessionStatus = useSelector((state) => state.auth.sessionStatus);
  const authToken = useSelector((state) => state.auth.authToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(storageConstants.token) ?? "";
    dispatch(setToken(token));
  }, []);

  return (
    <Authentication
      token={authToken}
      sessionStatus={sessionStatus}
      activate={() => dispatch(activate())}
      deactivate={() => dispatch(deactivate())}
      protectedRoutes={<ProtectedRoutes />}
      openRoutes={<OpenRoutes />}
    />
  );
}

export default App;
