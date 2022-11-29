import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Histogram from 'react-chart-histogram';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
// import Chart from 'react-google-charts'


const SecondResult = () => {
     const [MediumScore,setMediumScore]=useState(false)
     const [LowScore,setLowScore]=useState(false)
     const [HighScore,setHighScore]=useState(false)
     const [CriticalScore,setCriticalScore]=useState(false)
    const [basicAnswer,setBasicAnswer]=useState([])
    const [security,setSecurityAnswer]=useState([])
    const [DDOS,setDDOS]=useState([])
    const {user}=useSelector((state)=>{
        return state.auth
      })
    let Low=0
    let High=0
    let Medium=0
    let Critical=0
    const token =JSON.parse(localStorage.getItem('user'))
    const config={
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
    
    useEffect(()=>{
        const basic= async()=>{

      
      const response = await axios.get("http://localhost:5000/api/user/SecondLastBasic",config)
        const basicResponse= await response.data.data.data.Answers;
        setBasicAnswer(basicResponse)
       

        } 
        const security=async()=>{
           
            const response = await axios.get("http://localhost:5000/api/user/SecondLastSecurity",config)
              const SecurityResponse= await response.data.data.data.Answers;
              setSecurityAnswer(SecurityResponse)
        }
        const Ddos=async()=>{
          
            const response = await axios.get("http://localhost:5000/api/user/SecondLastDDOS",config)
              const DDOSresponse= await response.data.data.data.Answers;
              setDDOS(DDOSresponse)
        }
       
        basic()
        security()
        Ddos()

    },[])
    const handleClick=()=>{
     if(Medium>Low && Medium>High && Medium>Critical){
       setMediumScore(true)
     }else if(Low>Medium && Low>High && Low>Critical){
       setLowScore(true)
     }else if(High>Low && High>Medium && High>Critical){
       setHighScore(true)
   
     }else if(Critical>Low && Critical>Medium && Critical>High){
       setCriticalScore(true)
     }
   }
   
    
  
   const labels = ['Low', 'High', 'Medium','Critical'];

   const options = { fillColor: '#FFFFFF', strokeColor: '#0000FF' };
  return (
    <>
    {user?(()=>{
      if(basicAnswer.length===0){
          return <div> " " </div>
     }
     else{
          return(
               <div className='Result'>
        <h1> PREVIOUS RESULT </h1>
        {
             basicAnswer.map((e)=>{
                if(e==="Low"){
                     Low++;
                }else if(e==='High'){
                     High++;
                }else if(e==="Medium"){
                     Medium++;
                }else if(e==="Critical"){
                     Critical++;
                }
             })  
            
        }
        {
            security.map((e)=>{
                if(e==="Low"){
                     Low++;
                }else if(e==='High'){
                     High++;
                }else if(e==="Medium"){
                     Medium++;
                }else if(e==="Critical"){
                     Critical++;
                }
             })  
        }
        {
            DDOS.map((e)=>{
                if(e==="Low"){
                     Low++;
                }else if(e==='High'){
                     High++;
                }else if(e==="Medium"){
                     Medium++;
                }else if(e==="Critical"){
                     Critical++;
                }
             })  
        }
         <div className='ResultDiv'>
        <button onClick={handleClick} className="ShowTheHighestResultButton">Check your score</button>
       
       {MediumScore ? <p  style={{color:"orange",fontSize:'24px'}}>Your Risk score is <span style={{fontWeight:'bold'}} >Medium</span> </p>:<div></div>}
    {LowScore ? <p style={{color:"green",fontSize:'24px'}}> Your Risk score is <span style={{fontWeight:'bold'}} >Low</span> </p>:<div></div>}
    {HighScore ? <p style={{color:"orangered",fontSize:'24px'}}>Your Risk score is <span style={{fontWeight:'bold'}} >High</span> </p>:<div></div>}
    {CriticalScore ? <p style={{color:'red',fontSize:'24px'}}>Your Risk score is <span style={{fontWeight:'bold'}} >Critical</span> </p>:<div></div>}
        </div>
      <div>
          <div className='FlexResultNumber'>
          <p>low: {Low} </p>
          <p>High: {High}</p>
          <p>Medium: {Medium}</p>
          <p>Critical :{Critical}</p>
          </div>
      </div>

           
         <Histogram
          xLabels={labels}
          yValues={[Low,High ,Medium,Critical]}
          width='600'
          height='400'
          options={options}
      />
       
    </div>
          )
     }
    })():(
        <div>
             <h1> Please  <Link to='/Login'>LogIn</Link> </h1>
        </div>
    )}
        
    </>

  )
}

export default SecondResult
