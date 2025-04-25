import React, { useContext, useEffect } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import { Context } from './context/Context'
import Voice from './components/Voice/Voice'

const App = () => {
  
   const {voice , data, loading} = useContext(Context);
  
  return (
   <> <Sidebar/>
{/* {voice?<Voice/>: 
 <Main/>} */}
  <Main/>

</>  )
}

export default App