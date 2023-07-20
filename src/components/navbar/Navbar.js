import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css";
import { UserProduct } from '../../context/userProduct/UserProduct';
export default function Navbar() {

  const { isAuthChange, setIsAuthChange } = useContext(UserProduct)

  const navigate = useNavigate("")
  //logOutHandler
  const logOutHandler = () => {
    setIsAuthChange(false)

    navigate("/login")
  }
  return (
    <>
      <div className="container-fluid navbar-bg">
        <div className="row justify-content-center">
          <div className="col-md-6">

            <nav className="navbar navbar-expand-lg  ">
              <div className="container-fluid ">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0  justify-content-center">
                    <li className="nav-item">
                      <Link className="nav-link  " aria-current="page" to={"/"}>Overview</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link " aria-current="page" to={"/settings"}>Settings</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link " aria-current="page" to={"/edit"}>Editing</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link  " aria-current="page" to={"/orders"}>Orders</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link  " aria-current="page" to={"/billings"}>Billings</Link>
                    </li>
                  
                    {
                      isAuthChange ? <>
                        <li className="nav-item">
                          <button className="nav-link" onClick={logOutHandler} >Logout</button>
                        </li>
                      </> : <>
                        <li className="nav-item">
                          <Link className="nav-link" to={"/signUp"}>SignUp</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to={"/login"}>Login</Link>
                        </li>
                      </>
                    }

                  </ul>

                </div>
              </div>
            </nav>

          </div>
        </div>
      </div>

    </>
  )
}
