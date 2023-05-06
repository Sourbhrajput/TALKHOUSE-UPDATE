import { useState, useEffect, useRef } from "react";
import style from './Chat.module.css';
const Chat=({openDC,setAllMessage,allMessage})=>
{ 
    const sendInput = useRef(null);
    const [message, setMessage] = useState([]);
    const messagesEndRef =useRef(null);
    const  send = (e) => {
    if (sendInput.current.value.trim() === "") return;
    const mssg = {
      data: sendInput.current.value,
      type: "outgoing",
    };

    setAllMessage([...allMessage,mssg])
    if(openDC.length)
    {
      openDC.forEach(dc => {
        if(dc)
        {
          dc.send(JSON.stringify(mssg))
        }
      });
       
    }
    sendInput.current.value = "";
  };
 return   <div className={style.container}>
 <div className={style.mssg_container}>
   <div  ref={messagesEndRef} className={style.all_mssg}>
     {allMessage.map((mssg, i) => {
       return  <div key={i} className={`${style.mssg} ${style[mssg.type]}`}><h5>{mssg.data}</h5></div>;
     })}
      <div className={style.input}>
     <input
       type="text"
       ref={sendInput}
       onKeyDown={(e) => (e.key === "Enter" ? send(e) : 1)}
       className="text"
       placeholder="Enter message ..."
     />
     <img onClick={(e) => send(e)} src="../images/send.svg" />
      
   </div>
   </div>
  
 </div>
</div>
}


export default Chat;