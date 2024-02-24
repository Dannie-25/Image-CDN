import { initializeApp } from 'firebase/app';
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCG6n-jI6eXJl9FsxB31Hl2TczaKJ_EoJo",
    authDomain: "reactnative-5bb8f.firebaseapp.com",
    projectId: "reactnative-5bb8f",
    storageBucket: "reactnative-5bb8f.appspot.com",
    messagingSenderId: "765263339329",
    appId: "1:765263339329:web:b8e0b719265e82ce5f4bc0"
  };

const app = initializeApp(firebaseConfig);

const storage = getStorage(app, "gs://reactnative-5bb8f.appspot.com");
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export {storage, app as default};
