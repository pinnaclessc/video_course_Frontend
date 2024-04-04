import React, { useEffect, useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";

const Payment = ({ user, courseId, finalPrice, onPaymentSuccess }) => {
  const [cashfree, setCashfree] = useState(null);

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        const sdk = await load({
          mode: "production", // or "test" depending on your environment
        });
        setCashfree(sdk);
      } catch (error) {
        console.error("Error initializing Cashfree SDK:", error);
      }
    };
    initializeSDK();
  }, []);

  const createOrder = async () => {
    try {
      const response = await fetch("https://videocoursebackend.ssccglpinnacle.com/payment-for-upi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_id: user.email, // Dynamic email from user props
          orderAmount: finalPrice.toString(), // Dynamic finalPrice from props
          courseId: courseId, // Dynamic courseId for identifying the course being purchased
          customerId: user._id, // Dynamic user ID from user props
          // Additional user and course details can be added here if required
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        doPayment(responseData.message);
      } else {
        console.error("Failed to create payment order:", response.status);
      }
    } catch (error) {
      console.error("Error creating payment order:", error);
    }
  };

  const doPayment = (sessionId) => {
    if (cashfree) {
      cashfree.checkout({
        paymentSessionId: sessionId,
        redirectTarget: "_self",
      }).then((response) => {
        // Here you handle the payment response. For simplification, let's assume payment is successful if we get here.
        console.log(response);

        // const buycouseHandler = async () => {
        //   const user = JSON.parse(localStorage.getItem("user"));
        //   const userId = user ? user._id : null;
        //   const courseId = params.id;
        //   const finalPrice = getPrice();
        
        //   // Assuming you have the endpoint setup to mark a course as purchased.
        //   try {
        //     const response = await fetch(`https://videocoursebackend.ssccglpinnacle.com/vc/purchase/${userId}/${courseId}`, {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //       body: JSON.stringify({
        //         userId,
        //         courseId,
        //       }),
        //     });
        //     const data = await response.json();
        //     if (data.success) {
            
        //       Swal.fire({
        //         title: "Success!",
        //         text: "Course purchased successfully",
        //         icon: "success",
        //         confirmButtonText: "OK",
        //       }).then(() => {
        //         navigate(`/MyLearningPage/${userId}`);
        //       });
        //     } else {
          
        //       Swal.fire({
        //         title: "Error!",
        //         text: "Failed to purchase course",
        //         icon: "error",
        //         confirmButtonText: "OK",
        //       });
        //     }
        //   } catch (error) {
        //     console.error("Error during purchase:", error);
           
        //   }
        // };
        onPaymentSuccess();
      }).catch((error) => {
        console.error("Payment process error:", error);
      });
    } else {
      console.error("Cashfree SDK not initialized.");
    }
  };

  return (
    <button onClick={createOrder}>
      Buy This Course
    </button>
  );
};

export default Payment;


// import React, { useEffect, useState } from "react";
// import { load } from "@cashfreepayments/cashfree-js";
// import { BsCart2 } from "react-icons/bs";

// const Payment = ({ user, subtotal }) => {
//   const [cashfree, setCashfree] = useState(null);

//   useEffect(() => {
//     const initializeSDK = async () => {
//       try {
//         const sdk = await load({
//           mode: "production", // Change this to "production" when you're ready to go live
//         });
//         setCashfree(sdk);
//       } catch (error) {
//         console.error("Error initializing Cashfree SDK:", error);
//         // Handle initialization error, if any
//       }
//     };
//     initializeSDK();
//   }, []);

//   const createOrder = async () => {
//     try {
//       const response = await fetch("https://videocoursebackend.ssccglpinnacle.com/payment-for-upi", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         // body: JSON.stringify({ email_id: "shakshisinha@ssccglpinnacle.com" }),
//         body: JSON.stringify({
//           email_id: "shakshisinha@ssccglpinnacle.com", // Assuming user.email contains the user's email address
//         //   orderAmount: subtotal, // Pass the subtotal as orderAmount
//         //   customerDetails:  user.username,
//         //   customerId: user.id,
//         //   customerPhone:"7877481590"
//             // Pass the customer details (e.g., username)
//         }),
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         doPayment(responseData.message);
//       } else {
//         console.error("Response Error:", response.status);
//         // Handle response error, if any
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       // Handle fetch error, if any
//     }
//   };

//   const doPayment = (id) => {
//     if (cashfree) {
//       const checkoutOptions = {
//         paymentSessionId: id,
//         redirectTarget: "_self",
//       };
//       cashfree.checkout(checkoutOptions);
//     } else {
//       console.error("Cashfree SDK not initialized.");
//     }
//   };

//   const payMe = () => {
//     createOrder();
//   }; 

//   return (
//     <div onClick={payMe}>
//       Buy This Course
//     </div>
//   );
// };

// export default Payment;