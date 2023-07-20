import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import OverView from '../pages/overView/OverView';
import SignUp from '../pages/auth/signUp/SignUp';
import Login from '../pages/auth/login/Login';
import Settings from '../pages/settings/Settings';
import Edit from '../pages/edit/Edit';
import ForgotPassword from '../pages/auth/forgotPassword/ForgotPassword';
import Orders from '../pages/orders/Orders';
import Billings from '../pages/billings/Billings';
import Navbar from '../components/navbar/Navbar';
//import UserAdd from '../pages/userAdd/UserAdd';


export default function Routing() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
       
        <Route path='/' element={<OverView/>} />
        <Route path='/signUp' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/settings' element={<Settings/>} />
        <Route path='/edit' element={<Edit/>} />
        <Route path='/forgotPassword' element={<ForgotPassword/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/billings' element={<Billings/>} />
  
  
    </Routes>
    </BrowserRouter>    
    </>
  )
}
