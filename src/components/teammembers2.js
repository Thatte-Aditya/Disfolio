import React from 'react'

import PropTypes, { func } from 'prop-types'
import { useNavigate } from 'react-router'
import './teammembers2.css'

const Teammembers = (props) => {
  const navigate=useNavigate();
  function handleClick(){
    props.setHackid(props.hackid);
    props.setTeamId(props.teamid);
    props.setmentor(1);
    // hackid={hackid} setHackid={setHackid} teamid={teamid} setTeamId={setTeamId}

    navigate('/chat')
  }

  console.log(props.teamname);
  return (
    <div className={`teammembers-item ${props.rootClassName} `}>
      <div className="teammembers-details">
        <h3 className="teammembers-title">{props.val}</h3>
        <p className="teammembers-description">{props.hackname}</p>
      
        <p onClick={()=>{handleClick()}} className="teammembers-description2">{props.Description1}</p>
      </div>
    </div>
  )
}

Teammembers.defaultProps = {
  Description: 'Hackathon Name',
  rootClassName: '',
  Title: 'Team Name',
  Description1: 'Chat ➡️',
  Description2: 'College',
}

Teammembers.propTypes = {
  Description: PropTypes.string,
  rootClassName: PropTypes.string,
  Title: PropTypes.string,
  Description1: PropTypes.string,
  Description2: PropTypes.string,
}

export default Teammembers
