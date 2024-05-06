import React from 'react'

import PropTypes from 'prop-types'

import './organizeritem.css'

const Organizeritem = (props) => {
  return (
    <div className="organizeritem-item">
      <img
        alt={props.image_alt}
        src={props.image_src}
        className="organizeritem-image"
      />
      <div className="organizeritem-details">
        <h3 className="organizeritem-title">{props.note.name}</h3>
        <p className="organizeritem-description">{props.note.desc}</p>
        <span className="organizeritem-text">
          <span>Date: {props.note.date}</span>
          <br></br>
        </span>
        <span className="organizeritem-text03">
          <span>Duration: {props.note.dur}</span>
          <br></br>
        </span>
        <span className="organizeritem-text06">
          <span>Domains: {props.note.dom}</span>
          <br></br>
        </span>
        <span className="organizeritem-text09">
          <span>Organizer name :{props.note.oname}({props.note.ocol})</span>
          <br></br>
        </span>
        <span className="organizeritem-text09">
          <span>Hackathon ID : {props.id}</span>
          <br></br>
        </span>
      </div>
    </div>
  )
}

Organizeritem.defaultProps = {
  image_src: '/playground_assets/hackicon2.png',
  image_alt: 'image',
  Description: 'Description',
  Title: 'HACKATHON 1',
}

Organizeritem.propTypes = {
  image_src: PropTypes.string,
  image_alt: PropTypes.string,
  Description: PropTypes.string,
  Title: PropTypes.string,
}

export default Organizeritem
