import React from 'react'

import PropTypes from 'prop-types'

import './teammembers.css'

const Teammembers = (props) => {
  const {handleAssigned}=props
  return (
    <div className={`teammembers-item ${props.rootClassName} `}style={{border:"1px solid black",borderRadius:"10px",padding:"10px 10px"}}>
      <p className="teammembers-mentorid">{props.id}</p>
      <p className="teammembers-mentorname">{props.note.Name}</p>
      <button className="teammembers-assign" onClick={()=>{handleAssigned(props.id)}}>{props.assign}</button>
    </div>
  )
}

Teammembers.defaultProps = {
  mentor_id: 'Mentor ID',
  rootClassName: '',
  assign: '➕',
  mentor_name: 'Mentor Name',
}

Teammembers.propTypes = {
  mentor_id: PropTypes.string,
  rootClassName: PropTypes.string,
  assign: PropTypes.string,
  mentor_name: PropTypes.string,
}

export default Teammembers
