import React, { useContext, useEffect, useState } from 'react'
import image from "../../assests/settings/02.jpg"
import "./Sidebar.css"
import { Link, useNavigate } from 'react-router-dom'
import { UserProduct } from '../../context/userProduct/UserProduct'
export default function Sidebar() {

    const { isAuthChange,setIsAuthChange } = useContext(UserProduct)

    //navigate
    const navigate=useNavigate("")
    //useerData state
    const [userData, setUserData] = useState({})

    //useEffect Hooks
    useEffect(() => {
        getUserDataHandler();
    }, [])


    //getUserDataHandler
    const getUserDataHandler = () => {
        const data = JSON.parse(localStorage.getItem("userData"))
        console.log("data => ", data)

        setUserData(data)

    }

    //logOutHandler
    const logOutHandler=()=>{
        setIsAuthChange(false)

        navigate("/login")
    }

    return (
        <>
            <section className='side-bar '>
                <div className="row  mt-md-5 ms-md-2">
                    <div className="col-md-12 mt-md-5">
                        <img src={image} alt="profile image" />

                        <h4 className='mt-md-5'>Acount</h4>
                        <ul className="nav flex-column">
                            <li className="nav-item ">
                                <Link className="nav-link active" aria-current="page" to={"/"}> <i className="fa-solid fa-user me-md-1"></i>Overview</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to={"/settings"}> <i className="fa-solid fa-gear me-md-1"></i>Settings</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/edit"}> <i className="fa-solid fa-pen-to-square me-md-1"></i> Editing</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/billings"}> <i className="fa-regular fa-money-bill-1"></i> Billings</Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link " aria-current="page" to={"/orders"}> <i className="fa-solid fa-cart-shopping me-md-1"></i> Oders</Link>
                            </li>
                            {
                                isAuthChange ? <>
                                    <li className="nav-item ">
                                        <button className="nav-link " aria-current="page" onClick={logOutHandler} > <i className="fa-solid fa-user me-md-1"></i> Logout </button>
                                    </li>
                                </> : <>
                                    <li className="nav-item ">
                                        <Link className="nav-link " aria-current="page" to={"/signUp"}> <i className="fa-solid fa-user me-md-1"></i>  Sign Up</Link>
                                    </li>
                                    <li className="nav-item ">
                                        <Link className="nav-link " aria-current="page" to={"/login"}>  <i className="fa-solid fa-lock me-md-1"></i> Login</Link>
                                    </li>
                                </>
                            }


                        </ul>


                    </div>
                </div>
            </section>
        </>
    )
}
