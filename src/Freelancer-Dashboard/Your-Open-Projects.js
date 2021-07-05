import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import db from "../services/firestoreServices";

function AppliedFreelancers() {
  const [applied, setApplied] = useState([]);
  const auth = useSelector((state) => state.auth);
  const stateEmail = auth.userInfo.email;
  const [jobArray, setJobArray] = useState([]);
  const getJobs = async () => {
    const ref = db.collection("Jobs");
    await ref.onSnapshot((querySnapshot) => {
      const Jobs = [];
      querySnapshot.forEach((docs) => {
        Jobs.push(docs.data());
      });
      setJobArray(Jobs);
    });
  };

  useEffect(() => {
    getJobs();
  }, []);
  
  useEffect(() => {
    let appliedJobs = [];

    if (jobArray !== []) {
      jobArray.forEach((Job) => {
        if (Job.applied) {
          Job.applied.forEach((email) => {
            if (email === stateEmail) {
              appliedJobs.push(Job);
            }
          });
        }
      });
    }
    setApplied(appliedJobs);
  }, [jobArray, stateEmail]);
  console.log(applied);
  return (
    <>
      <h1>Applied jobs are...</h1>
      <div className="container-fluid">
        <div className="row">
          {applied &&
            applied.map((Job) => {
              return (
                <>
                  <div className="col-4" key={Job.id}>
                    <div className="card">
                      <div className="card-body">
                        <h5>{Job.Job_Title}</h5>
                        <p>{Job.Description}</p>
                        <p>{Job.Skills}</p>
                        <p>{Job.Location}</p>
                        <p>{Job.Budget}</p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default AppliedFreelancers;
