import React  from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  
  
} from "react-router-dom";
import LoginPage from './Pages/Login/LoginPage';
import WebsiteMainPage from './Pages/mainPage/websiteMainPage';
import SignUp from './Pages/SignUp/SignUp';
import Question from './Pages/Question/Question';
import DataSecurity from './Pages/Question/DataSecurity';
import DDOS from './Pages/Question/DDOS';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ResultInTable from "./Pages/ConductResult/ResultInTable";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './Component/Header';
import Result from './Pages/ConductResult/Result';
import JoinResult from './Pages/ConductResult/JoinResult';



function App() {
  return (
    <>
     <BrowserRouter>
  
      <Header></Header>
    <Routes>
      <Route path="/" element={<WebsiteMainPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path='/Test' element={<Question/>}></Route>
      <Route path='/Test2' element={<DataSecurity></DataSecurity>}></Route>
      <Route path='/Test3' element={<DDOS></DDOS>}></Route>
      <Route path='/JoinResult' element={<JoinResult></JoinResult>}></Route>
      <Route path='/Result' element={<Result></Result>}></Route>
      <Route path='/Table' element={<ResultInTable></ResultInTable>}></Route>
      
     
      
    </Routes>
   
  </BrowserRouter>
  <ToastContainer></ToastContainer>
 
  </>
   
);
}

export default App;
