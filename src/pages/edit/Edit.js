import React, { useContext, useEffect, useState } from 'react'
import "./Edit.css"
import { useNavigate, Link } from 'react-router-dom'
import Sidebar from '../../components/sideBar/Sidebar'
import { UserProduct } from '../../context/userProduct/UserProduct'
export default function Edit() {

    const { isAuthChange } = useContext(UserProduct)
    const navigate = useNavigate("")
    //input defualte Value  state
    const [inputDefaultVal, setInputDefaultVal] = useState({
        fname: "",
        lname: "",
        email: "",
        phoneNo: "",
        country: "",
        language: "",
        timeZone: "",
        currency: "",
        bio: "",
        gender: "",
        communicationEmail: false,
        communicationPhone: false
    })

    //userState Data
    const [userStateData, setUserStateData] = useState({

    })

    //useEffect Hooks
    useEffect(() => {
        getUserData();
        getUserSignInData();
    }, [])

    //getUserDataHandler
    const getUserData = () => {
        const data = JSON.parse(localStorage.getItem("userData"))
        console.log("userData => ", data)

        setInputDefaultVal(data)
        setUserStateData(data)

    }

    //onChangeHandler
    const onChangeHandler = (e) => {
        setUserStateData({ ...userStateData, [e.target.name]: e.target.value })


    }

          //errorsState
  const [errorsState, setErrorsState] = useState({})

  //formValidation
  const formValidation = () => {
    const {fname, lname, email,phoneNo,country,language,timeZone,currency,bio,gender,communicationEmail,communicationPhone } = userStateData
    let isValid = true
    const newErrors = {}
    if (!fname.trim()) {
      newErrors.fname = " First Name is Required !"
      isValid = false
    }
    if (!lname.trim()) {
        newErrors.lname = " Last Name is Required !"
        isValid = false
      }
    if (!email.trim()) {
      newErrors.email = "Email is Required !"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    if (!phoneNo.trim()) {
        newErrors.phoneNo = " Phone No is Required !"
        isValid = false
      }
      if (!country.trim()) {
        newErrors.country = " Country is Required !"
        isValid = false
      }
      if (!language.trim()) {
        newErrors.language = " Language is Required !"
        isValid = false
      }
      if (!timeZone.trim()) {
        newErrors.timeZone = " TimeZone is Required !"
        isValid = false
      }
      if (!currency.trim()) {
        newErrors.currency = " Currency is Required !"
        isValid = false
      }
      if (!bio.trim()) {
        newErrors.bio = " BIO is Required !"
        isValid = false
      }
      if (!gender.trim()) {
        newErrors.gender = " Gender is Required !"
        isValid = false
      }
    
    setErrorsState(newErrors)
    return isValid
  }

    //onSubmitHandler
    const onSubmitHandler = (e) => {
        const {fname, lname, email,phoneNo,bio } = userStateData
        e.preventDefault();
        if (formValidation()) {

            userStateData.fname = fname.trim().toLowerCase();
            userStateData.lname = lname.trim().toLowerCase();
            userStateData.email = email.trim()
            userStateData.phoneNo = phoneNo.trim()
            userStateData.bio = bio.trim()
            console.log("userState => ",userStateData)
                //store userData to local storage
                localStorage.setItem("userData", JSON.stringify(userStateData))
                alert("Sava Data SuccessFully Done !")
                navigate("/")     
        }
    }
    //isEmail check State
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    //isPhone check State
    const [isPhoneChecked, setIsPhoneChecked] = useState(false);
    //handle email change
    const handleEmailChange = () => {
        setIsEmailChecked(!isEmailChecked);
        console.log("emailchange => ", !isEmailChecked)
        userStateData.communicationEmail = !isEmailChecked

    };
    //handlePhoneChange
    const handlePhoneChange = () => {
        setIsPhoneChecked(!isPhoneChecked);
        console.log("phonechange => ", !isPhoneChecked)
        userStateData.communicationPhone = !isPhoneChecked
    };

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

    //check delete State
    const [isCheckDelete, setIsCheckDelete] = useState(false)

    //checkDeleteHandler
    const checkDeleteHandler = () => {
        setIsCheckDelete(!isCheckDelete)
    }
    //deleteAccountHnadler
    const deleteAccountHnadler = () => {
        if (isCheckDelete===true) {
            localStorage.removeItem("userData")
    
            alert("Delete Acount SuccessFully Done!")
            navigate("/")
           }
    }

    return (
        <>
            <section className='section-setting'>
                <div className="container-fluid">
                    {
                        isAuthChange ? <>

                            <div className="row ">
                                <div className="col-md-4">
                                    {
                                        !inputDefaultVal ? <>  </> : <Sidebar />
                                    }
                                </div>

                                {
                                    !inputDefaultVal ? <>
                                        <div className="container-fluid vh-100 ">
                                            <div className="row justify-content-center  ">
                                                <div className="col-md-9">
                                                    <div className="alert alert-danger" role="alert">
                                                        Your Account is Delete Create Account <Link to={"/settings"} className="alert-link">Create A Account</Link>. Give it a click if you like.
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </> : <>
                                        <div className="col-md-8 ">
                                            <h1 className='mt-md-5'>Edit</h1>
                                            <section className='form'>
                                                <div className="container-fluid">
                                                    <div className="row bg-light right-side">
                                                        <div className="col-md-12 p-md-5">
                                                            <h4> <i className="fa-solid fa-user"></i> Basic Info</h4>
                                                            <form>

                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <label for="FirstName" className="form-label">First Name</label>
                                                                        <input type="text" className="form-control" defaultValue={inputDefaultVal.fname} name='fname' id="FirstName" placeholder="Isabella" onChange={onChangeHandler} />
                                                                        {errorsState.fname && <span className="text-danger">{errorsState.fname}</span>}

                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label for="LastName" className="form-label">LastName</label>
                                                                        <input type="text" className="form-control" defaultValue={inputDefaultVal.lname} name='lname' id="LastName" placeholder="Bocouse" onChange={onChangeHandler} />
                                                                        {errorsState.lname && <span className="text-danger">{errorsState.lname}</span>}
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <label for="inputEmail4" className="form-label">Email</label>
                                                                        <input type="email" className="form-control" defaultValue={inputDefaultVal.email} name='email' id="inputEmail4" placeholder="bocouse@example.com" onChange={onChangeHandler} />
                                                                        {errorsState.email && <span className="text-danger">{errorsState.email}</span>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label for="phone" className="form-label">Phone(optional)</label>
                                                                        <input type="number" className="form-control" defaultValue={inputDefaultVal.phoneNo} name='phoneNo' id="phone" placeholder='+1' onChange={onChangeHandler} />
                                                                        {errorsState.phoneNo && <span className="text-danger">{errorsState.phoneNo}</span>}
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <label for="inputCountry" className="form-label">Country</label>
                                                                        <select id="inputCountry" className="form-select" name='country' onChange={onChangeHandler}>
                                                                            <option selected >{inputDefaultVal.country}</option>
                                                                            <option value={"Pakistan"}>Pakistan</option>
                                                                            <option value={"Canada"}>Canada</option>
                                                                            <option value={"Dennmark"}>Denmark</option>
                                                                            <option value={"England"} >England</option>
                                                                            <option value={"China"}>China</option>
                                                                        </select>
                                                                        {errorsState.country && <span className="text-danger">{errorsState.country}</span>}
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label for="inputLanguage" className="form-label">Language</label>
                                                                        <select id="inputLanguage" className="form-select" name='language' onChange={onChangeHandler}>
                                                                            <option selected>{inputDefaultVal.language}</option>
                                                                            <option value={"Urdu"}>urdu</option>
                                                                            <option value={"English"}>English</option>
                                                                            <option value={"Polish"}>Polish</option>
                                                                            <option value={"Hindi"}>Hindi</option>
                                                                            <option value={"Chinise"}>Chinise</option>
                                                                        </select>
                                                                        {errorsState.language && <span className="text-danger">{errorsState.language}</span>}
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <label for="inputTimeZone" className="form-label">Time Zone</label>
                                                                        <select id="inputTimeZone" className="form-select" name='timeZone' onChange={onChangeHandler}>
                                                                            <option selected>{inputDefaultVal.timeZone}</option>
                                                                            <option value={"Atlantic Standard Time (AST)"}>Atlantic Standard Time (AST)</option>
                                                                            <option value={"Eastern Standard Time (EST)"}> Eastern Standard Time (EST)</option>
                                                                            <option value={"Central Standard Time (CST)"}>Central Standard Time (CST)</option>
                                                                            <option value={"Mountain Standard Time (MST)"}>Mountain Standard Time (MST)</option>
                                                                            <option value={"Pasific Standard Time (PST)"}>Pasific Standard Time (PST)</option>
                                                                            <option value={"Alaskan Standard Time (AKST)"}> Alaskan Standard Time (AKST)</option>
                                                                            <option value={"Hawaui Standard Time (HST)"}>Hawaui Standard Time (HST)</option>
                                                                        </select>
                                                                        {errorsState.timeZone && <span className="text-danger">{errorsState.timeZone}</span>}

                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <label for="inputCurrency" className="form-label">Currency</label>
                                                                        <select id="inputCurrency" className="form-select" name='currency' onChange={onChangeHandler}>
                                                                            <option selected>{inputDefaultVal.currency}</option>
                                                                            <option value={"$USD"}>$ USD</option>
                                                                            <option value={"€EUR"}>€ EUR</option>
                                                                            <option value={"£UKP"}>£ UKP</option>
                                                                            <option value={"¥JPY"}>¥ JPY</option>

                                                                        </select>
                                                                        {errorsState.currency && <span className="text-danger">{errorsState.currency}</span>}
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <label for="exampleFormControlTextarea1" className="form-label">Bio</label>
                                                                        <textarea class="form-control" defaultValue={inputDefaultVal.bio} name='bio' id="exampleFormControlTextarea1" rows="3" placeholder="Add Bio..." onChange={onChangeHandler}></textarea>
                                                                        {errorsState.bio && <span className="text-danger">{errorsState.bio}</span>}
                                                                    </div>

                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <span>Gender</span>
                                                                        <input className="form-check-input ms-5" type="radio" name="gender" id="gridRadios1" value={"Male"} checked={userStateData.gender == "Male"} onChange={onChangeHandler} />
                                                                        <label className="form-check-label " for="gridRadios1">
                                                                            Male
                                                                        </label>
                                                                        <input className="form-check-input ms-5" type="radio" name="gender" id="gridRadios2" value={"Female"} checked={userStateData.gender == "Female"} onChange={onChangeHandler} />
                                                                        <label className="form-check-label" for="gridRadios2">
                                                                            FeMale
                                                                        </label>
                                                                        <input className="form-check-input ms-5" type="radio" name="gender" id="gridRadios3" value={"Other"} checked={userStateData.gender == "Other"} onChange={onChangeHandler} />
                                                                        <label className="form-check-label" for="gridRadios3">
                                                                            Other
                                                                        </label>
                                                                        {errorsState.gender && <span className="text-danger">{errorsState.gender}</span>}
                                                                    </div>

                                                                    <div className="col-md-12">
                                                                        <span>Communication:</span>
                                                                        <input className="form-check-input ms-4" type="checkbox" id="gridCheck1" checked={isEmailChecked} onChange={handleEmailChange} />
                                                                        <label className="form-check-label" for="gridCheck1">
                                                                            Email
                                                                        </label>
                                                                        <input className="form-check-input ms-4" type="checkbox" id="gridCheck2" checked={isPhoneChecked} onChange={handlePhoneChange} />
                                                                        <label className="form-check-label" for="gridCheck2">
                                                                            Phone
                                                                        </label>
                                                                    </div>

                                                                </div>

                                                                <div className="row justify-content-end">
                                                                    <div className="col-md-8 mt-5">
                                                                        <button type="button" className="btn btn-secondary btn-lg" >Cencel</button>
                                                                        <button type="button" className="btn btn-success btn-lg ms-2" onClick={onSubmitHandler}>Saves Changes</button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            <section className='change-password mt-5'>

                                                <div className="container-fluid change-password-container bg-light p-5">
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
                                                                    <h6> <Link to={"/forgotPassword"} className='text-success'> Forgot Password </Link></h6>
                                                                </div>
                                                            </div>
                                                            <form>
                                                                <div className="row input-password-2">
                                                                    <div className="col-md-6">
                                                                        <label for="newPassword" className="form-label">New Password</label>
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
                                                                        <button type="button" className="btn btn-success btn-lg ms-2" onClick={onChangePasswordSubmitHandler}>Saves Changes</button>
                                                                    </div>
                                                                </div>
                                                            </form>

                                                        </div>
                                                    </div>
                                                </div>

                                            </section>

                                            <section className='notification mt-5'>
                                                <div className="container-fluid bg-light togal p-5 ">
                                                    <div className="row">
                                                        <h2>NotiFication</h2>
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" id="Product-sold-notifications" />
                                                            <label className="form-check-label" for="Product-sold-notifications"> <h4> Product sold notifications </h4>
                                                                <p>Send an email when someone purchased one of my products</p>
                                                            </label>
                                                        </div>

                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" id="Product-update-notifications" />
                                                            <label className="form-check-label" for="Product-update-notifications">
                                                                <h4>Product update notifications</h4>
                                                                <p>Send an email when a product I've purchased is updated</p>
                                                            </label>
                                                        </div>

                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" id="Product-comment-notifications" />
                                                            <label className="form-check-label" for="Product-comment-notifications">
                                                                <h4>Product comment notifications</h4>
                                                                <p>Send an email when someone comments on one of my products</p>
                                                            </label>
                                                        </div>

                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" id="Product-review-notifications" />
                                                            <label className="form-check-label" for="Product-review-notifications">
                                                                <h4>Product review notifications</h4>
                                                                <p>Send an email when someone leaves a review with his/her rating</p>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" id="Daily-summary-emails" disabled />
                                                            <label className="form-check-label" for="Daily-summary-emails">
                                                                <h4>Daily summary emails</h4>
                                                                <p>Send an email when someone leaves a review with his/her rating</p>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            <section className='delete-account-section mt-5'>
                                                <div className="container-fluid bg-light p-5 delete-account">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <h2><i className="fa-solid fa-trash"></i> Delete Account</h2>
                                                        </div>

                                                    </div>

                                                    <div className="row justify-content-center">
                                                        <div className="col-md-10">
                                                            <div className="alert alert-warning" role="alert">
                                                                When you delete your account, your public profile will be deactivated immediately. If you change your mind before the 14 days are up, sign in with your email and password, and we'll send a link to reactivate account. Learn more
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div class="form-check">
                                                        <input className="form-check-input" type="checkbox" checked={isCheckDelete} id="flexCheckDefault" onChange={checkDeleteHandler} />
                                                        <label className="form-check-label" for="flexCheckDefault" >
                                                            Yes, I want to delete my account
                                                        </label>
                                                    </div>
                                                    {isCheckDelete ? <> </> : <p className='text-danger'>Please Click On Check Box</p> }

                                                    <div className="row justify-content-end">
                                                        <div className="col-md-4">
                                                            <button type="button" className="btn btn-danger" onClick={deleteAccountHnadler}>Delete Account</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </>
                                }

                            </div>

                        </> : <>
                            <div className="row vh-100 align-items-center ">
                                <div className="col-md-4">
                                    <Sidebar />
                                </div>
                                <div className="col-md-8">
                                    <h1 className=' text-danger' >User is Not Login <Link className='btn btn-outline-success' to={"/login"} >Click to Login </Link> </h1>
                                </div>
                            </div>
                        </>
                    }

                </div>
            </section>
        </>
    )
}
