import {
    Typography,
    makeStyles,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    Button,
    Grid,
    CircularProgress
} from "@material-ui/core";
import { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { updateUser } from "../redux/actionCreators/authActions";
import { userRegisteredAlert } from "../redux/actionCreators/alertActions";
const styles = makeStyles(() => ({
   
    button: {
        padding: "1em",
        textTransform: "capitalize"
    },
    heading: {
        fontWeight: 500,
    },

}))

const RoleForm = () => {
    const classes = styles();

    const [role, setRole] = useState('freelancer');
    const [loading, setLoading] = useState(false);
    const auth = useSelector(state => state.auth); 
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await updateUser(auth.userInfo.userId, { role });
        userRegisteredAlert(dispatch, "Registered Successfully", "success");
        
        setLoading(false);

        history.push('/login');
    }

    return ( 
        <>
            <Typography variant="h5" className={classes.heading} align="center" color="initial" gutterBottom={true}>
                Select Role
            </Typography>
            <form onSubmit={handleSubmit}>
            <br></br>
                <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">Role</FormLabel>
                    <RadioGroup aria-label="Role" name="userRole" value={role} onChange={(e) => setRole(e.target.value)}>
                        <Grid container spacing={1}>
                            <FormControlLabel value="freelancer" control={<Radio />} label="Freelancer" />
                            <FormControlLabel value="employer" control={<Radio />} label="Employer" />
                        </Grid>
                    </RadioGroup>
                </FormControl>
                <br />
                <br />
                {loading ? (
                    <Typography align="center" component="div">
                        <CircularProgress size={25} thickness={5} color="primary" style={{ padding: '0.85em' }} />
                    </Typography>
                ) : (
                    <Button type="submit" variant="contained" className={classes.button} disableElevation={true} size="large" fullWidth={true} color="primary">
                       Submit
                    </Button>
                )}
            </form> 
        </>
     );
}
 
export default memo(RoleForm);