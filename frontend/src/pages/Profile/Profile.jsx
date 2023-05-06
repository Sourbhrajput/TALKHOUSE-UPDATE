import React from 'react'
import { useSelector } from 'react-redux';
import Rooms from '../Rooms/Rooms';

const Profile = () => {

    const userId=useSelector((state)=>state.user.user._id);
     
  return (
    <div>
      <Rooms userId={userId}/>
    </div>
  )
}

export default Profile;
