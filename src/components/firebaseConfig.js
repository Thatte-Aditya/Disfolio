import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcJo1L-Z2pweUsbpbIiOEkyanMHTOv8nU",
  authDomain: "duhacks-644f1.firebaseapp.com",
  projectId: "duhacks-644f1",
  storageBucket: "duhacks-644f1.appspot.com",
  messagingSenderId: "906804235351",
  appId: "1:906804235351:web:904db7291b2dcf3c0ce712"
};

export const app = initializeApp(firebaseConfig);
export const database=getFirestore(app)
export const storage=getStorage(app);
