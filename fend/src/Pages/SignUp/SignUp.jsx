import React  from 'react';
import { useState,useEffect } from "react"

import { useNavigate } from "react-router-dom";



import { useSelector,useDispatch } from 'react-redux'
import { register,reset } from '../../features/auth/authSlice'
import Spinner from '../../Component/Spinner';


const SignUp = () => {
 
  const [FormError,setFormError]=useState({})
  const dispatch  = useDispatch()
  const [formData,setformData]=useState({
    firstname:'',
    lastname:'',
    email:'',
    orgName:'',
    password:''
  })
  
  const {firstname, lastname,email,password, orgName}=formData
  const {user,isLoading,isError,isSuccess,message}=useSelector((state)=>
  state.auth
)
 
  const navigate = useNavigate();
  const onChange=(e)=>{
    setformData((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value

    }))
}
const errors = {};
useEffect(()=>{
  if(isError){
    console.log(message);
  }
  if(isSuccess){
    navigate('/Login')
  }
  dispatch(reset())

},[user,isError,isSuccess,message,navigate,dispatch])
  const handleSubmit= async(e)=>{
    e.preventDefault()
    const userData={
        firstname,
        lastname,
        email,
        password,
        orgName
      }
      validate(userData)
      if(Object.keys(errors).length === 0){
       dispatch(register(userData))
      }
      else{
       
        setFormError(errors)
      }
       
   
  
    }
    if(isLoading){
      return <Spinner></Spinner>
    }
    const validate = (values) => {
     
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.firstname) {
        errors.firstname = "firstname is required!";
      }
      if (!values.lastname) {
        errors.lastname = "lastname is required!";
      }
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

  return (
    <div className='SignUpContainer'>
      <h1> Register Form</h1>
      <form onSubmit={handleSubmit} className="SignUpForm">
            <div className='value'>
              <label>Firstname</label>
            <input type="text" onChange={onChange} name="firstname" id="firstname" placeholder='firstname' />
            <p>{FormError.firstname}</p>
            </div>
            <div className='value'>
            <label>Lastname</label>
            <input type="text" onChange={onChange} name="lastname" id="lastname" placeholder='lastname' />
            <p>{FormError.lastname}</p>
            </div>
            <div className='value'>
            <label>Email</label>
            <input type="email" name="email" id="email" onChange={onChange} placeholder='email' />
            <p>{FormError.email}</p>
            </div>
            <div className='value'>
            <label>Organiztion Name</label>
            <input type="text" name="orgName"  onChange={onChange} id="orgName" placeholder='organization name' />
            <p>{""}</p>
            </div>
            <div className='value'>
            <label>Password</label>
            <input type="password" name="password" onChange={onChange} id="password" placeholder='password' />
         <p>{FormError.password}</p>
            </div>
        
         <button type='submit' >Register </button>
         </form>
    
      
         
    </div>
   
  )
}

export default SignUp