import React, { useEffect, useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Payment = ({ user, courseId, finalPrice, onPaymentSuccess }) => {
  const [cashfree, setCashfree] = useState(null);
  const navigate = useNavigate();

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
          email_id: user.email,
          orderAmount: finalPrice.toString(),
          courseId: courseId,
          customerId: user._id,
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
        if (response.status === 'OK') { // Check if the response contains the status and is 'OK' for a successful payment
          onPaymentSuccess();
        } else {
          Swal.fire({
            title: "Payment Failed",
            text: "Your payment was not successful, please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
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