import React from 'react'

import { Link ,useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { logout,reset } from '../features/auth/authSlice'

const Header = () => {
    const navigate=useNavigate()
    const dispatch= useDispatch()
    const {user}= useSelector((state)=>state.auth)
    const onLogout =()=>{
        dispatch(logout())
        dispatch(reset())
        navigate("/")
       
    }

  return (
    <header className='header'>
        <div className='logo'>
            <a href="/">SECURITY CHECK</a>
        </div>
        <ul>
            {user?(
                 <li>
                 <button className='btn' onClick={onLogout}>
                    LOGOUT
                 </button>
             </li>
            ):(<>
            <div className='FlexOption'>
            <li>
             <a href="/Login">
                 Login
             </a>
         </li>
         <li>
             <a href="/SignUp">
                  Sign Up
             </a>
         </li>
            </div>
           
            </>)}
           
        </ul>
    </header>
  )
}

export default Header