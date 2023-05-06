import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useWebRTC } from '../../hooks/useWebRTC';
import style from './SingleRoom.module.css';
import { addTotal } from '../../Api/Api';
import { singleroom, } from '../../Api/Api';
import { toast } from 'react-hot-toast';
import Chat from '../components/Chat/Chat';


const SingleRoom = () => {
  const { roomId } = useParams();
  const { user } = useSelector((state) => state.user);
  const { mute: muteState } = useSelector((state) => state.user);
  const { ishandRaise: ishandRaiseState } = useSelector((state) => state.user);
  const [isMute, setIsMute] = useState(muteState);
  const [ishandRaise, setIsHandRaise] = useState(ishandRaiseState);
  const [clientFeature, setClientFeature] = useState(false);
  const [room, setRoom] = useState([]);
  const [showHand, setShowHand] = useState(false);
  const [showChat,setChat] = useState(false);
  const [clientFeatureId, setclientFeatureId] = useState(null);
  const [isRoomPrivate, setIsRoomPrivate] = useState(false);
  const [openDC, setOpenDC] = useState([]);
  const [allMessage, setAllMessage] = useState([]);
  const { clients, provideRef, mute, leaveClient, setSpeaker, removeSpeaker, handRaise } = useWebRTC(roomId, user, setClientFeature, setRoom, setShowHand, setOpenDC, setAllMessage);
  let hasuser = false;
  const navigate = useNavigate();


  //  check room is valid or not  
  const checkAccess = async () => {
    const response = await singleroom({ roomId });
    if (!response) {
      navigate("/rooms")
      return;
    }
    setRoom(response.data.room);
  }

  useEffect(() => {
    checkAccess();
  }, [])


  useEffect(() => {
    mute(isMute, roomId, user._id);
  }, [isMute])



  useEffect(() => {
    handRaise(ishandRaise, roomId, user._id);

  }, [ishandRaise])


  const verifyclientMute = (clientid) => {

    if (clientid === user._id) {
      setIsMute((pre) => !pre);
    }
  }
  const verifyclientHandRaise = () => {
    setIsHandRaise((pre) => !pre);
  }

  const setTotal = async (total) => {

    await addTotal({ total, roomId });

  }

  useEffect(() => {
    const total = clients.length;
    setTotal(total)

  }, [clients])

  const clientFunction = (clientId) => {

    if (user._id !== room.ownerId._id) {
      return;
    }
    setClientFeature((pre) => !pre);
    setclientFeatureId(clientId);

  }

  useEffect(() => {
    if (room.speakers) {
      const check = room.speakers.find(speaker => speaker._id === user._id);
      if (check === undefined) {
        setShowHand(true);
      }
      else {
        setShowHand(false)
      }

      if (room.roomtype === "closed") {
        setIsRoomPrivate((e) => !e);
      }

    }



  }, [room])

  const shareRoom = () => {

    navigator.clipboard.writeText(window.location.href).then((result) => {
      toast.success("URL Copied");

    }).catch((err) => {
      toast.error("URL not Copied");
    });

  }

  if (room.length <= 0) {
    return;
  }
  return (
    <>
      <div className={`container ${style.backcontainer}`}>

        <div className={style.back} onClick={() => window.history.back()}>
          <img src="../images/arrow.svg" alt="" />
          <h2>All voice rooms</h2>
        </div>
      </div>
      <div className={style.usersContainers}>
        <div className={style.heading}>
          <h2>{room.topic}</h2>
          <div className={style.leaveContainer}>
            {
              showHand && <div onClick={() => verifyclientHandRaise(user._id)}>
                <img src="../images/pamhand.svg" alt="" draggable="false" />
              </div>
            }
            <div onClick={()=>setChat((e)=>!e)}>
              <img src="../images/chat.svg" alt="" />
            </div>
            <span onClick={() => navigate('./rooms')}>
              <img src="../images/twofingure.svg" alt="" draggable="false" />
              <h3> Leave Room</h3>
            </span>
            {
              isRoomPrivate && <span className={style.share} onClick={shareRoom}>
                <img src="../images/share.svg" alt="" draggable="false" />
                <h3>Share</h3>
              </span>
            }

          </div>
        </div>
       {
        showChat &&  <div>
        <Chat openDC={openDC} allMessage={allMessage} setAllMessage={setAllMessage}></Chat>
      </div>
       }
        <div className={style.userwraper}>
          {/* owner  */}
          {

            clients.map(client => {
              return <div key={client._id}>
                <audio autoPlay ref={(instance) => provideRef(instance, client._id)} > </audio>
                {
                  room?.speakers.find(speaker => speaker._id === client._id) !== undefined && room.ownerId._id === client._id
                  && <div className={style.userdiv}>

                    <div className={style.imgnamediv}>

                      <div className={style.imgdiv}>
                        {
                          <img className={style.owner} src="../images/owner.svg" alt="Owner" />
                        }
                        <img src={client.img} alt="" draggable="false" className={style.userImage} />
                      </div>
                      <img onClick={() => verifyclientMute(client._id)} className={style.mute} src={client.mute ? "../images/mute.svg" : "../images/unmute.svg"} alt="" />
                      <h3>{client.name}</h3>

                    </div>


                  </div>
                }
              </div>
            })
          }
          {

            clients.map(client => {
              // another speakers

              return <div className={style.userdiv} key={client._id}>

                {
                  room.speakers.find(speaker => speaker._id === client._id) !== undefined && room.ownerId._id !== client._id
                  && <div className={style.imgnamediv}>

                    <div className={`${style.imgdiv}`} onClick={() => clientFunction(client._id)} >

                      <img src={client.img} alt="" draggable="false" className={style.userImage} />
                    </div>
                    <img onClick={() => verifyclientMute(client._id)} className={style.mute} src={client.mute ? "../images/mute.svg" : "../images/unmute.svg"} alt="" />
                    <h3>{client.name}</h3>
                    {
                      <div className={`${style.clientFeature} ${style.clientFeatureSpeaker} ${clientFeature && client._id === clientFeatureId ? `${style.show} ${style.showSpeaker}` : ""}`}>

                        <div className={style.leaveclient} onClick={() => leaveClient(roomId, client._id)} >
                          <img src="../images/arrow.svg" alt="Leave" />
                        </div>
                        <div className={style.speakerClient} onClick={() => removeSpeaker(roomId, client._id)}>
                          <img src="../images/unmic.svg" alt="Mic" />
                        </div>
                        <div className={style.profileClinet}>
                          <img src="../images/total.svg" alt="Profile" />
                        </div>
                        <div className={style.closeClient} onClick={() => setClientFeature(e => !e)} ><img src="../images/Vector.svg" alt="close" /></div>
                      </div>
                    }
                  </div>
                }
              </div>
            })
          }
        </div>

        <div className={style.other}>
          <h3>Other in the room</h3>

          <div className={style.userwraper}>
            {//listener in the room 

              clients.map(client => {
                return room.speakers.find(speaker => speaker._id === client._id) === undefined
                  && <div className={style.userdiv} key={client._id}>
                    {
                      hasuser = true
                    }

                    <div className={style.imgnamediv}>
                      <div className={`${style.imgdiv}`} onClick={() => clientFunction(client._id)} >
                        <img src={client.img} alt="" draggable="false" className={style.userImage} />
                      </div>
                      <img draggable="false" className={style.handRaise} src={client.ishandRaise ? "../images/pamhand.svg" : ""} alt="" />
                      <h3>{client.name}</h3>
                      {
                        <div className={`${style.clientFeature} ${clientFeature && client._id === clientFeatureId ? style.show : ""}`}>

                          <div className={style.leaveclient} onClick={() => leaveClient(roomId, client._id)} >
                            <img src="../images/arrow.svg" alt="Leave" />
                          </div>
                          <div className={style.speakerClient} onClick={() => setSpeaker(roomId, client._id)}>
                            <img src="../images/mic.svg" alt="Mic" />
                          </div>
                          <div className={style.profileClinet}>
                            <img src="../images/total.svg" alt="Profile" />
                          </div>
                          <div className={style.closeClient} onClick={() => setClientFeature(e => !e)} ><img src="../images/Vector.svg" alt="close" /></div>
                        </div>
                      }
                    </div>
                  </div>
              })
            }
          </div>
          <div className={style.hasuser}>
            {
              !hasuser && <h2>Listener is not available</h2>
            }
          </div>
        </div>
      </div>
    </>

  )
}

export default SingleRoom;


