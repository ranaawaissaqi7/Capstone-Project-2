import React, { useContext, useEffect, useState } from 'react'
import "./Orders.css"
import { UserProduct } from '../../context/userProduct/UserProduct';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/sideBar/Sidebar';
export default function Orders() {

    const { setUserProduct, userProduct, isAuthChange } = useContext(UserProduct)
    //useEffect hooks
    useEffect(() => {
        getAllProduct();
    }, [])

    //getAllProduct
    const getAllProduct = async () => {
        try {
            const res = await fetch('https://fakestoreapi.com/products')
            const data = await res.json()
            console.log("Product Data => ", data)
            setProductState(data)
            setIsLoading(true)
        } catch (error) {
            console.log("ERROR => ", error)
        }

    }



    //Product State
    const [productState, setProductState] = useState([])

    //isLoading
    const [isLoading, setIsLoading] = useState(false)

    // addProductsState
    const [addProductsState, setAddProductState] = useState([])


    //addProductHandler
    const addProductHandler = (data) => {

        console.log("items => ", data)


        setAddProductState([...addProductsState, data])
        console.log("userPro..... ", addProductsState)
        setUserProduct(addProductsState)
        console.log("ussss => ", userProduct)

    }



    //deleteProducthandler
    const deleteProducthandler = (id) => {
        console.log(id)
        let newData = userProduct.filter((items, index) => {
            return index !== id
        })
        console.log("delte data =>", newData)
        setUserProduct(newData)


    }

    return (
        <>
            <section className='order'>
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
                                            <h1 className=''>Orders</h1>

                                        </div>
                                        <div className="col-md-3 ">
                                            <Link className="btn btn-primary" to={"/"} >
                                                Orders <span className="badge text-bg-secondary">{userProduct.length}</span>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="container-fluid">
                                        <div className="row bg-light right-side">
                                            <div className="col-md-12 p-md-5 ">
                                                {
                                                    isLoading ? <>
                                                        <table className="table table-responsive">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">ID</th>
                                                                    <th scope="col" className='text-center'>Title</th>
                                                                    <th scope="col">Price</th>
                                                                    <th scope="col">Category</th>
                                                                    <th scope="col"> image</th>
                                                                    <th scope="col"> Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    productState.map((items, index) => {
                                                                        return <>
                                                                            <tr>
                                                                                <th scope="row" key={items.id}>{items.id}</th>
                                                                                <td>{items.title}</td>
                                                                                <td>{items.price}</td>
                                                                                <td>{items.category}</td>
                                                                                <td><img className='product-images' src={items.image} alt="" /></td>
                                                                                <td>
                                                                                    <button className='btn btn-outline-success btn-sm' onClick={() => addProductHandler(items)}  >Add</button>

                                                                                </td>
                                                                                <td><button className='btn btn-outline-danger btn-sm' onClick={() => deleteProducthandler(index)} >Delete</button></td>
                                                                            </tr>
                                                                        </>
                                                                    })
                                                                }

                                                            </tbody>
                                                        </table>

                                                    </> : <> <h3>Product is Loading....</h3> </>
                                                }
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
