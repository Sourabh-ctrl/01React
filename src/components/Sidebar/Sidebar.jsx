import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { IoIosArrowBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";

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
          <IoIosArrowBack size={25} color="white" className={`show noshow`}  onClick={()=>{
            setseen((prev) => !prev)
          }} alt="" />
          <p className="show noshow">Chats</p>
          </div>
          <IoIosArrowBack color="white"  size={25} 
            className="menu"
            onClick={() => {
              setextended((prev) => !prev);
            }}
          />
          <div onClick={()=>newChat()} className="new-chat">
            <FaPlus />
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
                     <FiMessageSquare color="white" />
                    <p>{item.slice(0,18)}..</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
