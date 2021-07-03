import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Overlay from "./Overlay";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import firebase from "../firebase";
import { toast , ToastContainer} from 'react-toastify';

const useStyles = makeStyles({
  root: {
    minWidth: 270 ,
    background: "#E8A87C"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ApplyButton({ jobData }) {
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();
  const [status, setStatus] = useState(false);
  const [fileUrl1 ,setFileUrl1] = useState(null);
    const stateEmail = useSelector(state => auth.userInfo.email);
    const ref = firebase.firestore().collection("Jobs");
    const [Jobs, setJobs] = useState([]);

    
  const submitHandler=async(e)=>{
      e.preventDefault();
      const ref = firebase.firestore().collection("Jobs").doc(jobData.id.toString());
      await ref.update({
          applied: firebase.firestore.FieldValue.arrayUnion({email : stateEmail, name:auth.userInfo.displayName})
      }).then(()=>{
          toast.success("applied successfully");
      }).catch((err)=>{
          toast.warn(err);
      })

    await ref.get().then((docRef) => {
      setFileUrl1(docRef.data().url);
    });
  };

  const getJobs = () => {
    ref.onSnapshot((querySnapshot) => {
        const job = [];
        querySnapshot.forEach((doc) => {
            // const data=doc.data();
            job.push({
                ...doc.data(),
                id: doc.id
            });
            // console.log(doc);
        })
        setJobs(job);
    })

}

useEffect(() => {
    getJobs();
}, [])
  return (
    <>
      <Button
        size="small"
        style={{ textTransform: "capitalize" }}
        type=""
        disabled={false}
        className=""
        color="secondary"
        variant="contained"
        onClick={() => setStatus(true)}
      >
        Apply
      </Button>

      <Overlay status={status} onClose={() => setStatus(false)}>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Application form for {jobData.id}
            </Typography>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={submitHandler}>
              <div>
                <TextField
                  disabled
                  id="filled-required"
                  label="Name"
                  value={auth.userInfo.displayName}
                  variant="filled"
                  required="true"
                />
                <TextField
                  
                  id="filled-disabled"
                  label="E-mail"
                  value={auth.userInfo.email}
                  variant="filled"
                  required="true"
                />
                <br />
                <TextField
                  
                  label="Cover Letter"
                  value=" "
                  variant="filled"
                  required="true"
                />
                <br />
                
               
                <CardActions>
                <Button size="small" variant="contained" type="submit" color="secondary">Apply</Button>
              </CardActions>
              </div>
              <div>
                
              </div>
            </form>
          </CardContent>
         
        </Card>
      </Overlay>
      <ToastContainer />
    </>
  );
}
