import {
    Typography,
    makeStyles,
    FormControl,
    TextField,
    Button,
    Grid,
    CircularProgress
} from "@material-ui/core";
import { Link } from "react-router-dom";
import FormOuter from "../components/FormOuter";
import routes from "../common/routes";
import { memo, useRef, useState} from "react";
import { getRefsValue } from "../common/polyfills";
import { useDispatch } from "react-redux";
import {errorAlert} from "../redux/actionCreators/alertActions"
import { loginWithGoogle, signInUser } from "../redux/actionCreators/authActions";

const styles = makeStyles((theme) => ({
    heading: {
        fontWeight: 500,
    },
    link: {
        color: theme.palette.secondary.main,
        textDecoration : "none",
    },
    button: {
        padding: "1em",
        textTransform: "capitalize"
    }
}))

const Login = () => {
    const classes = styles();
    const dispatch = useDispatch();
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const [emailMsg, setEmailMsg] = useState(null);
    const [passwordMsg, setPasswordMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [gLoading, setgLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordMsg(null);
        setEmailMsg(null);

        const [email, password] = getRefsValue(emailRef, passwordRef);
        let userData;
       
        if(!email || !password){
            (!email) ? setEmailMsg("Email can't be empty") : setEmailMsg(null);
            (!password) ? setPasswordMsg("Password can't be empty"): setPasswordMsg(null);
        }else{
            setLoading(true);
            userData = await signInUser(dispatch, { email, password }).catch(err => {

                switch (err.code) {
                    case 'auth/invalid-email' :
                    case 'auth/user-not-found' :
                        setEmailMsg("Email not registered");
                        setPasswordMsg(null);
                        break;

                    case 'auth/wrong-password':
                        setEmailMsg(null);
                        setPasswordMsg("Invalid Password");
                        break;
                        
                    case 'auth/popup-closed-by-user':
                        errorAlert(dispatch, "Connection closed");
                        break;

                    default :
                        console.log(err);
                }
            });
        }

        setLoading(false);
    }


    const handleGoogleLogin = async () => {
        setgLoading(true);

        try {
            await loginWithGoogle(dispatch);
        } catch (error) {
            switch (error.code) {
                case "auth/email-not-registered":
                    errorAlert(dispatch, "Email not Register. Try signing up")
                    break;
                case 'auth/popup-closed-by-user':
                    errorAlert(dispatch, "Connection closed");
                    break;
                default:
                    console.log(error);
                    break;
            }
        }
        setgLoading(false);
    }

    return (
        <FormOuter>
            <Typography variant="h5" className={classes.heading} align="center" color="initial" gutterBottom={true}>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth={true} margin="normal">
                    <TextField label="Email" error={emailMsg ? true : false}  color="primary" inputRef={emailRef} helperText={emailMsg} />
                </FormControl>
                <br />
                <FormControl fullWidth={true} margin="normal">
                    <TextField label="Password" error={passwordMsg ? true : false} type="password" inputRef={passwordRef} helperText={passwordMsg}  />
                </FormControl>

                <br />
                <br />
                <br />
                {loading ? (
                    <Typography align="center" component="div">
                        <CircularProgress size={25} thickness={5} color="primary" style={{ padding: '0.85em' }} />
                    </Typography>
                ) : (
                    <Button type="submit" variant="contained" className={classes.button} disableElevation={true} size="large" fullWidth={true} color="primary">
                        Login
                    </Button>
                )}
                
            </form>

            <br />
            <br />
            <Typography variant="subtitle2" align="center" color="initial">
                Don't have an account?
                <Link to={routes.signup} className={classes.link}> Sign up</Link>
            </Typography>
            <br />
            <br />
            <Grid container spacing={1} justify="center">
                {
                    gLoading ?
                        <CircularProgress size={25} thickness={5} color="primary" />
                        :
                        <Button onClick={handleGoogleLogin}>
                            <img src="./google-icon.svg" alt="" height="50" />
                        </Button>
                }
            </Grid>
        </FormOuter>     
    )
}

export default memo(Login);