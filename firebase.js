import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAHbhO19nd_wSN93fzYyJYwAnmlxhG1-dQ",
  authDomain: "chatbot-placeholder.firebaseapp.com",
  databaseURL: "https://chatbot-placeholder.firebaseio.com",
  projectId: "chatbot-placeholder",
  storageBucket: "chatbot-placeholder.appspot.com",
  messagingSenderId: "281623463894",
  appId: "1:281623463894:web:f4296fe7ce4d649873c677",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
