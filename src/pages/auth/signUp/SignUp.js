import React, { useState } from 'react'
import "./SignUp.css";
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  //state
  const [userSignUpData, setUserSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  })
  //useNavigate
  const navigate = useNavigate("")

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    console.log("checked value => ", isChecked)
  };


  //onChangeHandler
  const onChangeHandler = (e) => {
    setUserSignUpData({ ...userSignUpData, [e.target.name]: e.target.value })
  }

  //errorsState
  const [errorsState, setErrorsState] = useState({})

  //formValidation
  const formValidation = () => {
    const { name, email, password, cpassword } = userSignUpData
    let isValid = true
    const newErrors = {}
    if (!name.trim()) {
      newErrors.name = "Name is Required !"
      isValid = false
    }
    if (!email.trim()) {
      newErrors.email = "Email is Required !"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
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
    if (isChecked===false) {
      newErrors.isChecked=" Click on Check Box "
      isValid=false
    }
    setErrorsState(newErrors)
    return isValid
  }

  //onSubmitHandler
  const onSubmitHandler = (e) => {
    const { name, email} = userSignUpData
    e.preventDefault();

    if (formValidation()) {
      //user signUp data store in localStorage
      userSignUpData.name=name.trim().toLowerCase()
      userSignUpData.email=email.trim()
      localStorage.setItem("userSignUpData", JSON.stringify(userSignUpData))

      console.log("signUp Data => ", userSignUpData)
      alert("Sign up SuccessFully Don !")
      navigate("/login")

    }
  }


  return (
    <>
      <section className='signUp'>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 ">
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <h1>No account?  Sign up</h1>
                    <p>Have an account already? <Link className=' text-success' to={"/login"}> Sign in here!</Link></p>

                    <form>
                      <div className="row">
                        <div className="col">
                          <input type="text" name='name' className="form-control input" placeholder="Your name" aria-label="Your Name " onChange={onChangeHandler} />
                          {errorsState.name && <span className="text-danger">{errorsState.name}</span>}
                        </div>
                        <div className="col">
                          <input type="email" name='email' className="form-control input" placeholder="Email" aria-label="Email" onChange={onChangeHandler} />
                          {errorsState.email && <span className="text-danger">{errorsState.email}</span>}

                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-12">
                          <input type="password" name='password' className="form-control input" placeholder="Password" aria-label="Password" onChange={onChangeHandler} />
                          {errorsState.password && <span className="text-danger">{errorsState.password}</span>}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-12">
                          <input type="password" name='cpassword' className="form-control input" placeholder="Conform Password" aria-label="Conform Password" onChange={onChangeHandler} />
                          {errorsState.cpassword && <span className="text-danger">{errorsState.cpassword}</span>}
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-12">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck" checked={isChecked} onChange={handleCheckboxChange} />
                            <label className="form-check-label" for="gridCheck">
                              I agree to Terms & Conditions
                            </label>
                          </div>
                          {errorsState.isChecked && <span className="text-danger">{errorsState.isChecked}</span>}
                        </div>
                      </div>

                      <div className="d-grid gap-2 mt-3">
                        <button className="btn btn-success" type="button" onClick={onSubmitHandler}>SignUp</button>
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

            <div className="col-md-6 signUp-bg-image">

            </div>
          </div>
        </div>
      </section>
    </>
  )
}
