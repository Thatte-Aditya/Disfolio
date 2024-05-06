import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from "react-router-dom";
import Teammembers from '../components/teammembers2'
import './mentor.css'
import { app, database, storage } from '../components/firebaseConfig'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, setDoc, onSnapshot, query, where,arrayUnion, arrayRemove } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion"

const Mentor = (props) => {
  const [tname, settname] = useState([])
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [teams, setteams] = useState([])
  const teamRef = collection(database, 'teams')
  const [curmentor, setcurmentor] = useState([])
  const [teamnames,setteamnames] = useState([])
  const [hacknames,sethacknames] = useState([])
  const [num,setnum]=useState(0);

  console.log(num);
  // console.log(tname);
  
  // console.log(user?.uid,'hemlooo');
  const handleLogout = () => {
    props.setmentor(1)
    signOut(auth);
    navigate("/")
  }
  useEffect(()=>{
   
    getmentor();
  },[num],[],[teamnames])


  

  const [mdata,setmdata]=useState({});
  console.log(curmentor);
  
  async function getmentor(){
    const docRef = doc(database, "mentors", user.uid);
    getDoc(docRef).then((docsnap)=>{
      props.setUser(docsnap?.data()?.Name)

      setcurmentor(docsnap.data().assignedto);
      let data=docsnap.data()?.assignedto;
      
     
      var teamn=[];
      var hackn=[];
      
      data.map(async (val)=>{
        // setnum(num+1);
        var hid=val.hackathonid
        var tid=val.teamid;
        // console.log(hid,tid);
        const hackref = doc(database, "hacks", hid);
        const hdocSnap = await getDoc(hackref)
        let h= hdocSnap?.data();
        hackn.push(h.name);
        // console.log(hackn);

         const team3Ref = doc(database, "teams", tid);
    const docSnap = await getDoc(team3Ref)
    let d= docSnap?.data();
    teamn.push(d.teamname);
    // console.log(teamn);

   

    

      
        

      })
      if(teamnames.length<=teamn.length)
        setteamnames(teamn)
        if(hacknames.length<=hackn.length)
          sethacknames(hackn);

      

    })
    // setmdata(docSnap.data());
    
  }
  console.log(teamnames,'team');
  console.log(hacknames,'hack');
  
  

  

  
      


 
  

 



  return (
    
    <div className="mentor-container">
      <Helmet>
        <title>mentor</title>
        <meta property="og:title" content="organizer" />
      </Helmet>
      <section className="mentor-hero">
        <div className="mentor-background">
          <img
            alt="image"
            src="/playground_assets/circle-background.svg"
            className="mentor-image"
          />
          <img
            alt="image"
            src="/playground_assets/line-background.svg"
            className="mentor-image1"
          />
        </div>
        <header data-thq="thq-navbar" className="mentor-navbar">
          <img
            alt="image"
            src="/playground_assets/logodispolio-removebg-preview-200w.png"
            className="mentor-image2"
          />
          <h2 className="mentor-text">DisFolio</h2>
          <div
            data-thq="thq-navbar-nav"
            data-role="Nav"
            className="mentor-desktop-menu"
          >
            <nav
              data-thq="thq-navbar-nav-links"
              data-role="Nav"
              className="mentor-nav"
            >
              <span className="navLink">Announcements</span>
            </nav>
            <button className="button" onClick={handleLogout}>
              <span>Log Out</span>
              <svg viewBox="0 0 1024 1024" className="mentor-icon">
                <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
              </svg>
            </button>
          </div>
        </header>
        <div className="mentor-hero-content">
          <div className="mentor-caption">
            <p className="mentor-caption1 typing-demo">Welcome Mentor !</p>
          </div>
        </div>
      </section>
      <section className="mentor-team">
        <div className="mentor-header">
          <div data-aos="fade-right" className="mentor-heading">
            <motion.h2 className="mentor-title" initial={{ opacity: 0,y:100 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.3 }} animate={{ y: 0 }} viewport={{ once: true }}>Teams</motion.h2>
            <motion.button className='log-in-register1 button' onClick={()=>{setnum(num+1)}}  type="button" initial={{ opacity: 0,y:100 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.3 }} animate={{ y: 0 }} viewport={{ once: true }}><span>Load Team Details</span><svg viewBox="0 0 1024 1024" className="log-in-icon2">
                      <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
                    </svg></motion.button>
          </div>
        </div>
        <div className="mentor-container1">
          <div className="mentor-add">
          
            <div className="mentor-row" >
            

              
  {
    teamnames?.map((note,index)=>{
      return <Teammembers rootClassName="teammembers-root-class-name" val={note} hackname={hacknames[index]} hackid={curmentor[index]?.hackathonid}  teamid={curmentor[index]?.teamid} setHackid={props.setHackid } setTeamId={props.setTeamId} setmentor={props.setmentor}/>;
    })
  }
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Mentor
