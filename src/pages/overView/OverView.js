import React, { useContext, useEffect, useState } from 'react'
import "./OverView.css"
import image from "../../assests/settings/02.jpg"
import { Link } from 'react-router-dom'
import Sidebar from '../../components/sideBar/Sidebar'
import { UserProduct } from '../../context/userProduct/UserProduct'
import { PaymentCard } from '../../context/paymentCard/PaymentCard'


export default function OverView() {

  const { paymentCard, userAdress } = useContext(PaymentCard)
  const lastIndex = userAdress.length - 1;
  const lastValue = userAdress[lastIndex];
  console.log("lastVlue ", lastValue)
  console.log("paymentCard => ", paymentCard)

  const paymentIndex = paymentCard.length - 1
  console.log("payment Idex => ", paymentIndex)
  const paymentValue = paymentCard[paymentIndex]

  console.log("paymentVlaue => ", paymentValue)
  console.log("user adress => ", userAdress)


  const { userProduct, setUserProduct, isAuthChange } = useContext(UserProduct)
  console.log("awais=> ", userProduct)
  //useerData state
  const [userData, setUserData] = useState({})

  //useEffect Hooks
  useEffect(() => {
    getUserDataHandler();
    // getUserproductData();
  }, [])


  //getUserDataHandler
  const getUserDataHandler = () => {
    const data = JSON.parse(localStorage.getItem("userData"))
    console.log("data => ", data)

    setUserData(data)

  }

  //onUserProductDeleteHandler
  const onUserProductDeleteHandler = (id) => {
    let newData = userProduct.filter((items, index) => {
      return index !== id
    })
    setUserProduct(newData)
  }

  return (
    <>

      <section className='over-view '>
        <div className="container-fluid h-100">
          {
            isAuthChange ? <>

              <div className="row">
                <div className="col-md-4 ">
                  {
                    !userData ? <>  </> : <Sidebar />
                  }

                </div>
                {
                  !userData ? <>
                    <div className="container-fluid vh-100">
                      <div className="row justify-content-center  ">
                        <div className="col-md-8">
                          <div className="alert alert-danger" role="alert">
                            Your Account is Delete Create Account <Link to={"/settings"} className="alert-link">Create A Account</Link>. Give it a click if you like.
                          </div>
                        </div>
                      </div>
                    </div>
                  </> : <>

                    <div className="col-md-8">
                      <h1 className='mt-5'>Overview</h1>

                      <div className="container-fluid">
                        <div className="row bg-light right-side">
                          <div className="col-md-12 p-md-5">

                            <div className="row justify-content-between basic-info">
                              <div className="col-md-4">
                                <h4> <i className="fa-solid fa-user"></i> Basic Info</h4>
                              </div>


                              <div className="col-md-4">
                                <Link type='button' className='btn btn-secondary' to={"/edit"}><i className="fa-solid fa-pen-to-square"></i>Edit info</Link>

                              </div>
                            </div>

                            <div className="row profile-photo mt-md-4 ">
                              <div className="col-md-2 ">
                                <img src={image} alt="profile-Photo" />

                              </div>
                              <div className="col-md-12">
                                <h2>{userData.fname} {userData.lname}</h2>
                                <h6><i className="fa-solid fa-envelope me-1"></i>{userData.email} <span className='ms-1'><i className="fa-solid fa-location-dot me-1"></i>{userData.country}</span></h6>

                              </div>
                            </div>

                            <div className="row user-text mt-5">
                              <div className="col-md-2">
                                <h4>Phone</h4>
                                <h4>Language</h4>
                                <h4>Gender</h4>
                                <h4>Communication</h4>
                              </div>
                              <div className="col-md-6  ms-5">
                                <h4 className='ms-5'>{userData.phoneNo}</h4>
                                <h4 className='ms-5'>{userData.language}</h4>
                                <h4 className='ms-5'>{userData.gender}</h4>
                                <h4 className='ms-5'>{userData.communicationPhone ? <>Mobile,</> : <></>} <span>{userData.communicationEmail ? <>Email</> : <></>}</span> </h4>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>

                      {/*Adress*/}
                      <div className="row mt-md-5 orders bg-light p-md-5">
                        <div className="col-md-6">

                          <h4> <i className="fa-solid fa-location-dot"></i> Adress</h4>

                          <div className="card w-100 overflow-auto">
                            <div className="card-body">
                              {/*shiping adress and pyment*/}
                              <div className="row">
                                <div className="col-md-8">
                                  <h5 className="card-title">Shiping Adress</h5>
                                </div>
                                <div className="col-md-3">
                                  <Link className='btn btn-outline-info' to={"/edit"} >Edit</Link>
                                </div>
                              </div>

                              {
                                !userData ? <>
                                  <h4 className='text-danger'> No User Adress  </h4>
                                  <Link className='btn btn-outline-info' to={"/settings"} > Add Adress </Link>
                                </> :
                                  <>
                                    <p className="card-text"> Countery : {userData.country} <br />
                                      TimeZone : {userData.timeZone} <br />
                                      {userData.bio}

                                    </p>
                                  </>
                              }

                            </div>
                          </div>

                          {
                            !lastValue ? <>
                              <h4>No Billings Adress Add</h4>
                              <Link className='btn btn-outline-info' to={"/billings"} > Click Billings adress </Link>
                            </> : <>
                              <div className="card w-100 mt-2 overflow-auto">
                                <div className="card-body">
                                  {/*bilings adress and pyment*/}
                                  <div className="row">
                                    <div className="col-md-8">
                                      <h5 className="card-title">Billing Adresss</h5>
                                    </div>
                                    <div className="col-md-4">
                                      <Link className='btn btn-outline-info' to={"/billings"} >Edit</Link>
                                    </div>
                                  </div>


                                  <table className="table table-responsive">
                                    <tbody>
                                      <tr>
                                        <th scope="row">Country</th>
                                        <td>{lastValue.country}</td>
                                      </tr>
                                      <tr>
                                        <th scope='row'>City</th>
                                        <td>{lastValue.city}</td>

                                      </tr>
                                      <tr>
                                        <th scope='row'>State</th>
                                        <td> {lastValue.state}</td>

                                      </tr>
                                      <tr>
                                        <th scope='row'>Adress 1</th>
                                        <td>{lastValue.adress1}</td>
                                      </tr>
                                      <tr>
                                        <th scope='row'>Adress 2</th>
                                        <td>{lastValue.adress2}</td>
                                      </tr>
                                      <tr>
                                        <th scope='row'>Post Code</th>
                                        <td>{lastValue.postCode}</td>
                                      </tr>

                                    </tbody>
                                  </table>


                                </div>
                              </div>
                            </>
                          }
                        </div>

                        <div className="col-md-6">
                          {/*  payment Card   */}
                          <h4> <i className="fa-regular fa-money-bill-1"></i> Billings</h4>


                          {!paymentValue ? <>
                            <h4 className='text-center'>No Billings Data Add</h4>
                            <Link className='btn btn-outline-info' to={"/billings"} > Click Billings Cards </Link>
                          </> : <>
                            <div className="card w-100 overflow-auto">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-md-8">
                                    <h5 className="card-title">Billing Card</h5>
                                  </div>
                                  <div className="col-md-4">
                                    <Link className='btn btn-outline-info' to={"/billings"} >Edit</Link>
                                  </div>
                                </div>
                                <h5 className="card-title text-success"> {/* {userData.fname} */}</h5>


                                <table className="table table-responsive">
                                  <tbody>
                                    <tr>
                                      <th scope="row">Name</th>
                                      <td>{paymentValue.nameOnCard}</td>
                                    </tr>
                                    <tr>
                                      <th scope='row'>Card Number</th>
                                      <td>{paymentValue.cardNumber}</td>

                                    </tr>
                                    <tr>
                                      <th scope='row'> Expiry Date</th>
                                      <td> {paymentValue.expirationDate}</td>

                                    </tr>
                                    <tr>
                                      <th scope='row'>CVV Code</th>
                                      <td>{paymentValue.cvvCode}</td>
                                    </tr>

                                  </tbody>
                                </table>



                              </div>
                            </div>
                          </>
                          }


                        </div>
                      </div>

                      {/*orders section*/}
                      <div className="row mt-md-5 orders bg-light p-md-5">
                        <div className="col-md-12">
                          <div className="row justify-content-between">
                            <div className="col-md-4">
                              <h4>Orders</h4>
                            </div>
                            <div className="col-md-4">
                              <Link className='btn btn-outline-info' to={"/orders"} > Add Orders</Link>
                            </div>
                          </div>

                          {
                            !userProduct ? <>
                              <h4 className='text-center text-danger'> Orders is Empity <Link className='btn btn-outline-success' to={"/orders"}>Add Order </Link> </h4>
                            </> : <>
                              <table className="table table-responsive  ">
                                <thead>
                                  <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col" className='text-center'>Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Category</th>
                                    <th scope="col"> image</th>

                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    userProduct.map((items, index) => {
                                      return <>
                                        <tr>
                                          <th scope="row" key={items.id}>{items.id}</th>
                                          <td>{items.title}</td>
                                          <td>{items.price}</td>
                                          <td>{items.category}</td>
                                          <td><img className='product-images' src={items.image} alt="" /></td>
                                          <td><button className='btn btn-danger btn-sm' onClick={() => { onUserProductDeleteHandler(index) }} >Delete</button></td>
                                        </tr>
                                      </>
                                    })
                                  }

                                </tbody>
                              </table>
                            </>
                          }


                        </div>
                      </div>
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
                  <h1 className='text-danger' >User is Not Login <Link className='btn btn-outline-success' to={"/login"} >Click to Login </Link> </h1>
                </div>
              </div>
            </>
          }


        </div>
      </section>


    </>
  )
}
