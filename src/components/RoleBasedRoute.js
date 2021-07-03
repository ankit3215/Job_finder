import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router";
import { isTokenAvailable } from "../services/authServices";

const RoleBasedRoute = ({ component: Component, allow , ...rest}) => {
    const auth = useSelector(state => state.auth);
    const userRole = auth.userInfo.role;
    
    return (
          <>
            { !isTokenAvailable() && <Redirect to='/login' /> }

            {userRole &&
                <Route {...rest} render={ props => 
                    allow === userRole ?
                        <Component {...props}/>
                        :
                        <Redirect to='/' />
                } />
            }
        </>
    )
}

export default RoleBasedRoute;