import db from "../services/firestoreServices";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Edit, Delete } from "@material-ui/icons";
import { useSelector } from "react-redux";
import routes from "../common/routes";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const JobC = () => {
  const [Jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const {userInfo} = useSelector(state=> state.auth);

  useEffect(() => {
    (async () => {
      const response = db.collection("Jobs").where('companyId','==', userInfo.userId);
      const data = await response.get();
      const newData = data.docs.map((item) => ({ ...item.data(), id: item.id }));
      setJobs(newData);
    })()

  }, [userInfo.userId]);

  const classes = useStyles();
  let filteredJobs = Jobs.filter((Job) => {

    return (
      Job.Skills.toLowerCase().indexOf(skills.toLowerCase()) 
      !== -1 && Job.Location.toLowerCase().indexOf(location.toLowerCase()) !== -1
    );
  });

  return (
    <div className>
      <Typography variant="h5">Your Jobs</Typography>
      <br/>
      <label>ꜰɪʟᴛᴇʀ ʙʏ ꜱᴋɪʟʟꜱ</label>
      <input
        type="text"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
      <label>ꜰɪʟᴛᴇʀ ʙʏ Location </label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <br/>
      <br/>/
    
      {filteredJobs && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Job Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Budget</TableCell>
                <TableCell>Skills</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Applications</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredJobs.map((Job) => (
                <TableRow>
                  <TableCell>{Job.Job_Title}</TableCell>
                  <TableCell>{Job.Description}</TableCell>
                  <TableCell>{Job.Budget}</TableCell>
                  <TableCell>{Job.Skills}</TableCell>
                  <TableCell>{Job.Location}</TableCell>
                  <TableCell>
                    <Link to={`${routes.edashboard}/job/${Job.id}`}>
                      View
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Link to={`/employerBoard/jobpost/${Job.id}`}>
                          <Edit fontSize="small" />
                        </Link>
                      </Grid>
                      <Grid item>
                        <Delete fontSize="small" />
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
export default JobC;
