import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import routes from "./common/routes";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect } from "react";
import { hideAlert } from "./redux/actionCreators/alertActions";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { setUserData } from "./redux/actionCreators/authActions";

const App = () => {
  const alert = useSelector(state => state.alert);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setUserData(dispatch);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if(alert.isRequired){
          hideAlert(dispatch);
      }
    }, 2000)
  })
  return (
    <>
      {alert.isRequired &&
        <Alert variant="filled" severity={alert.alertType} style={{ width: '20%', position: "absolute", "right": '8%', top: '5%' }}>
          {alert.message}
        </Alert>
      }

    <Router>
      <Switch>
          <PrivateRoute exact path={routes.root} component={Dashboard} />

          <PublicRoute path={routes.login} component={Login} restricted={true}  />

          <PublicRoute path={routes.signup} component={Signup} restricted={true} />

      </Switch>
    </Router>
    </>
  );
}

export default App;
