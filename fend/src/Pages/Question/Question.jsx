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
      questiontitle: "Are backups done and encrypted?",
      choices: [
        { Q: "Yes, once a month", A:"LowLow"},
        { Q: "No, planning to do it", A:"MediumMedium"},
        { Q: "Yes, once a year", A:"LowMedium"},
      ],
    },
    {
      questiontitle: "Are backups stored externally and secured?",
      choices: [
        { Q: "Yes, once a month", A:"LowLow"},
        { Q: "No, planning to do it", A:"MediumHigh"},
        { Q: "Yes, once a year", A:"LowMedium"},
      ],
    },
    {
      questiontitle: "Are important patches done and systems are updated?",
      choices: [
        { Q: "Yes, once a month", A:"LowLow"},
        { Q: "No, planning to do it", A:"MediumLow"},
        { Q: "Yes, once a year", A:"LowLow"},
      ],
    },
    {
      questiontitle: "Do you have IDP and IPS implemented to monitor traffics?",
      choices: [
        { Q: "Yes, we have IDP and IPS active", A:"LowLow"},
        { Q: "No, we don't have both", A:"HighHigh"},
        { Q: "We only have IDP", A: "MediumMedium"},
      ],
    },
    {
      questiontitle:
        "Are suspected traffic on network reported and investigated?",
      choices: [
        { Q: "Yes, regularly", A:"LowLow"},
        { Q: "No, we don't report suspected traffic", A:"LowMedium"},
        { Q: "We sometimes report suspected", A:"LowMedium"},
      ],
    },
    {
      questiontitle:
        " Do you audit and analyse security and firewall logs regularly?",
      choices: [
        { Q: "Yes, regularly", A:"LowLow"},
        { Q: "No, we don't audit and analyze firewall logs", A:"HighMedium"},
        { Q: "We sometimes review firewall logs", A:"LowMedium"},
      ],
    },
    {
      questiontitle:
        " Are suspected traffic on network reported and investigated?",
      choices: [
        { Q: "Yes, regularly", A:"LowMedium"},
        { Q: "No, we don't report suspected traffic", A:"HighHigh"},
        { Q: "We sometimes report suspected", A:"MediumHigh"},
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
