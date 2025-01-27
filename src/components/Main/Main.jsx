import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import { FiMessageSquare } from "react-icons/fi";


const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input , setseen ,seen , extended } = useContext(Context)



    return (
        <div className={`main  ${seen?null:"case"}`}>
            <div className="nav">
            <FiMessageSquare  className='show noshow ' onClick={()=>{
                setseen((prev) => !prev)
            }} src={assets.message_icon} alt="" />
              <div className='content'>
               <h4>Gemini</h4>
               <p>1.5 Flash</p>
              </div>
                <img src={assets.user} alt="" />
            </div>
            <div className="main-container">
                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Hello,Sir.</span></p>
                            <p>How can I help you today?</p>

                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places to see on an road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Briefly summarize this concept: urban planning </p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Brainstorm team bonding activities for our work retreat </p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>improve the reliability of the folling code </p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading?
                            <div className='loader'>
                                <hr />
                                <hr />
                                <hr />

                            </div>
                            :<p dangerouslySetInnerHTML={{ __html:resultData }}></p>
                            }
                            
                        </div>


                    </div>

                }

                <div className="main-bottom">
                    <div className="search-box">
                      <div>

                      <img src={assets.gallery_icon} alt="" />
                        <input  onKeyDown={(e) => {
        if (e.key === "Enter")
            onSent();
        }} onChange={(e) => {
                          setInput(e.target.value)
                        }} value={input} type="text" placeholder='Enter a prompt here ' />
                        </div>
                        
       
                           {input?<img onClick={() => {
                                onSent()
                            }} src={assets.send_icon} alt="" />: <img src={assets.mic_icon} alt="" />} 
                        
                    </div>
                    
                </div>

            </div>
        </div>

    )
}

export default Main