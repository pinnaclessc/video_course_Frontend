import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccessHandler = () => {
  const { userId, courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const postPurchase = async () => {
      try {
        const response = await axios.post(`https://videocoursebackend.ssccglpinnacle.com/vc/purchase/${userId}/${courseId}`);
        console.log('Purchase response:', response.data);
        // Redirect or perform further actions based on the response
        navigate(`/MyLearningPage/${userId}/course/${courseId}`);
      } catch (error) {
        console.error('Error in post-purchase process:', error);
        // Handle error, perhaps redirect to an error page or display a message
      }
    };

    postPurchase();
  }, [userId, courseId, navigate]);

  return (
    <div>Loading your purchase details...</div>
  );
};

export default PaymentSuccessHandler;


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const PaymentSuccessHandler = () => {
//   const { userId, courseId } = useParams();
//   const navigate = useNavigate();
//   const [purchaseDetails, setPurchaseDetails] = useState({});

//   useEffect(() => {
//     const postPurchase = async () => {
//       try {
//         const response = await axios.post(`https://videocoursebackend.ssccglpinnacle.com/vc/purchase/${userId}/${courseId}`);
//         console.log('Purchase response:', response.data);
//         setPurchaseDetails(response.data);
        
//         // Optionally, navigate to a confirmation page or another route here
//         // navigate(`/purchaseConfirmation/${response.data.purchaseId}`);
//       } catch (error) {
//         console.error('Error in post-purchase process:', error);
//         // Handle error accordingly
//       }
//     };

//     postPurchase();
//   }, [userId, courseId, navigate]);

//   // Render purchase details or handle loading/error states as needed
//   return (
//     <div>
//       <h2>Purchase Details</h2>
//       {purchaseDetails ? (
//         <ul>
//           <li>Payment ID: {purchaseDetails.paymentId}</li>
//           <li>Purchase ID: {purchaseDetails.purchaseId}</li>
//           <li>Refund ID: {purchaseDetails.refundId || 'N/A'}</li>
//           <li>Amount: {purchaseDetails.amount}</li>
//           <li>Status: {purchaseDetails.status}</li>
//         </ul>
//       ) : (
//         <div>Loading purchase details...</div>
//       )}
//     </div>
//   );
// };

// export default PaymentSuccessHandler;

