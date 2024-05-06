import React from "react";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc ,onSnapshot,query,where} from "firebase/firestore";

function SendBox({userid,settext,text,messageref,firebase,dummy}){

    const sendMessage = async (e) => {
        e.preventDefault();
        if(text===''){
            return;
        }

        await  addDoc(messageref, {
          text: text,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          user:userid,
          type:'participant'
        })
    
       
    
      
    
        settext('');
        document.getElementById("textform").reset();
        dummy.current.scrollIntoView({ behavior: 'smooth' });
      }


    return (
      <div class='send-div'>

     
        <form id='textform' class='d-flex send' onSubmit={sendMessage}>
  
   
    <input  class="send-tf"placeholder="Send Message"  onChange={(e)=>{settext(e.target.value)}}/>
   
 
    
  
  <button type="submit" class="btn " ><img src={require("./send.png")} alt=""  style={{height:"30px",width:'30px'}}/></button>
</form>
</div>
        
    )


}
export default SendBox;