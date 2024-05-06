import React, { useEffect } from "react";
import ChatRoom from "./chat-room";
import './chatroom.css'
import SendBox from "./send-box";
import { useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import { getFirestore } from "firebase/firestore";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc ,onSnapshot,query,where} from "firebase/firestore";

const app=firebase.initializeApp({
    apiKey: "AIzaSyBcJo1L-Z2pweUsbpbIiOEkyanMHTOv8nU",
    authDomain: "duhacks-644f1.firebaseapp.com",
    projectId: "duhacks-644f1",
    storageBucket: "duhacks-644f1.appspot.com",
    messagingSenderId: "906804235351",
    appId: "1:906804235351:web:904db7291b2dcf3c0ce712"
  })
  
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const analytics = firebase.analytics();
  const db = getFirestore(app);
function ChatFeed({mentor,Hackathon,Channels,Team,chatInd,userid}){
  // console.log(Channels[chatInd]);
  var messageref = collection(db, `/Hackathon/${Hackathon}/Teams/${Team}/Channels/${Channels[chatInd]}/Messages`)
  useEffect(()=>{
     messageref = collection(db, `/Hackathon/${Hackathon}/Teams/${Team}/Channels/${Channels[chatInd]}/Messages`)
  },[chatInd],[])

 
  const dummy = useRef();
  const [text,settext]=useState('');

  return (
    <div style={{height:'100vh'}}>
       <ChatRoom mentor={mentor} userid={userid} Hackathon={Hackathon} Channels={Channels} Team={Team} messageref={messageref} dummy={dummy} chatInd={chatInd} db={db}/>

<SendBox  userid={userid}  text={text} settext={settext} messageref={messageref} firebase={firebase} dummy={dummy} />
    </div>
    

  );

}

export default ChatFeed;