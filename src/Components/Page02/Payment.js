import React, { useEffect, useState } from "react";
import axios from 'axios';
import { load } from "@cashfreepayments/cashfree-js";
import Swal from "sweetalert2";

const Payment = ({ userName, userEmail, userId, courseId, finalPrice, selectedMonths, onPaymentSuccess }) => {
  const [cashfree, setCashfree] = useState(null);

  useEffect(() => {
    const initializeSDK = async () => {
      try{
        const sdk = await load({
          mode: "sandbox",
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
      const response = await axios.post("http://localhost:8000/payment-for-upi", {
        userName,
        userEmail,
        userId,
        courseId,
        orderAmount: finalPrice.toString(),
        selectedMonths,
      });

      if (response.status === 200) {
        const responseData = response.data;
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
        if (response.status === 'OK') {
          console.log("reach on onPaymentSuccess function ")
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
    <div>
      <button onClick={createOrder}>Buy This Course</button>
    </div>
  );
};

export default Payment;