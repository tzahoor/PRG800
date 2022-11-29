// it is for http request and sending the data back
import axios from 'axios'



//register user
const register=async (userData)=>{
    const response = await axios.post("http://localhost:5000/api/user/register",userData)
    
    return response.data 
}
//login user
const login=async (userData)=>{
    const response = await axios.post("http://localhost:5000/api/user/login",userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data.token))
    }
    return response.data 
}
const logout = ()=>{
    localStorage.removeItem('user')
}
const authService={
    register,
    logout,
    login
}

export default authService