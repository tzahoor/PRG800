import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const DataSecurity = () => {

  
  const ref = useRef(null)
    const [Answer,SetAnswer]=useState([]);
    const [error,setError]=useState(false)
    const navigate = useNavigate()
    
    let DataSecurityRiskArray=[]
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
            DataSecurityRiskArray.push('Low')
        }else if(choice==="LowMedium"||choice==="MediumMedium"||choice==="HighLow"){
            DataSecurityRiskArray.push('Medium')
        }else if(choice ==="LowHigh"||choice==="HighMedium"){
            DataSecurityRiskArray.push("High")
        }else if(choice==="MediumHigh"||choice==="HighHigh"){
            DataSecurityRiskArray.push("Critical")
        }
    }
  const Question = [
    {
      questiontitle: "Do you manage and control personnel access to sensitive data, systems, and facilities?",
      choices: [
        { Q: "Yes", A: "LowLow" },
        { Q: "No", A: "HighMedium" },
        { Q: "Maybe", A: "MediumLow" },
      ],
    },
    {
      questiontitle: "Do you have proper process for authorizing, establishing, and modifying access to sensitive data?",
      choices: [
        { Q: "Yes", A: "LowLow" },
        { Q: "No", A: "HighMedium" },
        { Q: "Maybe", A: "MediumMedium" },
      ],
    },
    {
      questiontitle: "Do you ensure all your workforce members have appropriate access to sensitive data, systems,and server?",
      choices: [
        { Q: "Yes", A: "LowLow" },
        { Q: "No", A: "HighLow" },
        { Q: "Partially", A: "MediumLow" },
      ],
    },
    {
      questiontitle: "Users have more access rights than needed to complete daily tasks",
      choices: [
        { Q: "Yes", A: "HighHigh" },
        { Q: "No", A: "LowLow" },
        { Q: "Partially", A: "MediumHigh" },
      ],
    },
    {
      questiontitle:
        "Do you use encryption to control access to sensitive data?",
      choices: [
        { Q: "Yes", A: "HighMedium" },
        { Q: "No", A: "LowLow" },
        { Q: "Only some sensitive data is encrypted", A: "MediumMedium" },
      ],
    },
    {
      questiontitle:
        " Is Information system access granted to unauthorized personnel?",
      choices: [
        { Q: "Yes", A: "HighHigh" },
        { Q: "No", A: "LowLow" },
        { Q: "Sometime, when there is a review", A: "MediumHigh" },
      ],
    },
    {
      questiontitle:
        " Do you disclose passwords and or login information to third party?",
      choices: [
        { Q: "Yes", A: "HighMedium" },
        { Q: "No", A: "LowLow" },
        { Q: "In some cases", A: "MediumMedium" },
      ],
    },
    {
      questiontitle:
        "Do you use security settings and mechanisms to record and examine system activity?",
      choices: [
        { Q: "Yes, we do it regularly", A: "HighMedium" },
        { Q: "No", A: "LowHigh" },
        { Q: "Yes, we do it sometimes", A: "MediumHigh" },
      ],
    },
    {
        questiontitle:
          "Is virus detection and elimination software installed and activated?",
        choices: [
          { Q: "Yes, always", A: "LowMedium" },
          { Q: "No", A: "MediumHigh" },
          { Q: "Yes, we do it occassionally", A: "MediumMedium" },
        ],
      },
      {
        questiontitle:
          "Is penetration testing performed on the system",
        choices: [
          { Q: "Yes, regularly", A: "LowHigh" },
          { Q: "No, we don't perform any pen testing", A: "HighHigh" },
          { Q: "We do pen testing once a year", A: "MediumHigh" },
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
      "Answers":DataSecurityRiskArray
     }
      const token =JSON.parse(localStorage.getItem('user'))
      const config={
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
      if(RiskValues.length===Question.length){
      const response=await axios.post("http://localhost:5000/api/user/postDataSecurityAnswer",Answers,config)
      console.log(response.data);
      navigate('/Test3')}
      else{
        setError(true)
      }

     }
     const handleClick=(question,Color)=>{
      const el2 = document.getElementById(question.questiontitle)
      el2.setAttribute('style',`background:${Color};`);
    }

 

//  console.log('state:' + state );
  return (
    <div className="QuestionContainer">
     
      <h1  className="centerText">DataSecurity QUESTION</h1>
    
      <br />   
      <form onSubmit={handleSubmit} className="QuestionForm">
        {Question.map((question, i) => {
          // eslint-disable-next-line array-callback-return
          return (
           <div  key={i} >
            <div >
            <h3 name={question.questiontitle} ref={ref}  id={question.questiontitle}  >
                {question.questiontitle}
                
            </h3>
           
          
            </div>
           
            <div className="questionSpacing">
            {
                question.choices.map((choice,i)=>{
                    return (
                        <div  key={i}>
                            <label className="singleChoiceMargin" >
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
                                      })
                                      )
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
};

export default DataSecurity
