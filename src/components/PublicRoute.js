import { Route, Redirect } from "react-router";
import { isTokenAvailable } from "../services/authServices";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isTokenAvailable() && restricted ?
                <Redirect to="/" />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;