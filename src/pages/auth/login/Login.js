import React, { useEffect, useState,useContext } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { UserProduct } from '../../../context/userProduct/UserProduct'


export default function Login() {

  //isAuthChangeState distructure
  const {isAuthChange,setIsAuthChange}=useContext(UserProduct)
  //useNavigate
  const navigate=useNavigate("")
  const [userSignUpData, setUserSignUpData] = useState({})
  //getUserSignUpData

  const getUserSignUpData=async()=>{
    const data=await JSON.parse(localStorage.getItem("userSignUpData"))
    console.log("Data => ",data)

    setUserSignUpData(data)
    console.log("userData => ",userSignUpData)
  }

  //useEffect Hook
  useEffect(()=>{
    getUserSignUpData();
  },[])

    //userLogin state
    const [userloginData, setUserLoginData] = useState({
      email:"",
      password:"",
    })
    //chackedState
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
      setIsChecked(e.target.checked);
      console.log("checked value => ",isChecked)
    };

     //onChangeHandler
  const onChangeHandler=(e)=>{
    setUserLoginData({...userloginData,[e.target.name]:e.target.value})
  }

    //errorsState
    const [errorsState, setErrorsState] = useState({})

    //formValidation
    const formValidation = () => {
      const {email, password } = userloginData
      let isValid = true
      const newErrors = {}
      if (!email) {
        newErrors.email = "Email is Required !"
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = " Invalid Email ! ";
        isValid = false;
      }
      if (!password.trim()) {
        newErrors.password = "Password is Required !"
        isValid = false
      } else if (password.length < 6) {
        newErrors.password = "Password should be at least 6 characters long";
        isValid = false;
      }      
      if (userSignUpData.email===email) {
        if (userSignUpData.password!==password) {
          newErrors.password="InValid Password "
          isValid=false
        }
      }
      if (userSignUpData.email!==email) {
        newErrors.noFoundUser=" User is Not Found Please Register Here ! "
        isValid=false
      }
      if (isChecked===false) {
        newErrors.isChecked="Please Click to Check Box"
        isValid=false
      }

      setErrorsState(newErrors)
      return isValid
    }


  //onSubmitHandler
  const onSubmitHandler=(e)=>{
    
    e.preventDefault();
    if (formValidation()) {

      setIsAuthChange(true)
      alert("login SuccessFully Done")
  
      navigate("/")      
    }
  }

  return (
    <>
        <section className='login'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 ">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-md-10">
                  <h1>Sign in to Around</h1>
                  <p>Don't have an account yet?  <Link to={"/signUp"} className=' text-success'>Register here!</Link></p>
                  <form>
                  <div className="row mt-3">
                    <div className="col-12">
                    {errorsState.noFoundUser && <span className="text-danger">{errorsState.noFoundUser}</span>}
                    < input  type="email"  name='email'  className="form-control input " placeholder="Email" aria-label="email" onChange={onChangeHandler} />
                    {errorsState.email && <span className="text-danger">{errorsState.email}</span>}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12">
                      <input type="password" name='password' className="form-control input" placeholder="Conform Password" aria-label="Conform Password" onChange={onChangeHandler} />
                      {errorsState.password && <span className="text-danger">{errorsState.password}</span>}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck"  checked={isChecked} onChange={handleCheckboxChange}/>
                        
                        <label className="form-check-label" for="gridCheck">
                        Keep me signed in   <Link className='text-success ms-md-5' to={"/forgotPassword"}> Forgot Password </Link>
                        </label>
                      </div>
                      {errorsState.isChecked && <span className="text-danger">{errorsState.isChecked}</span>}
                    </div>
                  </div>

                  <div className="d-grid gap-2 mt-3">
                    <button className="btn btn-success" type="button" onClick={onSubmitHandler}>Sign In</button>
                  </div>
                  </form>
                  <h5 className=' mt-3 text-center'>Or sign in with your social account</h5>
                  <div className="row">
                    <div className="col-6">
                    <button type="button" className="btn btn-outline-danger btn-lg google">Google</button>
                    </div>
                    <div className="col-6">
                    <button type="button" className="btn btn-outline-primary btn-lg facebook">Facebook</button>
                    </div>
                  </div>
                  
                  <p className=' mt-3 text-center'>© All rights reserved. Made byCreatex Studio</p>
                
                </div>
              </div>
            </div>

          </div>
          <div className="col-md-6 login-bg-image">

          </div>
        </div>
      </div>
      </section>  
    </>
  )
}
