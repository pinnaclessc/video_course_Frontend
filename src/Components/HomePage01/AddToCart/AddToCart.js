import React from 'react'
import CartList from './CartList'
import CartPage from './CartPage'

export default function AddToCart() {
    const CARTDATA=[
      {id:1, courseImage:"/image/coverImage0101.svg",courseName:"Maths 6800 TCS MCQ Chapter wise Book Video course ",Price:499,fPrice:1999,faculty:"Ramniwas sir"},
      {id:2, courseImage:"/image/coverImage0101.svg",courseName:"Maths 6800 TCS MCQ Chapter wise Book Video course ",Price:499,fPrice:1999,faculty:"Ramniwas sir"}
  ]
  return (<div>
  <CartList CartData={CARTDATA}/>
  <CartPage CartPage={CARTDATA}/>
  
  </div>)
}
