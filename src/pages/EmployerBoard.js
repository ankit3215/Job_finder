import { useSelector, useDispatch } from "react-redux";
import { logOutUser } from "../redux/actionCreators/authActions";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import routes from "../common/routes";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import Profile2 from "../Company-Dashboard/Profile2";
import JobPost from "../Company-Dashboard/JobPost";
import  JobC from "../Company-Dashboard/JobC";
import Notification from "../Company-Dashboard/Notification";
import Job from "../Company-Dashboard/Job"
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#222629"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#202020"
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

const EmployerBoard = () => {
  const auth = useSelector((state) => state.auth);

  const userId = auth.userInfo.userId;
  const dispatch = useDispatch();

  const handleClick = () => {
    logOutUser(dispatch, userId);
    //history.push();
  };

  const classes = useStyles();
  const match = useRouteMatch();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h4" noWrap>
            {auth.userInfo.displayName}
          </Typography>
          <Typography variant="h9" noWrap>
            Company
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <Link to={match.path} className={classes.link}>
              <ListItem button>
                <ListItemText>Home</ListItemText>
              </ListItem>
            </Link>
            <Link
              to={`${match.path}${routes.profile2}`}
              className={classes.link}
            >
              <ListItem button>
                <ListItemText>Profile</ListItemText>
              </ListItem>
            </Link>
            <Link
              to={`${match.path}${routes.jobpost}`}
              className={classes.link}
            >
              <ListItem button>
                <ListItemText>Post a Job</ListItemText>
              </ListItem>
            </Link>
            <Link
              to={`${match.path}${routes.jobc}`}
              className={classes.link}
            >
            <ListItem button>
              <ListItemText>Jobs</ListItemText>
            </ListItem>
            </Link>
            <Link
              to={`${match.path}${routes.notification}`}
              className={classes.link}
            >
            <ListItem button>
              <ListItemText>Notifications</ListItemText>
            </ListItem>
            </Link>
          </List>
          <Divider />
          <Button onClick={handleClick} variant="outlined" color="primary">
            Logout
          </Button>
        </div>
      </Drawer>
      {console.log(auth)}
      <main className={classes.content}>
        <Toolbar />
        <Switch>
          <Route exact path={`${match.path}`}>
            <Typography variant="h4">
              Welcome to dashboard, {auth.userInfo.displayName}
            </Typography>
          </Route>
          <Route
            exact
            path={`${match.path}${routes.profile2}`}
            component={Profile2}
          />
          <Route
            exact
            path={`${match.path}${routes.jobpost}/:jobId?`}
            component={JobPost}
          />
          <Route
            exact
            path={`${match.path}${routes.jobc}`}
            component={JobC}
          />
          <Route
            exact
            path={`${match.path}${routes.notification}`}
            component={Notification}
          />
          <Route
            exact
            path={`${match.path}${routes.job}`}
            component={Job}
          />
        </Switch>
      </main>
    </div>
  );
};

export default EmployerBoard;
