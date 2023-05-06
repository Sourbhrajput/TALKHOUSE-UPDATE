import React, { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "./Navigation.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Api/Api";
import { addUser } from "../../Store/userSlice";
import Button from "../components/Button/Button";
import { useEffect } from "react";


const Navigavtion = ({ setLoading }) => {
  const link = {
    textDecoration: 'none',
    color: '#ffff'
  }
  const { pathname } = useLocation();
  const isRoom = pathname.match("room/");
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.user);
  const { img, name, active } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  async function logOut() {
    try {
      setLoading(true)
      const response = await logout();
      dispatch(addUser({ user: response.data.user }));
      setLoading(false)
    }
    catch (e) {
      setLoading(false)
      console.log(e);
    }
  }
  const path=useRef();
  useEffect(()=>
  {
    path.current="/";
  },[])

  const contactPage=()=>
  { if(pathname==="/contact")
  {
    navigate(path.current)
  } 
 
  else{

    navigate('/contact') ;
    path.current=pathname;
  }
     
  }

 

  return (
    <nav className={`${style.nav} container `}>
      <div className={style.left}>
        <Link to="/" style={link}>
          <img className={style.img} src="../logo.svg" alt="" />
          <span className={style.brand}> Talkhouse </span>
        </Link>
      </div>



      <div className={`${style.right} ${pathname.match("/room")!=null ? style.rightCondition :""}`}>
        {
          isAuth && <>
            {
              active && <div className={style.nameimgcon} onClick={()=>navigate('/profile')}>
                <span className={style.name} >{name}</span>

                <div className={style.userImgWrapper}>
                  <img src={img} className={style.userimg} draggable="false" alt="user_image" />
                </div>
              </div>
            }

            {
              isRoom == null && <div onClick={logOut}>
                <Button btnstyle={style.btn} text="" logo="../images/logout" />
              </div>
            }
          </>
        }
        <div className={style.contact} onClick={() =>contactPage() }>  <Button text="Contact Us" logo="../images/message" /></div>
      </div>


    </nav>
  );
};

export default Navigavtion;
