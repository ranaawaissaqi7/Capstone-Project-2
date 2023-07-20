import React, { useContext, useState } from 'react'
import "./Billings.css"
import { PaymentCard } from '../../context/paymentCard/PaymentCard'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/sideBar/Sidebar'
import { UserProduct } from '../../context/userProduct/UserProduct'

export default function Billings() {

  const { isAuthChange } = useContext(UserProduct)

  //userDataState
  const [userData, setUserData] = useState({})
  //useEffect
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"))
    setUserData(data)
  }, [])
  const { paymentCard, setPaymentCard, userAdress, setUserAdress } = useContext(PaymentCard)

  //paymentState
  const [paymentState, setPaymentState] = useState({

    nameOnCard: "",
    cardNumber: "",
    expirationDate: "",
    cvvCode: ""
  })

  //onchangeHandler
  const onChangeHandler = (e) => {
    setPaymentState({ ...paymentState, [e.target.name]: e.target.value })
  }

  //onSubmitHandler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { nameOnCard, cardNumber, expirationDate, cvvCode } = paymentState
    if (!nameOnCard || !cardNumber || !expirationDate || !cvvCode) {
      return
    }

    setPaymentCard([...paymentCard, paymentState])
    console.log("pa..... => ", paymentCard)
    
  }
  //onDelteHandler
  const onDelteHandler = (id) => {
    console.log("iddd ", id)
    let newData = paymentCard.filter((items, index) => {
      return index !== id
    })
    setPaymentCard(newData)
  }

  //adressState
  const [adressState, setAdressState] = useState({
    country: "",
    city: "",
    state: "",
    adress1: "",
    adress2: "",
    postCode: ""
  })

  //onAdressChangeHandler
  const onAdressChangeHandler = (e) => {
    setAdressState({ ...adressState, [e.target.name]: e.target.value })
  }
  //onAdressSubmithandler
  const onAdressSubmithandler = (e) => {
    e.preventDefault();

    const { country, city, state, adress1, adress2, postCode } = adressState

    if (!country || !city || !state || !adress1 || !adress2 || !postCode) {
      return
    }

    setUserAdress([...userAdress, adressState])
    
  }
  //onAdressDeleteHandler
  const onAdressDeleteHandler = (id) => {
    console.log("iddd ", id)
    let newData = userAdress.filter((items, index) => {
      return index !== id
    })
    setUserAdress(newData)
  }


  return (
    <>
      <section className='billings'>
        <div className="container-fluid">
          {
            isAuthChange ? <>

              <div className="row">
                <div className="col-md-4 ">
                  <Sidebar />
                </div>


                <div className="col-md-8">

                  <div className="row mt-md-5 justify-content-between">
                    <div className="col-md-3">
                      <h1 className=''>Billings</h1>

                    </div>
                    <div className="col-md-3 ">

                    </div>
                  </div>

                  <div className="container-fluid">
                    <div className="row bg-light right-side ">
                      <div className="col-md-12 p-md-5 ">
                        {/*add payment method */}
                        <div className="row add-payment-mathod">
                          <div className="col-md-12">
                            <h2> <i className="fa-regular fa-credit-card"></i> Add Payment methods</h2>
                            <div className="row d-flex justify-content-evenly">
                              {/*payment meyhod map */}
                              {
                                paymentCard.map((items, index) => {
                                  return <>
                                    <div className="card mt-2 overflow-auto " style={{ width: "15rem" }}>
                                      <div className="card-body  ">
                                        <div className="row justify-content-between ">
                                          <div className="col-md-6">
                                            <h5 className='text-success'>{!userData ? <></> : <>{userData.fname}</>}</h5>
                                          </div>
                                          <div className="col-md-3">
                                            <span><i className="fa-solid fa-trash" onClick={() => { onDelteHandler(index) }}></i></span>
                                          </div>
                                        </div>
                                        { /* display biling table card data */}
                                        <table className="table table-responsive ">
                                          <tbody>
                                            <tr>
                                              <th scope="row">Card Name</th>
                                              <td>{items.nameOnCard}</td>
                                            </tr>
                                            <tr>
                                              <th scope='row'>Card Number</th>
                                              <td>{items.cardNumber}</td>

                                            </tr>
                                            <tr>
                                              <th scope='row'> Expiry Date</th>
                                              <td> {items.expirationDate}</td>

                                            </tr>
                                            <tr>
                                              <th scope='row'>CVV Code</th>
                                              <td>{items.cvvCode}</td>
                                            </tr>

                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </>
                                })
                              }
                            </div>
                            {/*add payment method modle */}
                            <button type="button" className="btn btn-outline-success p-md-4 mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal2" data-bs-whatever="@mdo">+ Add New Payment Method</button>

                            <div className="modal fade " id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div className="modal-dialog modal-xl">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Card</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div className="modal-body">
                                    <form>
                                      <div className="mb-3">
                                        <label for="inputNameOnCard" className="form-label">Name On Card</label>
                                        <select id="inputNameOnCard" className="form-select" name='nameOnCard' onChange={onChangeHandler}>
                                          <option selected>Select Card</option>
                                          <option value={"Visa"}>Visa</option>
                                          <option value={"MasterCard"}>MasterCard</option>
                                          <option value={"PayPal"}>PayPal</option>
                                          <option value={"Payoneer"}>Payoneer</option>
                                        </select>
                                        {!paymentState.nameOnCard ? <p className='text-danger'> Card Name is Required </p> : <></>}

                                      </div>

                                      <div className="mb-3">
                                        <label for="Card-number" className="col-form-label">Card number:</label>
                                        <input type="number" name='cardNumber' className="form-control" id="Card-number" placeholder='XXX XXX XXXX' onChange={onChangeHandler} />
                                        {!paymentState.cardNumber ? <p className='text-danger'> Card Number is Required </p> : <></>}
                                      </div>
                                      <div className="row">
                                        <div className="col-md-6">
                                          <label for="Expiration-date" className="form-label">Expiration-date</label>
                                          <input type="date" className="form-control" name='expirationDate' id="Expiration-date" placeholder="Expiration-date" onChange={onChangeHandler} />
                                          {!paymentState.expirationDate ? <p className='text-danger'> Expiration Date is Required </p> : <></>}
                                        </div>
                                        <div className="col-md-6">
                                          <label for="CVV-Code" className="form-label">CVV-Code</label>
                                          <input type="password" className="form-control" name='cvvCode' id="CVV-Code" placeholder="CVV-Code" onChange={onChangeHandler} />
                                          {!paymentState.cvvCode ? <p className='text-danger'> CVV Code is Required </p> : <></>}
                                        </div>
                                      </div>

                                    </form>
                                  </div>
                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal"  onClick={onSubmitHandler} >Send message</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/*add billing adress */}
                        <div className="row add-new-adress mt-2">
                          <div className="col-md-12">
                            <h2> <i className="fa-solid fa-location-dot"></i> Billings Adress</h2>
                            <div className="row d-flex justify-content-evenly">
                              {/*userAdress map */}
                              {
                                userAdress.map((items, index) => {
                                  return <>
                                    <div className="card mt-2 overflow-auto" style={{ width: "15rem" }}>
                                      <div className="card-body ">
                                        <div className="row justify-content-between ">
                                          <div className="col-md-6">
                                            <h5 className='text-success'> {!userData ? <></> : <>{userData.fname}</>} </h5>
                                          </div>
                                          <div className="col-md-3">
                                            {/* Edit Adress button */}



                                            <i className="fa-solid fa-trash" onClick={() => { onAdressDeleteHandler(index) }}></i>
                                          </div>
                                        </div>
                                        { /* display biling table adress */}


                                        <table className="table table-responsive ">
                                          <tbody>
                                            <tr>
                                              <th scope="row">Country</th>
                                              <td>{items.country}</td>
                                            </tr>
                                            <tr>
                                              <th scope='row'>City</th>
                                              <td>{items.city}</td>

                                            </tr>
                                            <tr>
                                              <th scope='row'>State</th>
                                              <td> {items.state}</td>

                                            </tr>
                                            <tr>
                                              <th scope='row'>Adress 1</th>
                                              <td>{items.adress1}</td>
                                            </tr>
                                            <tr>
                                              <th scope='row'>Adress 2</th>
                                              <td>{items.adress2}</td>
                                            </tr>
                                            <tr>
                                              <th scope='row'>Post Code</th>
                                              <td>{items.postCode}</td>
                                            </tr>

                                          </tbody>
                                        </table>

                                      </div>
                                    </div>
                                  </>
                                })
                              }
                            </div>
                            {/*add Adress Modle */}
                            <button type="button" className="btn btn-outline-warning p-md-4 mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Add New Adress</button>

                            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div className="modal-dialog modal-xl">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">New message</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div className="modal-body">
                                    <form>
                                      <div className="row">
                                        <div className="col-md-6">
                                          <label for="inputContry" className="form-label">Contry</label>
                                          <select id="inputContry" className="form-select" name='country' onChange={onAdressChangeHandler}>
                                            <option selected >Select Country</option>
                                            <option value={"Australia"}>Australia</option>
                                            <option value={"Belgium"}>Belgium</option>
                                            <option value={"Canada"}>Canada</option>
                                            <option value={"Denmark"} >Denmark</option>
                                            <option value={"USA"}>USA</option>
                                          </select>
                                          {!adressState.country ? <p className='text-danger'> Country Name is Required </p> : <></>}
                                        </div>
                                        <div className="col-md-6">
                                          <label for="inputCity" className="form-label">City</label>
                                          <select id="inputCity" className="form-select" name='city' onChange={onAdressChangeHandler}>
                                            <option selected>Select City</option>
                                            <option value={"Sydney"}>Sydney</option>
                                            <option value={"Brussels"}>Brussels</option>
                                            <option value={"Tronto"}>Tronto</option>
                                            <option value={"Copenthagan"}>Copenthagan</option>
                                            <option value={"NewYork"}>New York</option>
                                          </select>
                                          {!adressState.city ? <p className='text-danger'> City Name is Required </p> : <></>}
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-6">
                                          <label for="inputState" className="form-label">State</label>
                                          <select id="inputState" className="form-select" name='state' onChange={onAdressChangeHandler}>
                                            <option selected >Select State</option>
                                            <option value={"Arizona"}>Arizona</option>
                                            <option value={"California"}>California</option>
                                            <option value={"Florida"}>Florida</option>
                                            <option value={"Geogia"} >Geogia</option>
                                            <option value={"Texas"}>Texas</option>
                                          </select>
                                          {!adressState.state? <p className='text-danger'> State Name is Required </p> : <></>}
                                        </div>
                                        <div className="col-md-6">
                                          <label for="adress-lin1" className="col-form-label">Adress Line 1:</label>
                                          <textarea className="form-control" name='adress1' id="adress-lin1" onChange={onAdressChangeHandler}></textarea>
                                          {!adressState.adress1 ? <p className='text-danger'> Adress 1 is Required </p> : <></>}
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-6">
                                          <label for="adress-lin2" className="col-form-label">Adress Line 2 :</label>
                                          <textarea className="form-control" name='adress2' id="adress-lin2" onChange={onAdressChangeHandler}></textarea>
                                          {!adressState.adress2 ? <p className='text-danger'> Adress 2 is Required </p> : <></>}
                                        </div>
                                        <div className="col-md-6">
                                          <label for="Post-Code" className="form-label">Post-Code</label>
                                          <input type="password" className="form-control" name='postCode' id="Post-Code" placeholder="Post Code" onChange={onAdressChangeHandler} />
                                          {!adressState.postCode ? <p className='text-danger'> Post Code is Required </p> : <></>}
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal"  onClick={onAdressSubmithandler}>Submit</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>


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
