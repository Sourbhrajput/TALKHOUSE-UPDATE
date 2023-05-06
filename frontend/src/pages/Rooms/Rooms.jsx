import { useState, useEffect } from 'react'
import style from './Rooms.module.css'
import Button from '../components/Button/Button'
import CreateRoom from '../components/CreateRoom/CreateRoom'
import Room from '../components/Room/Room'
import { getRooms } from '../../Api/Api'
import { useNavigate } from 'react-router-dom'





const Rooms = ({ userId }) => {

  const [createRoom, setCreateRoom] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [social, setSocial] = useState(false);
  const [open, setOpen] = useState(false);
  const [closed, setClosed] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {

    (async () => {
      const { data } = await getRooms({ find: ["open", "social", userId ? "closed" : ""], search, userId });

      if (data.rooms) {

        setRooms(data.rooms);
        setOpen(false);
        setSocial(false);
        setClosed(false);
      }


    })();

  }, [search])

  useEffect(() => {

    const roomsType = Array.from(new Set(rooms.map((room) => room.roomtype)));

    if (roomsType.includes("open")) {
      setOpen(true);
    }
    else {

      setOpen(false);
    }
    if (roomsType.includes("social")) {
      setSocial(true);
    }
    else {
      setSocial(false);
    }
    if (roomsType.includes("closed")) {
      setClosed(true);
    }
    else {
      setClosed(false);
    }

  }, [rooms])


  return (
    <div className={`${style.roomsWrappper} container`}>
      <div className={style.roomtop} >
        <div className={style.left}>
          <span onClick={() => navigate("/rooms")} style={{ cursor: "pointer" }}>All voice rooms</span>
          <div className={style.searchWrapper + " " + style.searchInputBigScreen}>
            <div> <img src="./images/search.svg" alt="" /> </div>
            <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" name="" id="" />
          </div>
        </div>
        <div className={style.right} onClick={() => setCreateRoom(true)}> <Button btnstyle={style.createroombtn} logo="./images/room" text="Start a room" /> </div>
      </div>
      <div className={style.searchInputSmallScreen}>
        <div> <img src="./images/search.svg" alt="" /> </div>
        <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" name="" id="" />
      </div>

      {
        createRoom && <CreateRoom setCreateRoom={setCreateRoom} />
      }

      {rooms.length !== 0 ? <Available setRooms={setRooms} userId={userId} rooms={rooms} open={open} social={social} closed={closed} /> : <div className={style.hasroom}><h2>Rooms not available</h2></div>}

    </div>
  )
}

const Available = ({ rooms, open, social, closed, userId, setRooms }) => {
  return <>
    {open && <span className={style.roomtype}>Global Rooms</span>}
    <div className={style.globalrooms}>

      {
        rooms.map(room => room.roomtype === "open" &&
          <Room key={room._id} room={room} userId={userId} setRooms={setRooms} />)}

    </div>
    {social && <span className={style.roomtype}>Social Rooms</span>}
    <div className={style.globalrooms}>

      {
        rooms.map(room => room.roomtype === "social" &&
          <Room key={room._id} room={room} userId={userId} setRooms={setRooms} />)}

    </div>
    {closed && <span className={style.roomtype}>Private Rooms</span>}
    <div className={style.globalrooms}>

      {
        rooms.map(room => room.roomtype === "closed" &&
          <Room key={room._id} room={room} userId={userId} setRooms={setRooms} />)}

    </div>
  </>
}

export default Rooms
