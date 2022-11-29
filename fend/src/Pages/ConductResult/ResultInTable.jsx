import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Histogram from 'react-chart-histogram';
import { useSelector } from 'react-redux'
import {   useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const ResultInTable = () => {
  const [email,setEmail]=useState("")
  const [visible,setVisible]=useState(false)
  const navigate= useNavigate()
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
  let basicLow=0
  let basicHigh=0
  let basicMedium=0
  let basicCritical=0
  let securityLow=0
  let securityHigh=0
  let securityMedium=0
  let securityCritical=0
  let DDOSLow=0
  let DDOSHigh=0
  let DDOSMedium=0
  let DDOSCritical=0
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

    
   
  const response = await axios.get("http://localhost:5000/api/user/getBasicQuestionScore",config)
    const basicResponse= await response.data.data.data.Answers;
    setBasicAnswer(basicResponse)
    
   

    } 
    const security=async()=>{
      
       
        const response = await axios.get("http://localhost:5000/api/user/getSecurityQuestionScore",config)
          const SecurityResponse= await response.data.data.data.Answers;
          setSecurityAnswer(SecurityResponse)
    }
    const Ddos=async()=>{
       
        
        const response = await axios.get("http://localhost:5000/api/user/getDDOSScore",config)
          const DDOSresponse= await response.data.data.data.Answers;
          setDDOS(DDOSresponse)
          
    }
    
    
    basic()
    security()
    Ddos()
   
    // HighNumber()

},[Medium])
if(basicAnswer){
  basicAnswer.map((e)=>{
    if(e==="Low"){
       Low++
       basicLow++
    }else if(e==='High'){
         High++;
         basicHigh++
    }else if(e==="Medium"){
         Medium++;
         basicMedium++
    }else if(e==="Critical"){
         Critical++;
         basicCritical++
    }
 })  
}
if(security){
  security.map((e)=>{
    if(e==="Low"){
         Low++;
         securityLow++
    }else if(e==='High'){
         High++;
         securityHigh++
    }else if(e==="Medium"){
         Medium++;
         securityMedium++
    }else if(e==="Critical"){
         Critical++;
         securityCritical++
    }
 }) 
}
if(DDOS){
  DDOS.map((e)=>{
    if(e==="Low"){
         Low++;
         DDOSLow++
    }else if(e==='High'){
         High++;
         DDOSHigh++
    }else if(e==="Medium"){
         Medium++;
         DDOSMedium++
    }else if(e==="Critical"){
         Critical++;
         DDOSCritical++
    }
 })  
}
const handlebutton =()=>{
  setVisible(true)
}
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
const sendButton =()=>{
 navigate('/')
}
const options = { fillColor: '#FFFFFF', strokeColor: '#0000FF' };

  return (
    <>
    <div className='TableContainer'>
      
     
     <Table striped bordered hover size="sm">
      <thead>
      <tr>
        <th>Sheet Name/Risk</th>
        <th>Low</th>
        <th>High</th>
        <th>Medium</th>
        <th>Critical</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      <td>Basic Question</td>
          <td>{basicLow}</td>
          <td>{basicHigh}</td>
          <td>{basicMedium}</td>
          <td>{basicCritical}</td>
      </tr>
      <tr>
      <td>Data_Security</td>
          <td>{securityLow}</td>
          <td>{securityHigh}</td>
          <td>{securityMedium}</td>
          <td>{securityCritical}</td>
      </tr>
      <tr>
        <td>DDOS</td>
          <td>{DDOSLow}</td>
          <td>{DDOSHigh}</td>
          <td>{DDOSMedium}</td>
          <td>{DDOSCritical}</td>
          
      </tr>
      <tr>
       <td></td>
          <td >{Low}</td>
          <td>{High}</td>
          <td>{Medium}</td>
          <td>{Critical}</td>
          
      </tr>
          
      
    </tbody>
  </Table>
  <div className='button'>
    <button onClick={handleClick} className="ShowTheHighest">Check Score</button>
    {MediumScore ? <p style={{color:"orange"}}>your risk score is <span style={{fontWeight:'bold'}} >Medium</span> we advise you to request a report</p>:<div></div>}
    {LowScore ? <p style={{color:"green"}}> your risk score is <span style={{fontWeight:'bold'}} >low</span> but you can still request a report</p>:<div></div>}
    {HighScore ? <p style={{color:"orangered"}}>your risk score is <span style={{fontWeight:'bold'}} >high</span> we advise you to request a report</p>:<div></div>}
    {CriticalScore ? <p style={{color:'red'}}>your risk score is <span style={{fontWeight:'bold'}} >Critical</span> we advise you to request a report</p>:<div></div>}
  </div>
  <div className="TableValue">
          <div className='FlexResultNumber'>
          <p>low: {Low}</p>
          <p>High: {High}</p>
          <p>Medium: {Medium}</p>
          <p>Critical :{Critical}</p>
          </div>
      
      </div>

  <Histogram
          xLabels={["Low","High","Medium","Critical"]}
          yValues={[Low,High,Medium,Critical]}
          width='600'
          height='400'
          options={options}
      />
      <div>
      <button onClick={handlebutton}> REQUEST A REPORT </button>
   {visible &&  <div className='RequestAform' >
   <div className='values'>
      <label>Email</label>
      <input type="text" name="email" onChange={(e)=>setEmail(e.target.value)}  placeholder="Email"/>
              
    </div>
    {email.length>0&&<button onClick={sendButton}>Send</button>}
    

   </div>}
      </div>
   
  

  </div>
 
    </>
       
   
 
  )
}

export default ResultInTable
