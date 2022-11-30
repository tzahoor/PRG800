import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios  from "axios";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { useRef } from "react";


const Question = () => {
  const ref = useRef(null)
  const {user}=useSelector((state)=>{
    return state.auth
  })
    const navigate = useNavigate();
    const [Answer,SetAnswer]=useState([]);
    const [error,setError]=useState(false)
    
    const BasicRiskLogicArray=[] 
    const RiskLogic =(choice)=>{
        
        if(choice==="LowLow"  || choice==="MediumLow"){
          BasicRiskLogicArray.push("Low")
        }else if(choice==="LowMedium" || choice==="MediumMedium" || choice==="HighLow"){
          BasicRiskLogicArray.push('Medium')
        }else if(choice ==="LowHigh" || choice==="HighMedium"){
          BasicRiskLogicArray.push("High")
        }else if(choice==="MediumHigh" || choice==="HighHigh"){
          BasicRiskLogicArray.push("Critical")
        }
    }
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
  const Question = [
    {
      questiontitle: " Are you using a trusted ISP(Internet Service Provider)? ",
      choices: [
        { Q: "Yes", A:"LowLow"},
        { Q: "Maybe", A:"MediumMedium"},
        { Q: "No", A:"HighHigh"},
      ],
    },
    {
      questiontitle: "Have you implemented any Intrusion Detection and/or Intrusion Prevention Systems?",
      choices: [
        { Q: "Yes, both", A:"LowLow"},
        { Q: "Only one is in use", A:"MediumMedium"},
        { Q: "No, None", A:"HighMedium"},
      ],
    },
    {
      questiontitle: "Are you utilizing cloud-based services for your website?",
      choices: [
        { Q: "No, On premises", A:"LowLow"},
        { Q: "Yes, Cloud based", A:"HighMedium"},
        { Q: "Hybrid", A:"MediumMedium"},
      ],
    },
    {
      questiontitle: "Are important patches done and systems are updated?",
      choices: [
        { Q: "Yes, every month", A:"LowLow"},
        { Q: "No, never bother", A:"HighHigh"},
      ],
    },
    {
      questiontitle:
        "How often do you backup your website?",
      choices: [
        { Q: "Yes, regularly", A:"LowLow"},
        { Q: "Once in a week", A:"MediumMedium"},
        { Q: "Once in a month", A:"HighMedium"},
      ],
    },
    {
      questiontitle:
        "Are backups stored externally and secured?",
      choices: [
        { Q: "Yes, regularly", A:"LowLow"},
        { Q: "No, weekly", A:"HighMedium"},
        { Q: "No, monthly", A:"HighMedium"},
      ],
    },
    {
      questiontitle:
        " How often do you monitor network traffic and analyze security logs?",
      choices: [
        { Q: "Yes, regularly", A:"LowLow"},
        { Q: "No, weekly", A:"LowMedium"},
        { Q: "No, monthly", A:"MediumMedium"},
        { Q: "Do not monitor", A:"HighHigh"},
      ],
    },
  ];
  const handleSubmit=async(e)=>{
    e.preventDefault()
    
    
    const RiskValues=Object.values(Answer)
  
    RiskValues.map((value)=>{
        return RiskLogic(value);
    })
    console.log(RiskValues);
    
   const Answers={
    "Answers":BasicRiskLogicArray
   }
    const token =JSON.parse(localStorage.getItem('user'))
    const config={
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
    if(RiskValues.length===Question.length){
    const response=await axios.post("http://localhost:5000/api/user/postBasicAnswer",Answers,config)
    console.log(response.data);
    navigate('/Test2')
    }else{
      console.log(RiskValues.length);
      console.log(Question.length);
      setError(true)
    }
    
    
    

  }
  const handleClick=(question,Color)=>{
    const el2 = document.getElementById(question.questiontitle)
    el2.setAttribute('style',`background:${Color};`);
  }
  

  return (
    <> 
    {user?(
    <div className="QuestionContainer">
      <h1 className="centerText">BASIC QUESTION</h1>
      <br />
      <form onSubmit={handleSubmit} className="QuestionForm">
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
        <button type="submit">Submit</button>
        {error && <p style={{color:"red"}}>Please fill all the question</p>}
      </form>
     
    </div>):(
      <div>
        <h1> Please  <Link to='/Login'>LogIn</Link> </h1>
      </div>
    )}
    
     
  
    </>
  )
};

export default Question;
