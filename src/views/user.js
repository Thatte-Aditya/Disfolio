import React, { useState,useEffect } from 'react'

import { Helmet } from 'react-helmet'
import { useNavigate } from "react-router-dom";
import './user.css'
import { app, database, storage } from '../components/firebaseConfig'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";

import { collection, addDoc, getDocs,getDoc, doc, updateDoc, deleteDoc, onSnapshot, query, where,arrayUnion } from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL, getStream } from "firebase/storage";
import { async } from '@firebase/util';
import Item from '../components/item';
import {motion} from 'framer-motion'

const User =(props) => {
  const hackRef = collection(database, 'hacks')
  const [thons, setthons] = useState([])
  const [appthons, setappthons] = useState([])
  const [team, setteam] = useState(false)
  const teamRef = collection(database, 'teams')
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const [data, setdata] = useState({});
  const [cur, setcur] = useState({});
  const [upcom, setupcom] = useState(true)
  const [appl, setappl] = useState(false)
  const [appr, setappr] = useState(false)
  props.setUser(user.displayName);
  // console.log(user.displayName)
  useEffect(() => {
    // console.log("hey")
    // console.log("Document data:", docSnap.data());
    
    // if(docSnap.team!=""){
    //   setteam(true)
    // }

    
    getTeam();
    getHacks();
    getappHacks();
  }, [])
  useEffect(()=>{
    props.setTeamId(cur?.team);
    console.log(cur?.team,'water')
  },[cur])

  const getHacks = () => {
    onSnapshot(hackRef, (hacklist) => {
      setthons(hacklist.docs);
    })
  }
  const getappHacks = () => {
    onSnapshot(hackRef, (hacklist) => {
      setappthons(hacklist.docs);
    })
  }
  
  const getTeam=async()=>{
    const curuserRef = doc(database, 'participants', user.uid);
    const docSnap = await getDoc(curuserRef);
    setcur(docSnap.data())
  try {
    console.log(docSnap.data());
    setcur(docSnap.data())
    if(docSnap.data().team===null){
      setteam(false)
    }
    else{
      setteam(true)
    }
  } catch (error) {
    
  }
  }

  const handleLogout = () => {
    signOut(auth);
    navigate("/")
  }

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setdata({ ...data, ...newInput });
  }

  const createTeam = async () => {
    const docRef = await addDoc(teamRef, {
      teamname: data.tname,
      members: [user.uid]
    })
      setteam(true)
      console.log(docRef.id);
      const usertoupdate = doc(database,'participants',user.uid);
      updateDoc(usertoupdate, {
      team: docRef.id
    })
    getTeam()

  }
  const joinTeam = async() => {
    const docRef = doc(database,"teams",data.tid);
    console.log(data.tid);
    // const docSnap = await getDoc(docRef);
    updateDoc(docRef, {
      members: arrayUnion(user.uid)
    }).then(async ()=>{
      const usertoupdate = doc(database, 'participants', user.uid);
      setcur(usertoupdate)
      await updateDoc(usertoupdate, {
        team: data.tid
      })
      getTeam();
      alert("joined team successfully")
      setteam(true)
    })
    .catch((err) => {
      console.log(err.message);
    })
  }

  const handleApply=async(id)=>{
  
    const docRef = doc(database,"hacks",id);
    updateDoc(docRef, {
      teams: arrayUnion(cur.team)
    })
    .then(async ()=>{
      const teamtoupdate = doc(database, 'teams', cur.team);
      await updateDoc(teamtoupdate, {
        appliedfor: arrayUnion(id)
      })
    })
    .catch((err) => {
      console.log(err.message);
    })
  }
  // const handleApply=async(id)=>{
   
  //     const teamtoupdate = doc(database, 'teams', cur.team);
  //     await updateDoc(teamtoupdate, {
  //       appliedfor: arrayUnion(id)
  //     })
  // }
  const handleUpcoming=()=>{
    setupcom(true)
    setappl(false)
    setappr(false)
  }

  const handleApproved=()=>{
    setupcom(false)
    setappl(false)
    setappr(true)
  }

  const handleApplied=()=>{
    setupcom(false)
    setappl(true)
    setappr(false)
  }




  return (
    <div className="user-container">
      <Helmet>
        <title>user</title>
        <meta property="og:title" content="user" />
      </Helmet>
      <section className="user-hero">
        <div className="user-background">
          <img
            alt=""
            src="/playground_assets/circle-background.svg"
            className="user-image"
          />
          <img
            alt=""
            src="/playground_assets/line-background.svg"
            className="user-image1"
          />
        </div>
        <header data-thq="thq-navbar" className="user-navbar">
          <img
            alt=""
            src="/playground_assets/logodispolio-removebg-preview-200w.png"
            className="user-image2"
          />
          <h2 className="user-text">DisFolio</h2>
          <div
            data-thq="thq-navbar-nav"
            data-role="Nav"
            className="user-desktop-menu"
          >
            <nav
              data-thq="thq-navbar-nav-links"
              data-role="Nav"
              className="user-nav"
            >
              <span className="navLink">Announcements</span>
              <span className="navLink">Team</span>
            </nav>
            <button className="button" onClick={handleLogout}>
              <span>Log Out</span>
              <svg viewBox="0 0 1024 1024" className="user-icon">
                <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
              </svg>
            </button>
          </div>
        </header>
        <div className="user-hero-content">
          <div className="user-caption">
            <p className="user-caption1 typing-demo">Welcome {user.displayName} !</p>
          </div>
          {!team && <>
          <div className="user-container1">
            <div className="user-container2">
              <span className="user-text02">Create Team</span>
              <input
                type="text"
                placeholder="Enter team name"
                className="user-textinput input"
                name='tname'
                onChange={(event) => handleInput(event)}
              />
            </div>
            <div className="user-container3">
              <span className="user-text03">Join Team</span>
              <input
                type="text"
                placeholder="Enter team code"
                className="user-textinput1 input"
                name='tid'
                onChange={(event) => handleInput(event)}
              />
            </div>
          </div>
          <div className="user-container4 " >
            <button className="button mx-5" onClick={createTeam}>
              <span>Create team</span>
              <svg viewBox="0 0 1024 1024" className="user-icon2">
                <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
              </svg>
            </button>
            <button className="button mx-5" onClick={joinTeam}>
              <span>Join team</span>
              <svg viewBox="0 0 1024 1024" className="user-icon2">
                <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
              </svg>
            </button>
          </div>
          </>}
          {team && <>
          <div className="user-container1">
            <div className="user-container2">
              <span className="user-text02">Current Team {cur.team?cur.team:""}</span>
              
            </div>
          </div>
          </>}
        </div>
      </section>
      <section className="user-hackathons">
        <div className="user-header">
          <motion.div data-aos="fade-right" className="user-heading" initial={{ opacity: 0,y:100 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.2}} animate={{ y: 0 }} viewport={{ once: true }}>
            <h2 className="user-title">Hackathons</h2>
          </motion.div>
        </div>
        <motion.div className='d-flex' initial={{ opacity: 0,y:100 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.2 }} animate={{ y: 0 }} viewport={{ once: true }}>
        <button className="button mx-3" style={{backgroundColor:"black",color:"white"}} onClick={handleUpcoming}>
              <span>Upcoming!</span>
              <svg viewBox="0 0 1024 1024" className="user-icon">
                <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
              </svg>
        </button>
        <button className="button mx-3" style={{backgroundColor:"black",color:"white"}} onClick={handleApplied}>
              <span>Applied in!</span>
              <svg viewBox="0 0 1024 1024" className="user-icon">
                <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
              </svg>
        </button>
        <button className="button mx-3" style={{backgroundColor:"black",color:"white"}} onClick={handleApproved}>
              <span>Approved for!</span>
              <svg viewBox="0 0 1024 1024" className="user-icon">
                <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
              </svg>
        </button>
        </motion.div>
        {upcom && <div className="user-upcoming-hackathons">
          <motion.span className="user-text05"  initial={{ opacity: 0,y:100 }}whileInView={{ opacity: 1 }}transition={{ delay: 0.2 }} animate={{ y: 0 }} viewport={{ once: true }}>Upcoming Hackathons : </motion.span>
          <motion.div className="user-row" initial={{ opacity: 0,y:100 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.2 }} animate={{ y: 0 }} viewport={{ once: true }}>
          {
            thons.map((note) => {
                let id=note.id;
                let noted=note.data();
                return <Item note={noted} handleApply={handleApply} key={noted.id} id={id}/>;
              })}
            
          </motion.div>
        </div>}
        {appl &&<div className="user-applied-hackathons">
          <motion.span className="user-text42"  initial={{ opacity: 0,y:100 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.2 }} animate={{ y: 0 }} viewport={{ once: true }}>Applied in Hackathons</motion.span>
          <motion.div className="user-row1" initial={{ opacity: 0,y:100 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.2 }} animate={{ y: 0 }} viewport={{ once: true }}>
            
          {
            appthons.map((note) => {
                let id=note.id;
                let noted=note.data();
                if(noted?.teams?.includes(cur ?cur.team:""))
                return <Item note={noted} handleApply={handleApply} key={noted.id} id={id} apply={1}/>;
              })}
            
          </motion.div>
        </div>}
        { appr && <div className="user-applied-hackathons">
          <motion.span className="user-text42"  initial={{ opacity: 0,y:100 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.2 }} animate={{ y: 0 }} viewport={{ once: true }}>Approved in Hackathons</motion.span>
          <motion.div className="user-row1" initial={{ opacity: 0,y:100 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.2 }} animate={{ y: 0 }} viewport={{ once: true }}>
            
          {
            
            appthons.map((note) => {
                let id=note.id;
                let noted=note.data();
               
                if(noted?.approvedteams?.includes(cur ?cur?.team:""))
                return <Item mentor={props.mentor} setmentor={props.setmentor} note={noted} handleApply={handleApply} key={noted.id} id={id} apply={1} setHackid={props.setHackid} />;
              })}
            
          </motion.div>
        </div>}
      </section>
    </div>
  )
}

export default User
