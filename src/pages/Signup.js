import { useState, memo } from "react";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import FormOuter from "../components/FormOuter";
import SignupForm from "../components/SignupForm";
import RoleForm from "../components/RoleForm";
import { signUpWithGoogle } from "../redux/actionCreators/authActions";
import { useDispatch } from "react-redux";
import { errorAlert } from "../redux/actionCreators/alertActions";
const Signup = () => {
    const [selectRole, setSelectRole] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleGoogleSignup = async () => {
        setLoading(true);

        try {
            await signUpWithGoogle(dispatch);
            setSelectRole(true);
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-exist':
                    errorAlert(dispatch, "Email already in use. Try logging in")
                    break;
                case 'auth/popup-closed-by-user' :
                    errorAlert(dispatch, "Connection closed");
                    break;
                default:
                    console.log(error);
                    break;
            }
        }
        setLoading(false);

    }

    return (
        <>
            <FormOuter>
                {selectRole ? (
                    <RoleForm />
                ) : (
                    <SignupForm setSelectRole={setSelectRole}/>
                )

                }
              
                {
                    !selectRole  && 
                    <>
                        <br />
                        <br />
                        <Grid container spacing={1} justify="center">
                            <Grid item>
                                {
                                    loading ?
                                        <CircularProgress size={25} thickness={5} color="primary" />
                                        :
                                        <Button onClick={handleGoogleSignup}>
                                        <img src="./google-icon.svg" alt="" height="50" />

                                        </Button>
                                }

                            </Grid>
                        </Grid>
                    </>
                    
                }
                
            </FormOuter>
        </>
    )
}

export default memo(Signup);