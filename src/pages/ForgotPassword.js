import {
    Typography,
    makeStyles,
    FormControl,
    TextField,
    Button,
    CircularProgress,
  } from "@material-ui/core";
  import { Link } from "react-router-dom";
  import FormOuter from "../components/FormOuter";
  import routes from "../common/routes";
  import { memo, useRef, useState } from "react";
  import { useDispatch} from "react-redux";
  import { successAlert } from "../redux/actionCreators/alertActions";
  import {resetPassword} from "../redux/actionCreators/authActions";
  import "./login.css";
  
  
  const styles = makeStyles((theme) => ({
    heading: {
      fontWeight: 500,
    },
    link: {
      textDecoration: "none",
    },
    button: {
      padding: "1em",
      textTransform: "capitalize",
    },
  }));
  
  const ForgotPassword = () => {
    const classes = styles();
    const dispatch = useDispatch();
    const emailRef = useRef("");
    const [emailMsg, setEmailMsg] = useState(null);
    const [loading, setLoading] = useState(false);
  
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setEmailMsg(null);
  
      const email= emailRef.current.value;

      if(!email){
        (!email) ? setEmailMsg("Enter your email") : setEmailMsg('');
      }else{

        try {
          await resetPassword(email);
          successAlert(dispatch, "Email sent successfully.");
          emailRef.current.value = null;

        } catch (error) {
          
          switch(error.code){
            case "auth/invalid-email":
            case "auth/user-not-found":
                setEmailMsg("Email not registered");
                break;
            default :
              console.log(error);
          }
        }
      }
  
      setLoading(false);
    };
  
  
    return (
      <div className="login1">
        <FormOuter>
          <div className="login">
            <Typography
              variant="h5"
              className={classes.heading}
              gutterBottom={true}
            >
              Reset Password
            </Typography>
  
            <form onSubmit={handleSubmit} color="primary">
              <FormControl margin="normal" color="secondary">
                <TextField
                  label="Email"
                  error={emailMsg ? true : false}
                  color="secondary"
                  inputRef={emailRef}
                  helperText={emailMsg}
                />
              </FormControl>
              <br />
             
  
              
              {loading ? (
                <Typography align="center" component="div">
                  <CircularProgress
                    size={25}
                    thickness={5}
                    color="secondary"
                    style={{ padding: "0.85em" }}
                  />
                </Typography>
              ) : (
                <Button
                  type="submit"
                  variant="outlined"
                  className={classes.button}
                  disableElevation={true}
                  size="medium"
                  fullWidth={true}
                  color="link"
                >
                  Reset Password
                </Button>
              )}
            </form>
            <div>
            <Link to="/login">Login</Link>
            </div>
  
            <br />
            <br />
            <Typography variant="subtitle2" align="center" color="initial">
              Don't have an account?
              <Link to={routes.signup} className={classes.link}>
                {" "}
                Sign up
              </Link>
            </Typography>
    
          </div>
        </FormOuter>
      </div>
    );
  };
  
  export default memo(ForgotPassword);
  