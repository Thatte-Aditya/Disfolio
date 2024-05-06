import React from 'react'

import PropTypes from 'prop-types'

import './teammembers.css'

const Teammembers = (props) => {
  return (
    <div className={`teammembers-item ${props.rootClassName} `}>
      <div className="teammembers-details">
        <h3 className="teammembers-title">{props.note.name}</h3>
        <p className="teammembers-description">{props.note.github}</p>
        <span className="teammembers-text">
          <span className="">{props.note.College}</span>
          <br className=""></br>
        </span>
        <span className="teammembers-text3">
          <span className="">{props.note.email}</span>
          <br className=""></br>
        </span>
        <span className="teammembers-text6">
          <a href={props.note.resumeURL} target="_blank"><span className="">View Resume ➡️</span>
          <br className=""></br>
          </a>
        </span>
      </div>
    </div>
  )
}

Teammembers.defaultProps = {
  Title: 'Member 1',
  Description: 'Description',
  rootClassName: '',
}

Teammembers.propTypes = {
  Title: PropTypes.string,
  Description: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default Teammembers
