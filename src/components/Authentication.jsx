import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useHistory, useLocation } from "react-router-dom";
import { storageConstants, constants, availablePages } from "../config/config";

const openPages = [availablePages.login];

export default function Authentication({ token, sessionStatus, activate, deactivate, protectedRoutes, openRoutes }) {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    let decodedToken = null;
    if (token) decodedToken = jwtDecode(token);
    if (decodedToken && Math.floor(Date.now() / 1000) < decodedToken.exp) {
      if (sessionStatus != constants.sessionStatus.active) {
        activate(token);
      }
    } else {
      if (sessionStatus != constants.sessionStatus.inactive) {
        deactivate();
      }
    }
  }, [location, token]);

  if (sessionStatus == constants.sessionStatus.off) {
    return null;
  } else if (sessionStatus == constants.sessionStatus.active) {
    return protectedRoutes;
  } else {
    return openRoutes;
  }
}
