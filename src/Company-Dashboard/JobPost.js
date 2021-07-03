import React, { useEffect } from "react";
import { Typography, Button, Input } from "@material-ui/core";
import db from "../services/firestoreServices";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
toast.configure();

const initialState = {
  Job_Title: "",
  Description: "",
  Budget: "",
  Location: "",
  Skills: "",
  Type: ""
};

const JobPost = () => {
  const [values, setValues] = useState(initialState);
  const param = useParams();
  const {userInfo} = useSelector(state => state.auth);

  const fetchData = async (jobId) => {
    const response = db.collection("Jobs").doc(jobId);
    const data = await response.get();
    const newData = data.data();

    setValues(newData);
  };

  const sub = () => {
    // Add data to the store
    db.collection("Jobs")
      .add({...values, companyId : userInfo.userId})
      .then((docRef) => {
        setValues(initialState);
      })
      .catch((error) => {
        toast.error("Error adding document: ", error);
      });
  };

  const updateData = async () => {
    await db
      .collection("Jobs")
      .doc(param.jobId)
      .update(values)
      .then(() => {
        setValues(initialState);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (param.jobId) {
      updateData();
    }
    
    else {
      sub();
    }
  };

  useEffect(() => {
    if (param.jobId) {
      fetchData(param.jobId);
    }
  }, [param.jobId]);

  const notify = () => {
    toast("Submitted Successfully");
  };

  return (
    <div>
      <center>
        <Typography variant="h3">𝐏𝐨𝐬𝐭 𝐚 𝐉𝐨𝐛</Typography>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Job Title"
            color="secondary"
            fullWidth="bool"
            required="true"
            onChange={(e) => {
              setValues((p) => ({ ...p, Job_Title: e.target.value }));
            }}
            value={values.Job_Title}
          />
          <br />
          <br />
          <Input
            type="text"
            placeholder="Description"
            color="secondary"
            fullWidth="bool"
            required="true"
            onChange={(e) => {
              setValues((p) => ({ ...p, Description: e.target.value }));
            }}
            value={values.Description}
          />
          <br />
          <br />
          <Input
            type="number"
            placeholder="Budget in Rs"
            color="secondary"
            fullWidth="bool"
            required="true"
            onChange={(e) => {
              setValues((p) => ({ ...p, Budget: e.target.value }));
            }}
            value={values.Budget}
          />
          <br />
          <br />
          <Input
            type="text"
            placeholder="Skills"
            color="secondary"
            fullWidth="bool"
            required="true"
            onChange={(e) => {
              setValues((p) => ({ ...p, Skills: e.target.value }));
            }}
            value={values.Skills}
          />
          <br />
          <br />
          <Input
            type="text"
            placeholder="Location"
            color="secondary"
            fullWidth="bool"
            required="true"
            onChange={(e) => {
              setValues((p) => ({ ...p, Location: e.target.value }));
            }}
            value={values.Location}
          />

          <br />
          <br />
          <Input
            type="text"
            placeholder="Job Type"
            color="secondary"
            fullWidth="bool"
            required="true"
            onChange={(e) => {
              setValues((p) => ({ ...p, Type: e.target.value }));
            }}
            value={values.Type}
          />

          <br />
          <br />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={notify}
          >
            {param.jobId ? "Update" : "Add"}
          </Button>
        </form>
      </center>
      <ToastContainer />
    </div>
  );
};

export default JobPost;
