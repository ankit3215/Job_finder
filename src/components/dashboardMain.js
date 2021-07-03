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
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import routes from "../common/routes";
import yourProfile from "../Freelancer-Dashboard/Your-Profile";
import Projects from "../Freelancer-Dashboard/Projects";
import AppliedFreelancers from "../Freelancer-Dashboard/Your-Open-Projects";


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#283747"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#203647"
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link:{
      textDecoration: 'none',
      color: theme.palette.text.primary
  },
  
}));

const DashboardMain = () => {
  const auth = useSelector((state) => state.auth);

  const userId = auth.userInfo.userId;
  const dispatch = useDispatch();

  const handleClick = () => {
    logOutUser(dispatch, userId);
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
            <Divider />
          <Typography variant="h9" noWrap>
            Freelancer
          </Typography>
          <br />
          <br />
          <br />
          <br />
          <Button  onClick={handleClick} variant="outlined" color="primary">
          Logout
      </Button>
        </Toolbar>
      </AppBar>
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
            <Link to={`${match.path}${routes.profile}`} className={classes.link}>
            <ListItem button>
            <ListItemText>Your Profile</ListItemText>
            </ListItem>
            </Link>
            <Link to={`${match.path}${routes.jobs}`} className={classes.link}>
            <ListItem button>
            <ListItemText>Projects</ListItemText>
            </ListItem>
            </Link>
            <Link to={`${match.path}${routes.appliedfreelancers}`} className={classes.link}>
            <ListItem button>
            <ListItemText>Open Projects</ListItemText>
            </ListItem>
            </Link>
          </List>
          <Divider />
         
        </div>
      </Drawer>
      {console.log(auth)}
      <main className={classes.content}>
        <Toolbar />
        <Switch>
          <Route exact path={`${match.path}`}>
                <Typography variant="h4">Welcome to dashboard, {auth.userInfo.displayName} </Typography>
          </Route>
          <Route exact path={`${match.path}${routes.profile}`} component={yourProfile} />
          <Route exact path={`${match.path}${routes.jobs}`} component={Projects} />
          <Route exact path={`${match.path}${routes.appliedfreelancers}`} component={AppliedFreelancers} />
              
        </Switch>  
      </main>
    </div>
  );
};

export default DashboardMain;
