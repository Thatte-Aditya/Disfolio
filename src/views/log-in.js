import React, { useState } from 'react'

import { Helmet } from 'react-helmet'
import { useNavigate } from "react-router-dom"; 
import './log-in2.css'
import { app, database, storage } from '../components/firebaseConfig'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion"

const LogIn = (props) => {
  const navigate = useNavigate();
  const [data, setdata] = useState({});
  const auth = getAuth();

  const handleLoginO = async() => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential);
        var mentor=document.getElementById("mentor1").checked
        console.log(mentor);
        if(mentor){
          navigate("/mentor")
        }
        else
        navigate('/org')
       
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  const handleLoginU = async() => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/user")
       
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setdata({ ...data, ...newInput });
  }

  return (
    <div className="log-in-container">
      <Helmet>
        <title>LogIn - DisFolio</title>
        <meta property="og:title" content="LogIn - DisFolio" />
      </Helmet>
      <section className="log-in-hero">
        <div className="log-in-background">
          <img
            src="/playground_assets/line-background.svg"
            alt=''
            className="log-in-image"
          />
          <img
            alt=""
            src="/playground_assets/circle-background.svg"
            className="log-in-image1"
          />
        </div>
        <header data-thq="thq-navbar" className="log-in-navbar"  >
          <img
            alt=""
            src="/playground_assets/logodispolio-removebg-preview-200w.png"
            className="log-in-image2"
            onClick={()=>{navigate("/")}}
          />
          <span className="log-in-text">DisFolio</span>
          <button className="log-in-register button" onClick={()=>{navigate("/signup")}}>
            <span>Sign Up</span>
            <svg viewBox="0 0 1024 1024" className="log-in-icon">
              <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
            </svg>
          </button>
        </header>
        <div className="log-in-hero-content">
          <div className="log-in-container1">
            <div className="log-in-container2">
              <div className="log-in-container3">
                <motion.div className="log-in-container4" initial={{ opacity: 0,y:100 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.5 }} animate={{ y: 0 }} viewport={{ once: true }}>
                  <p className="log-in-caption1">Welcome to DisFolio</p>
                </motion.div>
                <motion.span className="log-in-text2" initial={{ opacity: 0,y:100 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.7 }} animate={{ y: 0 }} viewport={{ once: true }}>
                  <span>All in one Hackathon Platform</span>
                  <br></br>
                </motion.span>
              </div>
              <motion.div className="log-in-container5" initial={{ opacity: 0,y:100 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.9 }} animate={{ y: 0}} viewport={{ once: true }}>
                <input
                  type="text"
                  placeholder="Enter Email ID"
                  className="log-in-textinput input"
                  onChange={(event) => handleInput(event)}
                  name="email"
                />
                <input
                  type="text"
                  placeholder="Enter Password"
                  className="log-in-textinput1 input"
                  onChange={(event) => handleInput(event)}
                  name="password"
                />
                <div >
                  <label className='mx-3' htmlFor="mentor1" style={{"color":"white"}}>Are you a Mentor?</label>
                  <input type="checkbox" name="mentor" id="mentor1" />
                  </div>
              </motion.div>
              <motion.div className="log-in-container6 my-3"initial={{ opacity: 0,y:100 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 1.1 }} animate={{ y: 0 }} viewport={{ once: true }}>
                <div className="log-in-container7">
                  <button className="log-in-register1 button" onClick={handleLoginU}>
                    <span>Log In user</span>
                    <svg viewBox="0 0 1024 1024" className="log-in-icon2">
                      <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
                    </svg>
                  </button>
                  <button className="log-in-register1 button" onClick={handleLoginO}>
                    <span>Log In organizer</span>
                    <svg viewBox="0 0 1024 1024" className="log-in-icon2">
                      <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
                    </svg>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LogIn
