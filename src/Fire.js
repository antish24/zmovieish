import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCW8EisFN8YfgyfUcY80hwbSLA86J4MVjY",
  authDomain: "zmovies-2402ish.firebaseapp.com",
  projectId: "zmovies-2402ish",
  storageBucket: "zmovies-2402ish.appspot.com",
  messagingSenderId: "701101283188",
  appId: "1:701101283188:web:b938d3ba5d544f0cbbfe21"
};

const Fire = firebase.initializeApp(firebaseConfig);
export default Fire