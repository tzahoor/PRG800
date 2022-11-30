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
      questiontitle: "Do you install patches and plugins from reputable and legitimate sources?",
      choices: [
        { Q: "Yes, always", A: "LowLow" },
        { Q: "Mostly", A: "MediumMedium" },
        { Q: "A few times", A: "HighMedium" },
        { Q: "Never", A: "HighHigh" },
      ],
    },
    {
      questiontitle: "Have you created a team dedicated for security issues?",
      choices: [
        { Q: "Yes, we have an in-house team ", A: "LowLow" },
        { Q: "No, we have a third party providing support", A: "MediumMedium" },
        { Q: "No, don't plan to have one", A: "HighHigh" },
      ],
    },
    {
      questiontitle: "Do you have a antivirus software in place?",
      choices: [
        { Q: "Yes", A: "LowLow" },
        { Q: "No", A: "HighHigh" },
      ],
    },
    {
      questiontitle: "Have you ever considered IP Geo blocking?",
      choices: [
        { Q: "Yes, blocked a few geo-locations", A: "LowLow" },
        { Q: "No", A: "HighHigh" },
        { Q: "Partially", A: "MediumMedium" },
      ],
    },
    {
      questiontitle:
        "Do you perform security testing?",
      choices: [
        { Q: "Yes, regularly", A: "LowLow" },
        { Q: "No", A: "HighHigh" },
        { Q: "Yes, once a year", A: "MediumMedium" },
      ],
    },
    {
      questiontitle:
        "Do you employ encyption, decryption and digital signatures and certificates for sensitive information? ",
      choices: [
        { Q: "Yes", A: "LowLow" },
        { Q: "No", A: "HighHigh" },
        { Q: "Only some sensitive data is encrypted", A: "MediumMedium" },
      ],
    },
    {
      questiontitle:
        " Do you follow RBAC (Role Based Access Control) assigning permissions to employees based on their roles?",
      choices: [
        { Q: "Yes", A: "LowLow" },
        { Q: "No", A: "MediumMedium" },
        { Q: "Partially", A: "MediumMedium" },
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
