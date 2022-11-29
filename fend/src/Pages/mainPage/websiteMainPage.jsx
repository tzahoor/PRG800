import React  from 'react';
import "./mainPage.css";
import {Link } from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux'

const WebsiteMainPage = () => {
  const {user}=useSelector((state)=>{
    return state.auth
  })
  console.log(user)
  return (
    <div className='mainbox'>
        <div className='center'>
            <div className='headingDiv'>
            <h1 >ALPHA TECHIES</h1>
            <h1>THE SECURITY EXPERTS</h1>
            </div>
             <div className='ParagraphDiv'>
                <p>DRA TOOLS</p>
                <p>DDOS Attack Risk Assessment</p>
             </div>
             <div className='buttonDiv'>
            
                <button className='btu-n'> <a href='/Test'>Conduct Test</a> </button> 
                <button className='btu-n'> <a href="/JoinResult"> Check Result  </a> </button>
                {/* <button className='btu-n'> Request a report </button> */}


             </div>

        </div>
        
    </div>
  )
}

export default WebsiteMainPage;