import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./ForgotPassword.css"
import Sidebar from '../../../components/sideBar/Sidebar';
export default function ForgotPassword() {
    
    const navigate=useNavigate("")


    //useEffect hooks
    useEffect(()=>{
        getUserSignInData();
    },[])

           // userSignUpData
           const [userSignUpData, setUserSignUpData] = useState({ })

      
           //getUserSignInData
           const getUserSignInData = () => {
               const data = JSON.parse(localStorage.getItem("userSignUpData"))
               console.log("SignUp Data => ", data)
               setUserSignUpData(data)
            //   setUserSignUpStateData(data)
           }
       
            //userSignUpStateData
            const [userSignUpStateData, setUserSignUpStateData] = useState({
               password:"",
               cpassword:"",
            })
       
           //onChangePasswordhandler
           const onChangePasswordhandler = (e) => {
               setUserSignUpStateData({ ...userSignUpStateData, [e.target.name]: e.target.value })
           }
//errorsState
  const [errorsState, setErrorsState] = useState({})
// change Password Validation
  const changePasswordValidation = () => {
    const {  password, cpassword } = userSignUpStateData
    let isValid = true
    const newErrors = {}
    if (!password.trim()) {
      newErrors.password = "Password is Required !"
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = "Password should be at least 6 characters long";
      isValid = false;
    }
    if (!cpassword.trim()) {
      newErrors.cpassword = " Conform Password is Required !"
      isValid = false
    } else if (password !== cpassword) {
      newErrors.cpassword = "Password is Not Match"
      isValid = false
    }
    
    setErrorsState(newErrors)
    return isValid
  }
  
       //onChangePasswordSubmitHandler
       const onChangePasswordSubmitHandler = (e) => {
        const {  password, cpassword } = userSignUpStateData
           e.preventDefault();
           if (changePasswordValidation()) {
            userSignUpData.password=password
            userSignUpData.cpassword=cpassword
            localStorage.setItem("userSignUpData", JSON.stringify(userSignUpData))
            alert("Your Password is Save SuccessFully Done ")
 
            navigate("/login")            
           }
   
       }


  return (
    <section className='forgot-password'>
        <div className="container-fluid ">
           
                            <div className="row justify-content-center vh-100 align-items-center">
                <div className="col-md-8">
                    <h1 className=''>Forgot your password?</h1>
                    <p>Change your password in three easy steps. This helps to keep your new password secure</p>
                    <ol>
                        <li>Fill in your email address below.</li>
                            <li>We'll email you a temporary code.</li>
                            <li>Use the code to change your password on our secure website.</li>
                    </ol>
                    <section className='change-password mt-5'>
                                
                                <div className="container-fluid change-password-container bg-info p-md-5">
                                    <div className="row ">
                                        <div className="col-md-12">
                                            <h4><i className="fa-solid fa-lock"></i> Change Password</h4>

                                            <div className="row input-password-1 ">
                                                    <div className="col-md-6">
                                                        <label for="CurrentPassword" className="form-label">Current password</label>
                                                        <input type="password" className="form-control" defaultValue={userSignUpData.password} name='currentPassword' id="CurrentPassword" placeholder="Current password" />
                                                    </div>
                                                    <div className="col-md-6 mt-md-3">
                                                        <br />
                                                        <h5>Forgot Password</h5>
                                                    </div>
                                                </div>
                                                <form>
                                                <div className="row input-password-2">
                                                    <div className="col-md-6">
                                                        <label for="newPassword" className="form-label">NewPassword</label>
                                                        <input type="password" className="form-control" name='password' id="newPassword" placeholder="New Password" onChange={onChangePasswordhandler} />
                                                        {errorsState.password && <span className="text-danger">{errorsState.password}</span>}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label for="conformPassword" className="form-label">Conform Password</label>
                                                        <input type="password" className="form-control" name='cpassword' id="conformPassword" placeholder="Conform Password" onChange={onChangePasswordhandler} />
                                                        {errorsState.cpassword && <span className="text-danger">{errorsState.cpassword}</span>}
                                                    </div>
                                                </div>

                                                <div className="row justify-content-end">
                                                    <div className="col-md-8 mt-5">
                                                        <button type="reset" className="btn btn-secondary btn-lg" >Cencel</button>
                                                        <button type="button" className="btn btn-warning btn-lg ms-2" onClick={onChangePasswordSubmitHandler}>Saves Changes</button>
                                                    </div>
                                                </div>
                                                </form>

                                        </div>
                                    </div>
                                </div>

                            </section>
                </div>
            </div>
             
            
        </div>
    </section>
  )
}
