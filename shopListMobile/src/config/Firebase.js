import * as firebase from 'firebase';
import * as c from "./Constants"

// Initialize Firebase
// fortini
var config = {
  apiKey: "AIzaSyD5f3Mw-P5GDVu-x3NnOlB3N35ijE-EAnA",
  authDomain: "shoplist-664da.firebaseapp.com",
  databaseURL: "https://shoplist-664da.firebaseio.com",
  projectId: "shoplist-664da",
  storageBucket: "shoplist-664da.appspot.com",
  messagingSenderId: "247759578680",
  appId: "1:247759578680:web:52609335140786fc"
};
  firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();