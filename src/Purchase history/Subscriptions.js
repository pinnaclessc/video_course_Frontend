import React from 'react'

export default function Subscriptions() {

  const CourseReceiptData=[
    // {
    //   courseName: "Introduction to Python",
    //   date: "2023-08-15",
    // totalPrice: 49.99,
    //   PaymentType: "Credit Card"
    // },
    // {
    //   courseName: "Web Development Fundamentals",
    //   date: "2023-08-22",
    //   totalPrice: 79.99,
    //   PaymentType: "PayPal"
    // },
    // {
    //   courseName: "Data Science with R",
    //   date: "2023-09-05",
    //   totalPrice: 89.99,
    //   PaymentType: "Credit Card"
    // },
    // {
    //   courseName: "Introduction to Machine Learning",
    //   date: "2023-09-12",
    //   totalPrice: 99.99,
    //   PaymentType: "Stripe"
    // },
    // {
    //   courseName: "Digital Marketing Strategies",
    //   date: "2023-10-10",
    //   totalPrice: 69.99,
    //   PaymentType: "Stripe"
    // },
    // {
    //   courseName: "Introduction to Graphic Design",
    //   date: "2023-10-17",
    //   totalPrice: 49.99,
    //   PaymentType: "PayPal"
    // },
    // {
    //   courseName: "Artificial Intelligence Basics",
    //   date: "2023-10-24",
    //   totalPrice: 119.99,
    //   PaymentType: "Credit Card"
    // },
    // {
    //   courseName: "Video Editing Fundamentals",
    //   date: "2023-11-07",
    //   totalPrice: 39.99,
    //   PaymentType: "Stripe"
    // }
  ]

  if(CourseReceiptData.length===0){
    return(<div>There is no Any Data this is Subscriptions component</div>)
  }
  return (
    <div>
        Subscriptions  components
      
    </div>
  )
}
