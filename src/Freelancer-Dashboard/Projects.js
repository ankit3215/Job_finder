import db from "../services/firestoreServices";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import { TableHead, TableRow, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import ApplyButton from "../components/ApplyButton";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Projects() {
  const [Jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const fetchJobs = async () => {
    const response = db.collection("Jobs");
    const data = await response.get();
    const newData = data.docs.map((item) => ({ ...item.data(), id: item.id }));
    setJobs(newData);
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  let filteredJobs = Jobs.filter((Job) => {
    return (
      Job.Skills.indexOf(skills) !== -1 && Job.Location.indexOf(location) !== -1
    );
  });

  const classes = useStyles();
  return (
    <div className>
      <Typography variant="h3">ᴊᴏʙꜱ ꜰᴏʀ ʏᴏᴜ</Typography>
      <label>ꜰɪʟᴛᴇʀ ʙʏ ꜱᴋɪʟʟꜱ</label>
      <input
        type="text"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
      <label>ꜰɪʟᴛᴇʀ ʙʏ Job</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
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
                <TableCell>Apply</TableCell>
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
                    <ApplyButton jobData={Job} />
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
export default Projects;
