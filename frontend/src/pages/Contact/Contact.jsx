import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom';
import style from './Contact.module.css'
import {contactApi} from '../../Api/Api'


const Contact = () => {

 const [name,setName]=useState("");
 const [email,setEmail]=useState("");
 const [message,setMessage]=useState("");
 const navigate=useNavigate();
  const sendDetails=async()=>
  {
    if(!name.trim().length>0 || !email.trim().length>0 || !message.trim().length>0 )
    {
       return  toast.error("Enter Details")
    }

    const {data}=await contactApi({name,email,message});

   if(data.error)
   {
  return  toast.error("Something went Wrong Please try again")
   }
     toast.success("Thanks for Contact Us");
     return  navigate("/")
  }


    return (
        <div className={style.containerWrappper}>
            <div className={style.container}>
              <div className={style.leftcon}>
              <div className={style.heading} ><h1>Drop us a line</h1></div>
            <div className={style.left}>
                <div><h3 htmlFor="">Full Name</h3>
                    <input type="text" placeholder="What's your full name?" onChange={(e)=>setName(e.target.value)} /></div>
                <div> <h3 htmlFor="">Email adress</h3>
                    <input type="email" placeholder='you@example.com'  onChange={(e)=>setEmail(e.target.value)} /></div>
                <div>  <h3 htmlFor="">Message</h3>
                    <textarea name="" id="" cols="30" rows="10" placeholder='Write your message for the team here'  onChange={(e)=>setMessage(e.target.value)} ></textarea></div>
                <div className={style.submit} onClick={sendDetails}>Submit</div>

            </div>
              </div>
            <div className={style.right}>

                <img draggable="false" src="../images/background_contact.png" alt="" />
            </div>

        </div>
        </div>
    )
}

export default Contact;