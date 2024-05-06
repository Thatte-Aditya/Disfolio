import React from "react";
import './chat-bar.css'
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
function ChatBar({setChatInd,chatInd,userid,mentor}){
    const navigate=useNavigate();
    return(
        <div class='chat-bar'>

            <div style={{marginTop:'50px',marginLeft:'50px'}} class='profile' onClick={()=>{navigate(-1)}}>
               <h1 style={{color:'white'}}>{userid}</h1> 

            </div>

            <div style={{marginTop:'50%' }} class='channels'>
                {
                    (mentor===1)?
                    <div onClick={()=>setChatInd(0)}>
                    <h3 style={{color:'white' ,marginTop:'10%'}}>Mentor Chat</h3>
                </div>
                    

                    :
                    <div>
                         <motion.div initial={{scale:1.5}} whileTap={{scale:1}} class='chat-sec' onClick={()=>setChatInd(0)}>
                            
                    <h3  style={{color:'white' ,marginTop:'10%',marginLeft:'90px'}}>Announcement</h3>
                </motion.div>
                <motion.div initial={{scale:1.5}} whileTap={{scale:1}}  class='chat-sec' onClick={()=>setChatInd(1)}>
                    <h3 style={{color:'white' ,marginTop:'10%' ,marginLeft:'90px'}}>Group Chat</h3>
                </motion.div>
                <motion.div initial={{scale:1.5}} whileTap={{scale:1}}  class='chat-sec' onClick={()=>setChatInd(2)}>
                    <h3 style={{color:'white' ,marginTop:'10%',marginLeft:'90px'}}>Mentor Chat</h3>
                </motion.div>
                    </div>


                }
                
               

            </div>





        </div>
    )

}
export default ChatBar;