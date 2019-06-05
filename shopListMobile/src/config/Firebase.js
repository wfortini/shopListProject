import * as firebase from 'firebase';
import * as c from "./Constants"

// Initialize Firebase
// vitriny2019@gmail.com
var config = {
  apiKey: "AIzaSyCS2c_hcIQH-M88ZnJTlt8rSlEBRD6a160",
  authDomain: "vitriny-f2e3b.firebaseapp.com",
  databaseURL: "https://vitriny-f2e3b.firebaseio.com",
  projectId: "vitriny-f2e3b",
  storageBucket: "vitriny-f2e3b.appspot.com",
  messagingSenderId: "564008022327"
};
  firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();