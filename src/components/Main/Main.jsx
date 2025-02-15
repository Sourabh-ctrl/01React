import React, {useContext} from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { FiMessageSquare } from "react-icons/fi";
import { RiVoiceAiLine } from "react-icons/ri";
import { MdOutlineMic } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import img from '../../assets/devil.jpg'

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    setseen,
    seen,
    setvoice,
    newChat,
    listen,
    listening,
    transcript, 
  } = useContext(Context);

  return (
    <div className={`main  ${seen ? null : "case"}`}>
      <div className="nav">
        <FiMessageSquare color="white"
          className="show noshow "
          onClick={() => {
            setseen((prev) => !prev);
          }}
        />
        <div className="content">
          <img src={img} alt="" />
        </div>
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello,Sir.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.new3} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p  dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <div>
             <img src={assets.logo} alt="" />

              {listening?
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSent();
                }}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                value={transcript}
                type="text"
                placeholder="Enter a prompt here"
              />:
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSent();
                }}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                value={input}
                type="text"
                placeholder="Enter a prompt here"
              />}
            </div>
            <div>
            {input ? (
              <IoSend size={25} color="red"
                onClick={() => {
                  onSent();
                }}
              />
            ) : (
            <div className={listening?"cover":null} >
              <MdOutlineMic size={25} color="#fff"
                onClick={listen}
              />
              </div>
            )}
              <RiVoiceAiLine onClick={()=>{
                setvoice(true)
                newChat();
              }} className="voice" size={25} color="#ff5546"/>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
