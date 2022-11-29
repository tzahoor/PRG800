import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {findDOMNode} from 'react-dom'
import ReactTooltip from 'react-tooltip'
import { useRef } from 'react';
const DDOS = () => {
  const ref = useRef(null)
    const [Answer,SetAnswer]=useState([]);
    const [error,setError]=useState(false)
    const navigate=useNavigate()
    
    let DDOSRiskArray=[]
    const ColorLogic =(choice)=>{
      if(choice==="LowLow" || choice==="MediumLow"){
        return "green"
        console.log("green");
        
      
    }else if(choice==="LowMedium"||choice==="MediumMedium"||choice==="HighLow"){
      return "orange"
      console.log("orange")
    }else if(choice ==="LowHigh"||choice==="HighMedium"){
      return "orangered"
       console.log("orangered");
    }else if(choice==="MediumHigh"||choice==="HighHigh"){
      return "red"
        console.log("red");
    }
    }
    const RiskLogic =(choice)=>{
        
        if(choice==="LowLow" || choice==="MediumLow"){
            DDOSRiskArray.push('Low')
        }else if(choice==="LowMedium"||choice==="MediumMedium"||choice==="HighLow"){
            DDOSRiskArray.push('Medium')
        }else if(choice ==="LowHigh"||choice==="HighMedium"){
            DDOSRiskArray.push("High")
        }else if(choice==="MediumHigh"||choice==="HighHigh"){
            DDOSRiskArray.push("Critical")
        }
    }
  const Question = [
    {
      questiontitle: "Do you audit and analyze security and firewall logs regularly?",
      choices: [
        { Q: "Yes, audit has been done regularly ", A: "LowLow" },
        { Q: "No audit it done in past 5 years", A: "HighMedium" },
        { Q: "We consider to do it ", A: "LowMedium" },
      ],
    },
    {
      questiontitle: "Are security monitoring tools in place?",
      choices: [
        { Q: "Any Anti-Virus or monitoring tool has been implemneted ", A: "LowMedium" },
        { Q: "No, Monitoring tool is in Place", A: "LowMedium" },
        { Q: "Older version of monitoring tool is places ", A: "MediumMedium" },
        { Q: "No, yet implemented but planning to implement new one", A: "HighHigh" },
      ],
    },
    {
      questiontitle: "Have you experienced any denial-of-service incident before?",
      choices: [
        { Q: "Have any incident of DDoS attack on the past", A: "HighLow" },
        { Q: "Disruption of business processes or information system function", A: "HighHigh" },
        { Q: "No attack has been ever happened ", A: "LowMedium" },
        { Q: "Attack happened but detected by monitoring tool", A: "LowLow" },
      ],
    },
    {
      questiontitle: "Are IDP and IPS in place to manage network?",
      choices: [
        { Q: "Any detection and Prevention Tools in Places", A: "LowMedium" },
        { Q: "No Intrusion detection and prevention tool", A: "HighHigh" },
        { Q: "Only one of them Implemented ", A: "MediumMedium" },
      ],
    },
    {
      questiontitle:
        "Is there a dedicated security team in place to manage security issues?",
      choices: [
        { Q: "Have you have any inhouse IT security team", A: "MediumMedium" },
        { Q: "Have you have 3 party security team", A: "LowLow" },
        { Q: "No need for security team loss of budget", A: "HighHigh" },
      ],
    },
    {
      questiontitle:
        " Do you monitor unauthorized access request on the network?",
      choices: [
        { Q: "Have any unauthorzied traffic ever try to access network and they are successful", A: "LowLow" },
        { Q: "No such incident occur in the past", A: "MediumMedium" },
        { Q: "There has been lot of unauthorize traffic in the past", A: "HighHigh" },
      ],
    },
    {
      questiontitle:
        "Are suspected traffic on network reported?",
      choices: [
        { Q: "Have traffice report provided to you according to suspected and unauthrized  to you", A: "HighHigh" },
        { Q: "No traffice report ever reported to you", A: "LowLow" },
        { Q: "There might few incident in the past in which we get the reports of the unknown traffic", A: "HighMedium" },
      ],
    },
    {
        questiontitle:
          "Is network redundancy provided in the network topology?",
        choices: [
          { Q: "Are there any other paths to reach the network in case of attack", A: "HighMedium" },
          { Q: "No such path ever created ", A: "MediumMedium" },
          { Q: "We have path but never perform the load testing on it", A: "HighHigh" },
        ],
      },
      {
        questiontitle:
          "Do you have defense in depth strategy in place to protect assets and data?",
        choices: [
          { Q: "Do you have any strategy document to follow in case of attack", A: "LowHigh" },
          { Q: "No we do no know what to do in case of attack", A: "HighHigh" },
          { Q: "We have strategy but never have been updated ", A: "MediumMedium" },
        ],
      },
      {
        questiontitle:
          "Is load balancing employed to protect critical resources from exposure?",
        choices: [
          { Q: "Have any load balancer in place to manage traffice", A: "LowMedium" },
          { Q: "No such methodolgy in place", A: "HighHigh" },
          { Q: "No new server added since last 2 years ", A: "MediumMedium" },
        ],
      },
  ];
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const RiskValues=Object.values(Answer)
    RiskValues.map((value)=>{
        return RiskLogic(value);
    })
    const Answers={
      "Answers":DDOSRiskArray
     }
      const token =JSON.parse(localStorage.getItem('user'))
      const config={
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
      if(RiskValues.length===Question.length){
      const response=await axios.post("http://localhost:5000/api/user/postDDOSAnswer",Answers,config)
      console.log(response.data);
  
      
      navigate('/Table')}
      else{
        setError(true)
      }
  }
  const handleClick=(question,Color)=>{
    const el2 = document.getElementById(question.questiontitle)
    el2.setAttribute('style',`background:${Color};`);
  }

  return (
    <div className="QuestionContainer">
       <h1>DDOS QUESTION</h1>
      <br />
      <form onSubmit={handleSubmit}  className="QuestionForm  ">
        
        {Question.map((question, i) => {
          // eslint-disable-next-line array-callback-return
          return (
           <div key={i}>
            <h3 name={question.questiontitle} ref={ref}  id={question.questiontitle}>
                {question.questiontitle}
            </h3>
           <div className="FlexChoices">
           {
                question.choices.map((choice,i)=>{
                    return (
                        <div key={i}>
                            <label className="singleChoiceMargin">
                                <input 
                                className="radiobutton"
                                type="radio"
                                name={question.questiontitle}
                                value={choice.A}
                                onChange={
                                  (e)=>{
                                    if(Answer[question.questiontitle] in Answer){
                                     Answer[question.questiontitle]=e.target.value
                                     handleClick(question,ColorLogic(choice.A))
                                    }else{
                                     SetAnswer((a)=>({
                                       ...a,
                                       [question.questiontitle]:choice.A

                                     }))
                                     handleClick(question,ColorLogic(choice.A))
                                    }
                                 }
                                }
                                />
                                {choice.Q}
                            </label>
                        </div>
                    );
                })
            }
           </div>
           </div>
            
          )
        })}
            <br />
            {error && <p style={{color:"red"}}>Please fill all the question</p>}
        <button type="submit">Submit</button>
      
      </form>
    </div>
  );
}

export default DDOS
