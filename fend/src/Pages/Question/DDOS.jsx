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
      questiontitle: "Have you implemented strong firewall and network security group rules?",
      choices: [
        { Q: "Yes ", A: "LowLow" },
        { Q: "In progress", A: "MediumMedium" },
        { Q: "No ", A: "HighHigh" },
      ],
    },
    {
      questiontitle: "Are you using any Ddos Mitigation/Protection service to detect and redirect abnormal",
      choices: [
        { Q: "Yes", A: "LowLow" },
        { Q: "No", A: "LowHigh" },
      ],
    },
    {
      questiontitle: "Is a disaster recovery plan developed in case of an attack?",
      choices: [
        { Q: "Yes, a detailed low-level plan is there", A: "LowLow" },
        { Q: "Yes, but on a high level", A: "MediumMedium" },
        { Q: "No Recovery Plan", A: "HighHigh" },
      ],
    },
    {
      questiontitle: "With how many organizations do you share your web server? Or Does your hosting provider have a large number of clients, all using the same server? ",
      choices: [
        { Q: "Shared with alot of clients", A: "HighHigh" },
        { Q: "Shared with a few clients", A: "MediumMedium" },
        { Q: "Do not share at all ", A: "LowLow" },
      ],
    },
    {
      questiontitle:
        "Are your DNS records hidden and protected from outside attacks?",
      choices: [
        { Q: "Yes", A: "LowLow" },
        { Q: "No", A: "HighHigh" },
      ],
    },
    {
      questiontitle:
        " Does your network have enough bandwidth to provision traffic that caters your need ?",
      choices: [
        { Q: "Yes", A: "LowLow" },
        { Q: "No", A: "HighHigh" },
      ],
    },
    {
      questiontitle:
        "Have you faced any DDoS attack or network outage in the past?",
      choices: [
        { Q: "Yes, it has occured", A: "HighHigh" },
        { Q: "No, it has never occured", A: "LowLow" },
        { Q: "Yes, but detected by the security tools", A: "MediumMedium" },
      ],
    },
    {
        questiontitle:
          "Do you have any automated monitoring tool with security alerts? eg (PTRG,Colasoft)",
        choices: [
          { Q: "Yes, its being used ", A: "LowLow" },
          { Q: "No, not implimented ", A: "HighHigh" },
          { Q: "Yes but older versions", A: "MediumMedium" },
        ],
      },
      {
        questiontitle:
          "Any unknown or suspicious network traffic reported in the past?",
        choices: [
          { Q: "No such traffic encountered", A: "LowLow" },
          { Q: "Yes, but once in a while", A: "HighMedium" },
          { Q: "Yes, many times ", A: "HighHigh" },
        ],
      },
      {
        questiontitle:
          "Does the network topology allows redundancies with more than one ways to reach a system?",
        choices: [
          { Q: "Yes", A: "LowLow" },
          { Q: "No", A: "HighHigh" },
        ],
      },
      {
        questiontitle:
          "Have you implemented load balancing to handle huge traffic?",
        choices: [
          { Q: "Yes", A: "LowLow" },
          { Q: "No", A: "HighHigh" },
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
