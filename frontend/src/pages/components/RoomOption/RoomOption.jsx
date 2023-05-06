import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
 
import  {deleteRoomApi} from '../../../Api/Api';
 
import style from './RoomOptions.module.css';
 
const RoomOption = ({ userId,roomId,setRooms }) => {
    const [roomDelete,setRoomdelete]=useState(false);
    

    useEffect(()=>
    { 
         
    ( async ()=>
    {
        if(roomDelete)
        {
            
           
            const response= await deleteRoomApi({roomId});
            
             if(response)
             {
             toast.success("Room deleted");
             setRooms((rooms)=>rooms.filter((room)=>room._id!==roomId));
             }
             else{
               toast.error("Unable to delete room");
               setRoomdelete((e)=>!e);
             }
        }
   
    })();


    },[roomDelete,roomId])
 

    return (

          <div className={style.container}>  <img className={style.deleteImg} src="./images/delete.png" alt="Delete"onClick={(e)=>{
            e.stopPropagation();
            setRoomdelete((e)=>!e);
        }
        }/></div>
           
        

    )
}

export default RoomOption
