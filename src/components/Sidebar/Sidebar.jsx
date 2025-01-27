import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { IoIosArrowBack } from "react-icons/io";

const Sidebar = () => {
  const [extended, setextended] = useState(true);
  const { onSent, prevPrompt, setRecentPrompt,newChat ,seen ,setseen } = useContext(Context);

  const loadPrompt = async(prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt);

  }
  

  return (
    <>
      <div className= {`sidebar  ${seen?"hide":""}`} >
        <div className="top">
          <div className="hidden">
          <IoIosArrowBack size={25} className={`show noshow`}  onClick={()=>{
            setseen((prev) => !prev)
          }} alt="" />
          <p className="show noshow">Chats</p>
          <img className="show noshow" src={assets.user} alt="" />
          </div>
          <img
            className="menu"
            src={assets.menu_icon}
            alt=""
            onClick={() => {
              setextended((prev) => !prev);
            }}
          />
          <div onClick={()=>newChat()} className="new-chat">
            <img src={assets.plus_icon} alt="" />
            {extended ? <p>New chat</p> : null}
          </div>
          {extended ? (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompt.map((item, index) => {
                return (
                  <div key={index} onClick={()=>{
                    loadPrompt(item)
                    setseen((prev)=> !prev);
                  }} className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0,18)}..</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="" />
            {extended ? <p>Help</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
            {extended ? <p>Activity</p> : ""}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            {extended ? <p>Setting</p> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
