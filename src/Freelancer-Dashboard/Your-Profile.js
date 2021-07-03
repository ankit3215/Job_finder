import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import firebase from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles, Input, Avatar } from "@material-ui/core";
import { Center } from "@chakra-ui/react";
import { uploadFile } from "../services/fireStorage";
import "react-toastify/dist/ReactToastify.css";
import db from "../services/firestoreServices";




const styles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
  },
  button: {
    padding: "1em",
    textTransform: "capitalize",
  },
  heading: {
    fontWeight: 500,
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

function Profile(props) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [dob, setDOB] = useState("");
  const [id, setId] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [fileUrl1, setFileUrl1] = useState(null);
  const classes = styles();
  const auth = useSelector((state) => state.auth);
  const userId = auth.userInfo.userId;
  let names = "";
  let phones = "";
  let ids = "";
  let cities = "";
  let states = "";
  let countries = "";
  let dobs = "";

  useEffect(() => {
    setName(names);
    setPhone(phones);
    setId(ids);
    setCity(cities);
    setState(states);
    setCountry(countries);
    setDOB(dobs);
  }, [ids, names, phones, cities, states, countries, dobs]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const ref = firebase
      .firestore()
      .collection("userInfo")
      .doc(userId.toString());
    await ref
      .update({
        displayName: name,
        email: auth.userInfo.email,
        displayPhone: phone,
        displayCity: city,
        displayState: state,
        displayCountry: country,
        displayDOB: dob,
      })
      .then(() => {
        toast.success("Updated Successfully");
      })
      .catch((err) => {
        toast.warn(err);
      });
  };

  const onFileChange = async (e) => {
    
    const file = e.target.files[0];
    if(!file) return;

    const name = file.name;
    const fileUrl = await uploadFile(file, `profilePic/${name}`);

    

    const doc = db.collection("userInfo").doc(userId.toString());

    await doc
    .update({
      imageUrl: fileUrl,
    })
    .then(() => {
      setFileUrl(fileUrl);
      console.log("url updated in database");
    })
    .catch(() => {
      console.log("some error occured");
    });

    await doc.get().then((docRef) => {
      setFileUrl1(docRef.data().url);
    });
};
  return (
    <>
    <Center>
    <Avatar  className={classes.large}
    src = {fileUrl || auth.userInfo.imageUrl}

  />    
    </Center>
   
      <Center>
        <form onSubmit={submitHandler}>
          <Typography variant="h3">ᴜᴘᴅᴀᴛᴇ ʏᴏᴜʀ ᴘʀᴏꜰɪʟᴇ</Typography>
          
          <Typography>Email</Typography>
          <Input
            type="email"
            required="true"
            fullWidth="true"
            value={auth.userInfo.email}
            disabled
          />
          <br />
          <Typography>Phone</Typography>
          <Input
            type="number"
            required="true"
            fullWidth="true"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <Typography>Name</Typography>
          <Input
            type="text"
            required="true"
            fullWidth="true"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <Typography>DOB</Typography>
          <Input
            type="date"
            required="true"
            fullWidth="true"
            value={dob}
            onChange={(e) => setDOB(e.target.value)}
          />
          <br />
          <Typography>City</Typography>
          <Input
            type="text"
            required="true"
            fullWidth="true"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <br />
          <Typography>State</Typography>
          <Input
            type="text"
            required="true"
            fullWidth="true"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <br />
          <Typography>Country</Typography>
          <Input
            type="text"
            required="true"
            fullWidth="true"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <br />

          <Button
            type="submit"
            variant="contained"
            compo
            className={classes.button}
          >
            Update
          </Button>
          <Typography>Set Image</Typography>
          <input type="file" accept="image/*" onChange={onFileChange} />
          {fileUrl1 && (
            <img
              src={fileUrl1}
              alt="profile img"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </form>
      </Center>
      <ToastContainer />
      <hr />
    </>
  );
}

export default Profile;
