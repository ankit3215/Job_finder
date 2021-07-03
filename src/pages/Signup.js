import { useState, memo } from "react";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import FormOuter from "../components/FormOuter";
import SignupForm from "../components/SignupForm";
import RoleForm from "../components/RoleForm";
import { signUpWithGoogle } from "../redux/actionCreators/authActions";
import { useDispatch } from "react-redux";
import { errorAlert } from "../redux/actionCreators/alertActions";
import "./signup.css";

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
        case "auth/email-already-exist":
          errorAlert(dispatch, "Email already in use. Try logging in");
          break;
        case "auth/popup-closed-by-user":
          errorAlert(dispatch, "Connection closed");
          break;
        default:
          console.log(error);
          break;
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="signup1">
        <FormOuter>
          <div className="signup">
            {selectRole ? (
              <RoleForm />
            ) : (
              <SignupForm setSelectRole={setSelectRole} />
            )}

            {!selectRole && (
              <div>
                <br />
                <br />
                <Grid container spacing={1} justify="center">
                  <Grid item>
                    {loading ? (
                      <CircularProgress
                        size={25}
                        thickness={5}
                        color="primary"
                      />
                    ) : (
                      <Button
                        onClick={handleGoogleSignup}
                        variant="outlined"
                        color="secondary"
                      >
                        Sign up With Google
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
        </FormOuter>
      </div>
    </div>
  );
};

export default memo(Signup);
