import React, { useContext, useEffect } from 'react'
import { MdOutlineMic } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import './Voice.css'
import { Context } from '../../context/Context';
import { assets } from '../../assets/assets';

const Voice = () => {
  const {setvoice , listen } = useContext(Context);

  
 

  return (
    <div className="container">
        
      <div className="center">
      <img src={assets.new3} alt="" />
      </div>
      <div className="bottom">
        <MdOutlineMic onClick={listen} color='white' size={40} />
        <div>
        <RxCross2 className='red' onClick={()=>{
          setvoice(false)
        }}  color='white' size={40} />
        </div>
      </div>
        
    </div>
    
  )
}

export default Voice