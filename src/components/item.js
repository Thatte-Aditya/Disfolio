import React from 'react'

import PropTypes from 'prop-types'

import './item.css'
import { useNavigate } from 'react-router-dom'

const Item = (props) => {
  const {handleApply,id,apply,setHackid,setmentor}=props;
  const navigate=useNavigate();
  

  function pushToChat(){
    console.log(id,'hackid');
    // console.log(id);
    setHackid(id);
    setmentor(0);

    navigate('/chat')
  }

  return (
    <div className="item-item" style={{border:"5px solid #00000070",borderRadius:"10px",padding:"10px 10px",maxWidth:"300px",minWidth:"300px"}}>
      <img alt={props.image_alt} src={props.image_src} className="item-image" />
      <div className="item-details">
        <h3 className="item-title">{props.note.name}</h3>
        <p className="item-description">{props.note.desc}</p>
        <span className="item-text">
          <span>Date: {props.note.date}</span>
          <br></br>
        </span>
        <span className="item-text03">
          <span>Organizing Committee : {props.note.oname}({props.note.ocol})</span>
          <br></br>
        </span>
        <span className="item-text06">
          <span>Domains: {props.note.dom}</span>
          <br></br>
        </span>
        <button className="item-text09" onClick={()=>{apply?pushToChat():handleApply(id)}}>
          <span>APPLY NOW ➡️</span>
          <br></br>
        </button>
      </div>
    </div>
  )
}

Item.defaultProps = {
  image_src: '/playground_assets/hackicon.svg',
  image_alt: 'image',
  Title: 'HACKATHON 1',
  Description: 'Description',
}

Item.propTypes = {
  image_src: PropTypes.string,
  image_alt: PropTypes.string,
  Title: PropTypes.string,
  Description: PropTypes.string,
}

export default Item
