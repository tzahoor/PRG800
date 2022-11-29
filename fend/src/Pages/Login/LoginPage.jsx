import React from 'react';
import "./LoginPage.css";
import { useState,useEffect } from "react"

import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import { login,reset } from '../../features/auth/authSlice'
import Spinner from '../../Component/Spinner';


const LoginPage = () => {
  const [FormError,setFormError]=useState({})
  const [Message,setMessage]=useState(false)
  const [formData,setformData]=useState({
  
    email:'',
    password:'',
  
  })
  const navigate=useNavigate()
  const dispatch  = useDispatch()
 
  const {user,isLoading,isError,isSuccess,message}=useSelector((state)=>{
    return state.auth
  })
  console.log(user)
  useEffect(()=>{
    if(isError){
     toast.error(message)
    }
    if(isSuccess&&user){
      navigate('/')
    }
  
    
    dispatch(reset())

  },[user,isError,isSuccess,message,navigate,dispatch])
  const {email,password}=formData
  const onChange=(e)=>{
    setformData((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value

    }))
    }
    const validate = (values) => {
     
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
     
      if (!values.email) {
        errors.email = "Email is required!";
      } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
      }
      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 4) {
        errors.password = "Password must be more than 4 characters";
      } else if (values.password.length > 10) {
        errors.password = "Password cannot exceed more than 10 characters";
      }
      return errors;
    };
  
const errors = {};
  
  const handlesubmit= async(e)=>{
    
    e.preventDefault()
    const userdata={
      email,
      password
    }
    validate(userdata)
    if(Object.keys(errors).length === 0){
    dispatch(login(userdata))
    
  }
  else{
    setFormError(errors)
  }

    
    
   
  }
  if(isLoading){
    return <Spinner></Spinner>
  }
  
  
  return (
    
  
      <div className="LoginContainer">
    
          <form  className="formsubmit" onSubmit={handlesubmit}>
          <div className="inputs">
            <div className='values'>
              <label>Email</label>
            <input type="text" name="email" onChange={onChange}  placeholder="Email"/>
              <p>{FormError.email}</p>
            </div>
           <div  className='values'>
           <label>Password</label>
            <input type="password" name="password"   onChange={onChange} placeholder="Password"></input>
            <p>{FormError.password}</p>
           </div>
           
          </div>
         

          <div>
            <button className="LoginButton" type="submit">Login</button>
          </div>
          </form>
          

          <p className="text">
            Don't have an account? <a href="/SignUp"> Sign Up</a>
          </p>
        
      </div>
  
  );
}
  

export default LoginPage;
