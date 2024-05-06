import logo from './logo.svg';
import './App.css';
import './style.css'
import Home from './views/home'
import SignIn from './views/signup'
import LogIn from './views/log-in'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import User from './views/user';
import Organizer from './views/organizer';
import Chat from './pages/chat-page';
import Mentor from './views/mentor';
import { useState } from 'react';

function App() {
  const [hackid,setHackid]=useState('');
  const [teamid,setTeamId]=useState('');
  const [userid,setUser]=useState('');
  const [mentor,setmentor]=useState(0);
  return (
    <Router>
      <div>
        <Routes>
        <Route element={<Home/>} exact path="/" />
        <Route element={<SignIn/>} exact path="/signup" />
        <Route element={<LogIn/>} exact path="/login" />
        <Route element={<User mentor={mentor} setmentor={setmentor} setUser={setUser} hackid={hackid} setHackid={setHackid} teamid={teamid} setTeamId={setTeamId} />} exact path="/user" />
        <Route element={<Organizer />} exact path="/org" />
        <Route element={<Mentor setUser={setUser} mentor={mentor} setmentor={setmentor} hackid={hackid} setHackid={setHackid} teamid={teamid} setTeamId={setTeamId} />}  path="/mentor" />
        <Route element={<Chat mentor={mentor} setmentor={setmentor} hackid={hackid} setHackid={setHackid} teamid={teamid} setTeamId={setTeamId} userid={userid}  />}  path="/chat" />
        </Routes>
       
      </div>
    </Router>
  )
}


export default App;
