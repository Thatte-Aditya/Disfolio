import React, { useState, useEffect } from 'react'

import { Helmet } from 'react-helmet'

import Organizeritem from '../components/organizeritem'
import Teammembers from '../components/teammembers'
import Mentor from '../components/mentors'
import './organizer.css'
import { app, database, storage } from '../components/firebaseConfig'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, setDoc, onSnapshot, query, where,arrayUnion, arrayRemove } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { async } from '@firebase/util'
import { motion } from "framer-motion"

const Organizer = (props) => {
  const mentorRef = collection(database, 'mentors')
  const [index, setindex] = useState(0)
  const partRef = collection(database, 'participants')
  const [curteam, setcurteam] = useState({})
  const navigate = useNavigate();
  const [cur, setcur] = useState({});
  const auth = getAuth();
  const user = auth.currentUser;
  const hackRef = collection(database, 'hacks')
  const [data, setdata] = useState({});
  const [data2, setdata2] = useState({});
  const [thons, setthons] = useState([])
  const [mentors, setmentors] = useState([])
  const [hacksearch, sethacksearch] = useState({ name: "" })
  const [members, setmembers] = useState([])
  const [teamid, setteamid] = useState()

  const getallmentors=()=>{
    onSnapshot(mentorRef, (mentorlist) => {
      setmentors(mentorlist.docs);
    })
  }

  const handleLogout = () => {
    signOut(auth);
    navigate("/")
  }

  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setdata({ ...data, ...newInput });
  }
  const handleInput2 = (event) => {
    let newInput = { [event.target.name]: event.target.value };

    setdata2({ ...data, ...newInput });
  }

  const handleCreatehack = async () => {
    await getTeam();
    const docRef = await addDoc(hackRef, {
      oname: cur.Name,
      ocol: cur.College,
      oid: user.uid,
      name: data.name,
      desc: data.desc,
      date: data.date,
      dur: data.dur,
      dom: data.dom
    })
  }

  useEffect(() => {
    // console.log("hey")
    // console.log("Document data:", docSnap.data());

    // if(docSnap.team!=""){
    //   setteam(true)
    // }
    getTeam()
    getHacks()
    getallmentors();

  }, [])

  const getHacks = () => {
    onSnapshot(hackRef, (hacklist) => {
      // console.log(foodlist.docs.map((item) => {
      //   return { ...item.data()};
      // }));
      setthons(hacklist.docs);
    })
  }

  const getTeam = async () => {
    const curuserRef = doc(database, 'organizers', user.uid);
    const docSnap = await getDoc(curuserRef)
    try {
      setcur(docSnap.data())
    } catch (error) {

    }
  }

  const handleTeamsearch = async () => {
    const hack1Ref = doc(database, "hacks", data2.hacksearch);
    const docSnap = await getDoc(hack1Ref);
    try {
      await sethacksearch(docSnap.data())
      getunapprovedTeams();

    }
    catch (error) {
    }
  }
  const getunapprovedTeams = async () => {
    console.log(hacksearch.teams[index]);
    setteamid(hacksearch.teams[index])
    const team1Ref = doc(database, "teams", hacksearch.teams[index]);
    const docSnap = await getDoc(team1Ref);
    

    try {
      setcurteam(docSnap.data())
      getteammembers();

    }
    catch (error) {
    }
  }
  const getteammembers = async() => {
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());1
    // });
    onSnapshot(partRef, (partlist) => {
      setmembers(partlist.docs);
    })
  }

  const handleApproved=async()=>{
    const docRef = doc(database,"hacks",data2.hacksearch);
    updateDoc(docRef, {
      approvedteams: arrayUnion(teamid)
    })

    // const hackref = doc(database,"Hackathon",data2.hacksearch);
      setDoc(doc(database, "Hackathon", data2.hacksearch), {
      
    })

    setDoc(doc(database, `/Hackathon/${data2.hacksearch}/Teams`, teamid), {
      
    })
    const chanref = collection(database, `/Hackathon/${data2.hacksearch}/Teams/${teamid}/Channels`)
    addDoc(chanref, {
    
    })
     addDoc(chanref, {
    
    })
   addDoc(chanref, {
    
    })
   
    


    setindex(index+1)
    var link = document.getElementById('getteamdetails');
    link.click();
  }
  const handleDismissed=()=>{
    const docRef = doc(database,"hacks",data2.hacksearch);
    updateDoc(docRef, {
      teams: arrayRemove(teamid)
    }).then(()=>{
      alert("declined")
    })
    setindex(index+1)
    var link = document.getElementById('getteamdetails');
    link.click();
  }

  const handleAssigned=(id)=>{
    const menRef = doc(database,"mentors",id);
    updateDoc(menRef, {
      assignedto: arrayUnion({
        hackathonid:data2.hacksearch,
        teamid:teamid
      })
    })
    const team2Ref = doc(database,"teams",teamid);
    updateDoc(team2Ref, {
      mentorass: arrayUnion({
        hackathonid:data2.hacksearch,
        mentorid:id
      })
    })
  }


  return (
    <div className="organizer-container">
      <Helmet>
        <title>organizer</title>
        <meta property="og:title" content="organizer" />
      </Helmet>
      <section className="organizer-hero">
        <div className="organizer-background">
          <img
            alt="image"
            src="/playground_assets/circle-background.svg"
            className="organizer-image"
          />
          <img
            alt="image"
            src="/playground_assets/line-background.svg"
            className="organizer-image1"
          />
        </div>
        <header data-thq="thq-navbar" className="organizer-navbar">
          <img
            alt="image"
            src="/playground_assets/logodispolio-removebg-preview-200w.png"
            className="organizer-image2"
          />
          <h2 className="organizer-text">DisFolio</h2>
          <div
            data-thq="thq-navbar-nav"
            data-role="Nav"
            className="organizer-desktop-menu"
          >
            <nav
              data-thq="thq-navbar-nav-links"
              data-role="Nav"
              className="organizer-nav"
            >
              <span className="navLink">Announcements</span>
              <span className="navLink">Team</span>
            </nav>
            <button className="button" onClick={handleLogout}>
              <span>Log Out</span>
              <svg viewBox="0 0 1024 1024" className="organizer-icon">
                <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
              </svg>
            </button>
          </div>
        </header>
        <div className="organizer-hero-content">
          <div className="organizer-caption">
            <p className="organizer-caption1 typing-demo">Welcome Admin !</p>
          </div>
        </div>
      </section>
      <section className="organizer-add-hackathons">
        <motion.div className="organizer-header" initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }} animate={{ x: 100 }}
  transition={{ delay: 0.3 }} viewport={{ once: true }}>
          <div data-aos="fade-right" className="organizer-heading">
            <h2 className="organizer-title">Hackathons</h2>
          </div>
        </motion.div>
        <motion.div className="organizer-add"initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }} animate={{ x: 100 }}
  transition={{ delay: 0.3 }} viewport={{ once: true }}>
          <span className="organizer-text02">Add Hackathons</span>
          <div className="organizer-row">
            <div className="organizer-container1">
              <span className="organizer-text03">Hackathon Name :</span>
              <span className="organizer-text04"> Description :</span>
              <span className="organizer-text05"> Date :</span>
              <span className="organizer-text06"> Duration:</span>
              <span className="organizer-text07"> Domains:</span>
            </div>
            <div className="organizer-container2">
              <input type="text" className="organizer-textinput input" onChange={(event) => handleInput(event)}
                name="name" />
              <input type="text" className="organizer-textinput input" onChange={(event) => handleInput(event)}
                name="desc" />
              <input type="text" className="organizer-textinput input" onChange={(event) => handleInput(event)}
                name="date" />
              <input type="text" className="organizer-textinput input" onChange={(event) => handleInput(event)}
                name="dur" />
              <input type="text" className="organizer-textinput input" onChange={(event) => handleInput(event)}
                name="dom" />
              <button className="organizer-button button" onClick={handleCreatehack}>
                <span>Create Hackathon </span>
                <svg viewBox="0 0 1024 1024" className="organizer-icon2">
                  <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="organizer-display-hackathons" >
        <motion.div className="organizer-upcoming-hackathons" initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }} animate={{ x: 100 }}
  transition={{ delay: 0.3 }} viewport={{ once: true }}>
          <span className="organizer-text08">Hackathons Organized: </span>
          <div className="organizer-row1">
            {
              thons.map((note) => {
                let noted = note.data();
                if (noted.oid == user.uid) {
                  return <Organizeritem note={noted} id={note.id}/>;
                }
              })}
            {/* <Organizeritem></Organizeritem>
            <Organizeritem></Organizeritem>
            <Organizeritem></Organizeritem> */}
          </div>
        </motion.div>
      </section>
      <section className="organizer-add-hackathons1">
        <div className="organizer-header1">
          <motion.div data-aos="fade-right" className="organizer-heading1" initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }} animate={{ x: 100 }}
  transition={{ delay: 0.3 }} viewport={{ once: true }}>
            <h2 className="organizer-title1">Team Request</h2>
          </motion.div>
        </div>
        <div>
        <input type="text" className="my-2 organizer-textinput input" onChange={(event) => handleInput2(event)}
          name="hacksearch" />
        <motion.button className="organizer-button button" id='getteamdetails' onClick={handleTeamsearch} initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }} animate={{ x: 100 }}
  transition={{ delay: 0.3 }} viewport={{ once: true }}>
          <span>Get Team Details </span>
          <svg viewBox="0 0 1024 1024" className="organizer-icon2">
            <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
          </svg>
        </motion.button>
        </div>
        <div className="organizer-container3">
          <div className="organizer-add1">
            <motion.div className="organizer-container4" initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }} animate={{ x: 100 }}
  transition={{ delay: 0.3 }} viewport={{ once: true }}>
              <div className="organizer-container5">
                <span className="organizer-text10">Team Name :</span>
                <span className="organizer-text11">{curteam.teamname}</span>
              </div>
              <div className="organizer-container6">
                <span className="organizer-text12">Hackathon Name :</span>
                <span className="organizer-text13">{hacksearch?.name?hacksearch?.name:""}</span>
              </div>
            </motion.div>
            <motion.span className="organizer-text14" initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }} animate={{ x: 100 }}
  transition={{ delay: 0.3 }} viewport={{ once: true }}>Team Members :- </motion.span>
            <motion.div className="organizer-row2" initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }} animate={{ x: 100 }}
  transition={{ delay: 0.3 }} viewport={{ once: true }}>
            {
            members.map((note) => {
                let noted=note.data();
                if(noted.team===teamid)
                {return <Teammembers note={noted} rootClassName="teammembers-root-class-name" />}
              })}
             
              {/* <Teammembers rootClassName="teammembers-root-class-name3"></Teammembers>
              <Teammembers rootClassName="teammembers-root-class-name2"></Teammembers>
              <Teammembers rootClassName="teammembers-root-class-name1"></Teammembers> */}
            </motion.div>
            <div className="organizer-container7">
              <button className="approve-button button" onClick={handleApproved}>
                <span>Approve ✅</span>
                <svg viewBox="0 0 1024 1024" className="organizer-icon2">
                  <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
                </svg>
              </button>
              <button className="approve-button button" onClick={handleDismissed}>
                <span>Decline ❌</span>
                <svg viewBox="0 0 1024 1024" className="organizer-icon2">
                  <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="organizer-add-hackathons1">
      <motion.div className="organizer-header1" initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }} animate={{ x: 100 }}
  transition={{ delay: 0.3 }} viewport={{ once: true }}>
          <div data-aos="fade-right" className="organizer-heading1">
            <h2 className="organizer-title1">Mentors</h2>
          </div>
        </motion.div>
        <motion.div className='d-flex justify-content-around' initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }} animate={{ x: 100 }}
  transition={{ delay: 0.3 }} viewport={{ once: true }}>
        {
            mentors.map((note) => {
                let id=note.id;
                let noted=note.data();
                return <Mentor note={noted} key={noted.id} id={id} handleAssigned={handleAssigned}/>;
              })}
        </motion.div>
      </section>
    </div>
  )
}


export default Organizer
