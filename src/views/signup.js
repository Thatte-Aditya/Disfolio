import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import './sign-in.css'
import { app, database, storage } from '../components/firebaseConfig'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc,setDoc, onSnapshot, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion"

const SignIn = (props) => {
  const navigate = useNavigate();
  const partRef = collection(database, 'participants')
  const orgRef = collection(database, 'organizers')
  const auth = getAuth();
  const [org, setorg] = useState(false);
  const [data, setdata] = useState({});
  const [uploaded, setuploaded] = useState(false)
  
  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setdata({ ...data, ...newInput });
  }

  const onChangefile = (e) => {
    let newInput = { [e.target.name]: e.target.files[0] };
    setdata({ ...data, ...newInput })
    setuploaded(true);
  }

  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // // Signed in 
        const user = userCredential.user;
        // ...
        console.log(user);

        const storageRef = ref(storage, data.email);
        updateProfile(user,{
          displayName: data.name
        })

        const uploadTask = uploadBytesResumable(storageRef, data.resume)
        uploadTask.on('state_changed',
          (snapshot) => {
          },
          (error) => {
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              console.log('File available at', downloadURL);
              await setDoc(doc(database, "participants", user.uid), {
                uid:user.uid,
                name: data.name,
                email: data.email,
                resumeURL: downloadURL,
                github: data.github,
                College: data.colname,
                team:null
              })
            });
          });
          navigate('/user')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
      });
  }

  const handleSubmitorg = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // // Signed in 
        const user = userCredential.user;
        // ...
        console.log(user);
        
        var mentor=document.getElementById("mentor").checked
        if(mentor){
          setDoc(doc(database, "mentors", user.uid), {
            uid:user.uid,
            Name: data.orgname,
            email: data.email,
            College: data.colname
          })
          navigate("/mentor")
        }
        else{
        setDoc(doc(database, "organizers", user.uid), {
          uid:user.uid,
          Name: data.orgname,
          email: data.email,
          College: data.colname
        })
        navigate('/org')}
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
      });

  }


  return (
    <div className="sign-in-container">
      <Helmet>
        <title>SignIn - DisFolio</title>
        <meta property="og:title" content="SignIn - DisFolio" />
      </Helmet>
      <section className="sign-in-hero">
        <div className="sign-in-background">
          <img
            src="/playground_assets/line-background.svg"
            className="sign-in-image"
            alt=''
          />
          <img
            alt=""
            src="/playground_assets/circle-background.svg"
            className="sign-in-image1"
          />
        </div>
        <header data-thq="thq-navbar" className="sign-in-navbar">
          <img
            alt=""
            src="/playground_assets/logodispolio-removebg-preview-200w.png"
            className="sign-in-image2"
            onClick={()=>{navigate("/")}}
          />
          <span className="sign-in-text">DisFolio</span>
          <button className="sign-in-register button" onClick={()=>{navigate("/login")}}>
            <span>
              <span>Log In</span>
              <br></br>
            </span>
            <svg viewBox="0 0 1024 1024" className="sign-in-icon">
              <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
            </svg>
          </button>
        </header>
        <div className="sign-in-hero-content">
          <div className="sign-in-container01">
            <div className="sign-in-caption"></div>
            <div className="sign-in-container02">
              <div className="sign-in-container03">
                <motion.div className="sign-in-container04" initial={{ opacity: 0,y:100 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.5 }} animate={{ y: 0 }} viewport={{ once: true }}>
                  <p className="sign-in-caption1">Welcome to DisFolio</p>
                </motion.div>
                <motion.span className="sign-in-text04" initial={{ opacity: 0,y:100 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.7 }} animate={{ y: 0 }} viewport={{ once: true }}>
                  <span>All in one Hackathon Platform</span>
                  <br></br>
                </motion.span>
              </div>
              <motion.div className="sign-in-container05"initial={{ opacity: 0,y:100 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.9 }} animate={{ y: 0 }} viewport={{ once: true }}>
                <div className="sign-in-container06">
                  <div className="sign-in-container07">
                    <button className="sign-in-register1 button" onClick={() => { setorg(false) }
                    }>
                      <span>Participant</span>
                    </button>
                    <button className="sign-in-register2 button" onClick={() => { setorg(true) }}>
                      <span>Organizer</span>
                    </button>
                  </div>
                </div>
                {!org && <>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="sign-in-textinput input"
                    onChange={(event) => handleInput(event)}
                    name="name"
                  />
                  <input
                    type="text"
                    placeholder="Enter College Name"
                    className="sign-in-textinput1 input"
                    onChange={(event) => handleInput(event)}
                    name="colname"
                  />
                  <input
                    type="text"
                    placeholder="Enter Email ID"
                    className="sign-in-textinput2 input"
                    onChange={(event) => handleInput(event)}
                    name="email"
                  />
                  <input
                    type="text"
                    placeholder="Enter Password"
                    className="sign-in-textinput3 input"
                    onChange={(event) => handleInput(event)}
                    name="password"
                  />
                  <input
                    type="text"
                    placeholder="Re-enter Password"
                    className="sign-in-textinput4 input"
                  />
                  <input
                    type="text"
                    placeholder="Enter GitHub Account Link"
                    className="sign-in-textinput5 input"
                    onChange={(event) => handleInput(event)}
                    name="github"
                  />
                  {!uploaded && <>
                    <span style={{ "color": "white" }}> Upload Resume </span>
                    <input
                      type="file"
                      placeholder="Upload Resume"
                      className="sign-in-textinput5 input"
                      onChange={(event) => onChangefile(event)}
                      name="resume"
                    />
                  </>}
                  {uploaded && <>
                    <div style={{ "color": "white" }}>Resume successfully uploaded</div>
                  </>}
                  <button className="sign-in-register3 button" onClick={handleSubmit}>
                    <span>Sign In</span>
                    <svg viewBox="0 0 1024 1024" className="sign-in-icon2">
                      <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
                    </svg>
                  </button>
                </>}


                {org && <>
                  
                  <input
                    type="text"
                    placeholder="Enter Organizer name"
                    className="sign-in-textinput input"
                    onChange={(event) => handleInput(event)}
                    name="orgname"
                  />
                  <input
                    type="text"
                    placeholder="Enter College Name"
                    className="sign-in-textinput1 input"
                    onChange={(event) => handleInput(event)}
                    name="colname"
                  />
                  <input
                    type="text"
                    placeholder="Enter Email ID"
                    className="sign-in-textinput2 input"
                    onChange={(event) => handleInput(event)}
                    name="email"
                  />
                  <input
                    type="text"
                    placeholder="Enter Password"
                    className="sign-in-textinput3 input"
                    onChange={(event) => handleInput(event)}
                    name="password"
                  />
                  <input
                    type="text"
                    placeholder="Re-enter Password"
                    className="sign-in-textinput4 input"
                    onChange={(event) => handleInput(event)}
                  />
                  <div>
                  <label className='mx-3' htmlFor="mentor" style={{"color":"white"}}>Are you a Mentor?</label>
                  <input type="checkbox" name="mentor" id="mentor" />
                  </div>
                  <button className="sign-in-register3 button" onClick={handleSubmitorg}>
                    <span>Sign In</span>
                    <svg viewBox="0 0 1024 1024" className="sign-in-icon2">
                      <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
                    </svg>
                  </button>
                </>}


              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignIn
