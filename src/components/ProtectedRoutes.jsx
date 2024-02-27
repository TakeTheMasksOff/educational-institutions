import { Redirect, Route, Switch } from "react-router-dom";
import { availablePages } from "../config/config";
import Universities from "../pages/Universities";
import Schools from "../pages/Schools";
import Lyceums from "../pages/Lyceums";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { removeToken } from "../store/authSlice";

export default function ProtectedRoutes() {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(removeToken());
  };

  return (
    <div className="protected-container">
      <header className="px-5 py-2 flex justify-end align-center">
        <button className="py-1 px-3" onClick={logout}>
          Logout
        </button>
      </header>
      <nav>
        <ul className="p-5">
          <li className="my-4">
            <NavLink to={availablePages.universities}>Universities</NavLink>
          </li>
          <li className="my-4">
            <NavLink to={availablePages.schools}>Schools</NavLink>
          </li>
          <li className="my-4">
            <NavLink to={availablePages.lyceums}>Lyceums</NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Switch>
          <Route path={availablePages.universities} component={Universities} />
          <Route path={availablePages.schools} component={Schools} />
          <Route path={availablePages.lyceums} component={Lyceums} />
          <Redirect to={availablePages.universities} />
        </Switch>
      </main>
    </div>
  );
}
