import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import db from "../services/firestoreServices";

export default function Job() {
    const {id} = useParams();
    const [Jobs, setJobs] = useState([]);

    useEffect(()=>{
        (async () => {
            const response = db.collection("Jobs")
            const data = await response.get();
            const newData = data.docs.map((item) => ({ ...item.data(), id: item.id }));
            setJobs(newData);
          })()
      
        }, []);
    return (
        <div>
                <h1>Job page </h1>
        </div>
    )
}
