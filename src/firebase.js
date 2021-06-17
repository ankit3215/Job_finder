import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBuaYo7tSog0hMiWIbH23upY8C5hyxFeGI",
    authDomain: "joblook-ea2d7.firebaseapp.com",
    projectId: "joblook-ea2d7",
    storageBucket: "joblook-ea2d7.appspot.com",
    messagingSenderId: "791280800595",
    appId: "1:791280800595:web:f79762011bc9596b9ec7a6"
};


firebase.initializeApp(firebaseConfig);

export default firebase;