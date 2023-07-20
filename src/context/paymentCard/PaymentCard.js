import React, { createContext, useState } from 'react'

export const PaymentCard=createContext()
export default function PaymentCardProvider(props) {
    const [paymentCard, setPaymentCard] = useState([])
    const [userAdress, setUserAdress] = useState([])
  return (
    <PaymentCard.Provider value={{paymentCard,setPaymentCard,userAdress,setUserAdress}}>
        {props.children}
    </PaymentCard.Provider>
  )
}
