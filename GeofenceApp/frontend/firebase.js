// // Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
// //import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAk1slggYdfq1hchoaZLWA1jznhqBP06pA",
//   authDomain: "geofence-ae541.firebaseapp.com",
//   databaseURL: "https://geofence-ae541-default-rtdb.firebaseio.com",
//   projectId: "geofence-ae541",
//   storageBucket: "geofence-ae541.appspot.com",
//   messagingSenderId: "522990162461",
//   appId: "1:522990162461:web:1088cc1847aaf1ca3bacf4",
//   measurementId: "G-X30BF3FTTP",
// };

// // Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

// const auth = firebase.auth();
// //const analytics = getAnalytics(app);

// export { auth };

import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk1slggYdfq1hchoaZLWA1jznhqBP06pA",
  authDomain: "geofence-ae541.firebaseapp.com",
  databaseURL: "https://geofence-ae541-default-rtdb.firebaseio.com",
  projectId: "geofence-ae541",
  storageBucket: "geofence-ae541.appspot.com",
  messagingSenderId: "522990162461",
  appId: "1:522990162461:web:1088cc1847aaf1ca3bacf4",
  measurementId: "G-X30BF3FTTP",
};

const app = initializeApp(firebaseConfig);

export { app };
