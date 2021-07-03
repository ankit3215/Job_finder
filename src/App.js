import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import routes from "./common/routes";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect } from "react";
import { hideAlert } from "./redux/actionCreators/alertActions";
import PublicRoute from "./components/PublicRoute";
import { setUserData } from "./redux/actionCreators/authActions";
import Nav from "./pages/Nav";
import RoleBasedRoute from "./components/RoleBasedRoute";
import EmployerBoard from "./pages/EmployerBoard";
import DashboardMain from "./components/dashboardMain";

const App = () => {
  const alert = useSelector((state) => state.alert);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setUserData(dispatch);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (alert.isRequired) {
        hideAlert(dispatch);
      }
    }, 2000);
  });
  return (
    <div>
      {alert.isRequired && (
        <Alert
          variant="filled"
          severity={alert.alertType}
          style={{
            width: "40%",
            position: "absolute",
            right: "10%",
            top: "7%",
          }}
        >
          {alert.message}
        </Alert>
      )}

      <Router>
        <Switch>
          <RoleBasedRoute
            path="/dashboard"
            component={DashboardMain}
            allow="freelancer"
          />
          <RoleBasedRoute
            path="/employerBoard"
            component={EmployerBoard}
            allow="company"
          />

          <PublicRoute
            path={routes.login}
            restricted={true}
            component={Login}
          />

          <PublicRoute path="/Nav" component={Nav} />

          <PublicRoute
            path={routes.signup}
            component={Signup}
            restricted={true}
          />
          <PublicRoute
            path={routes.ForgotPassword}
            component={ForgotPassword}
            restricted={true}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
