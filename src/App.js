import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/useAuthListener";
import UserContext from "./context/user";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const notFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback="Loading">
          <Switch>
            <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
            <Route path={ROUTES.LOGIN} component={Login} exact />
            <Route path={ROUTES.SIGNUP} component={Signup} exact />
            <Route component={notFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
