import { Redirect, Route, Switch } from "react-router-dom";
import { availablePages } from "../config/config";
import Login from "../pages/Login";

export default function OpenRoutes() {
  return (
    <Switch>
      <Route path={availablePages.login} component={Login} />
      <Redirect to={availablePages.login} />
    </Switch>
  );
}
