import React, { useEffect } from "react";
import "./chatroom.css";

import { useState, useRef } from "react";
import Avatar from "react-avatar";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faUser } from "@fortawesome/free-solid-svg-icons";

//   const element =
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { useCollection } from "react-firebase-hooks/firestore";
// import { doc, onSnapshot } from "firebase/firestore";

import { orderBy, limit } from "firebase/firestore";

function ChatRoom({
  userid,
  db,
  Hackathon,
  Team,
  Channels,
  messageref,
  dummy,
  chatInd,
  mentor
}) {
  const [edit, toggleEdit] = useState(-1);
  const [data, setdata] = useState([]);
  const [dataId, setdataId] = useState([]);
  const [edittext, setEditText] = useState("");
  var user = userid;

  //   console.log(chatInd);



  useEffect(
    () => {
      // console.log(chatInd)

      const q = query(messageref, orderBy("createdAt"));
      onSnapshot(q, (data) => {
        let temp = [];
        let ids = [];
        data.docs.map((item) => {
          temp.push({ ...item.data() });
          ids.push(item.id);
          //   console.log(dataId)
        });
        setdata(temp);
        setdataId(ids);
      });

      //   dummy.current.scrollIntoView({ behavior: 'smooth' });
    },
    [chatInd],[]
    
  );
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <div class="chat-room" style={{ overflowY: "scroll" }}>
      {data.map((item, index) => {
        return ChatMessage({ item, index });
      })}
      <span ref={dummy}></span>
    </div>
  );
  function handleToggleEdit({ index }) {
    if (edit === -1) {
      toggleEdit(index);
    } else if (edit === index) {
      toggleEdit(-1);
    } else {
      toggleEdit(index);
    }
  }

  function ChatMessage({ item, index }) {
    var a = item?.createdAt?.toDate()?.toString()?.substring(16, 24);
    // console.log(a);
    if (user === item?.user) {
      return (
        <div>
           {index - 1 < 0 ||
              !(data[index - 1]?.user === data[index]?.user) ? (
                <div class="d-flex" style={{marginLeft:'20px', marginTop:'10px' }}>
                  <Avatar name={item?.user} size="40" round="20px" />
                  <p  style={{marginLeft:'10px',marginTop:'10px',fontWeight:'bold'}}>{item?.user}</p>
                  {(mentor===1)?  <FontAwesomeIcon
                onClick={() => {
                  handleToggleEdit({ index });
                }}
                style={{marginLeft:'10px',marginTop:'10px',height:"25px",width:'25px'}}
                icon={faUser}
              />:null}
                </div>
              ) : (
                <div style={{ width: "40px" }}></div>
              )}
          <div class="d-flex msg-component">
            <div className="msg-box-send " style={{ marginTop: "20px" }}>
             

              <div>
                <p  class='p-text'style={{ marginLeft: "20px", fontSize: "13px" }}>{a}</p>
                <div class="border-0 chat-bubble-send">
                  <p  class='p-text'>{item.text}</p>
                </div>
              </div>

              {/* <p style={{backgroundColor:'#A555EC' , margin:'20px'}}>{item.text}</p> */}
            </div>
            <div class="edit-buttons" >
              <FontAwesomeIcon
                onClick={() => {
                  handleToggleEdit({ index });
                }}
                icon={faEdit}
              />

              <FontAwesomeIcon
                onClick={() => {
                  deletemsg({ index });
                }}
                icon={faTrash}
              />
            </div>
            {edit === index ? (
            <motion.div initial={{opacity:0 ,x:'-100px'}} animate={{opacity:1,x:'100px'}} exit={{opacity:0 ,x:'-100px'}} class='d-flex' style={{alignItems:'center',marginTop:'30px'}}>
              <input
                type="text"
                style={{
                  borderRadius:'10px',
                  backgroundColor:'transparent',
                  border:'solid',
                  borderColor:'white',

                  color:'white'


                


                }}
                
                onChange={(e) => {
                  setEditText(e.target.value);
                }}
              />
             
              <button
              class='btn'
                style={{ height: "40px",width:'40px' }}
                onClick={() => {
                  if (!(edittext === "")) {
                    editmsg(
                      { index, edittext },
                      toggleEdit(-1),
                      setEditText("")
                    );
                  }
                }}
              ><img src={require('./greentick.png')} alt="" style={{height:'20px',width:'20px'}} /></button>
            </motion.div>
          ) : null}
          </div>
          
        </div>
      );
    } else {
      return (
        <div>
           {index - 1 < 0 || !(data[index - 1]?.user === data[index]?.user) ? (
            <div style={{justifyContent:"right",marginRight:'20px' , marginTop:'30px'}} class="d-flex">
               <p style={{marginRight:'10px',marginTop:'10px',fontWeight:'bold'}}>{item.user}</p>
              <Avatar name={item.user} size="40" round="20px" />
             
            </div>
          ) : (
            <div style={{ width: "40px" }}></div>
          )}
          <div className="message">
         

          <div class="d-flex msg-component">
            <div className="msg-box " style={{ marginTop: "20px" }}>
              <p class='p-text' style={{ marginRight: "20px", fontSize: "13px" }}>{a}</p>
              <div class="border-0 chat-bubble-receive">
                <p class='p-text'>{item.text}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      );
    }
  }

  function deletemsg({ index }) {
    // console.log(dataId[index]);
    const doctoupdate = doc(
      db,
      `/Hackathon/${Hackathon}/Teams/${Team}/Channels/${Channels[chatInd]}/Messages`,
      dataId[index]
    );
    deleteDoc(doctoupdate)
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  function editmsg({ index, edittext }) {
    // console.log(dataId[index]);
    const doctoupdate = doc(
      db,
      `/Hackathon/${Hackathon}/Teams/${Team}/Channels/${Channels[chatInd]}/Messages`,
      dataId[index]
    );
    updateDoc(doctoupdate, {
      text: edittext,
    })
      .then(() => {
        console.log("updated");
      })
      .catch((err) => {
        // console.log(err.message);
      });
  }
}

export default ChatRoom;
