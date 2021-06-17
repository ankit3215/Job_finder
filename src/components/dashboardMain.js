import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../redux/actionCreators/authActions";
import Button from '@material-ui/core/Button'

 const DashboardMain = () => {
    const auth = useSelector(state => state.auth);
    const userRole = auth.userInfo.role;

     const userId = auth.userInfo.userId;
     const dispatch = useDispatch();

     const handleClick = () => {
         logOutUser(dispatch, userId);
         // history.push();
     }
    return (
        <>
            <h1>You are a {userRole}</h1>
            <Button onClick={handleClick} variant="contained" color="primary">
                Logout
            </Button>
        </>
    )
 }

 export default  DashboardMain;
