import React, { createContext, useState } from 'react'

export const UserProduct=createContext()
export default function UserProductProvider(props) {
    const[userProduct,setUserProduct]=useState([])
    const[isAuthChange,setIsAuthChange]=useState(false)
  return (
    <UserProduct.Provider value={{userProduct,setUserProduct,isAuthChange,setIsAuthChange}}>
        {props.children}
    </UserProduct.Provider>
  )
}
