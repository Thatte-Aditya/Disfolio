import React from 'react'
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet'
import { motion } from "framer-motion"
import './home.css'

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <Helmet>
        <title>DisFolio</title>
        <meta property="og:title" content="DisFolio" />
      </Helmet>
      <section className="home-hero">
        <div className="home-background">
          <img
            src="/playground_assets/line-background.svg"
            className="home-image"
            alt=''
          />
          <img
            alt=""
            src="/playground_assets/circle-background.svg"
            className="home-image1"
          />
        </div>
        <header data-thq="thq-navbar" className="home-navbar">
          <img
            alt=""
            src="/playground_assets/logodispolio-removebg-preview-200w.png"
            className="home-image2"
          />
          <span className="home-text">DisFolio</span>
          <div className="home-container01">
            <div className="home-container02">
              <button className="button" onClick={()=>{navigate("/login")}}>
                <span>Log In</span>
                <svg viewBox="0 0 1024 1024" className="home-icon">
                  <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
                </svg>
              </button>
            </div>
            <div className="home-container03">
              <button className="button" onClick={()=>{navigate("/signup")}}>
                <span>Sign Up</span>
                <svg viewBox="0 0 1024 1024" className="home-icon2">
                  <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
                </svg>
              </button>
            </div>
          </div>
        </header>
        <div className="my-5 home-hero-content">
          <div className="home-container04">
            
            <div className="home-container05">
              <div className="home-container06">
                <motion.div className="home-container07"initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.3 }} viewport={{ once: true }}>
                  <p className="home-caption1">Welcome to DisFolio</p>
                </motion.div>
                <motion.span className="home-text3" initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }} 
  transition={{ delay: 0.5 }} viewport={{ once: true }}>
                  <span>All in one Hackathon Platform</span>
                  <br></br>
                </motion.span>
                <motion.div className="my-3 home-container09" initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ delay: 0.7 }} viewport={{ once: true }}>
                  <button className="home-register2 button" onClick={()=>{navigate("/login")}}>
                    <span>Log  In</span>
                    <svg viewBox="0 0 1024 1024" className="home-icon4">
                      <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
                    </svg>
                  </button>
                  <button className="home-register3 button" onClick={()=>{navigate("/signup")}}>
                    <span>Sign Up</span>
                    <svg viewBox="0 0 1024 1024" className="home-icon6">
                      <path d="M512 170l342 342-342 342-60-60 238-240h-520v-84h520l-238-240z"></path>
                    </svg>
                  </button>
                </motion.div>
              </div>
              {/* <div className="home-container08">
                
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
