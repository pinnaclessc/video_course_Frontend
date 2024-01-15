// import React from 'react';
// import AccordionItem from './AccordionItem';
// import accordionData from './accordionData.json';
// import './accordion.css';

// const Accordion = () => {
//   return (
//     <div className="accordion-FullPage">
//       {accordionData.map((item, index) => (
//         <AccordionItem key={index} title={item.title} content={item.content} />
//       ))}
//     </div>
//   );
// };

// export default Accordion;


import React, { useEffect, useState } from 'react';
import AccordionItem from './AccordionItem';
import './accordion.css';
import { useParams } from 'react-router-dom';

const Accordion = () => {
  const courseId  = useParams();
  const [accordionData, setAccordionData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        // const response = await fetch(  `http://localhost:3001/cc/${courseId}`);
        const response = await fetch('http://localhost:3001/cc/65963431bc2d0286d198ee77');
        const data = await response.json();
        setAccordionData(data);
      } catch (error){
        console.error('Error fetching accordion data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="accordion-FullPage">
      {accordionData.map((item, index) => (
        <AccordionItem key={index} data={item}/>
      ))}
    </div>
  );
};

export default Accordion;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import AccordionItem from './AccordionItem';
// import './accordion.css';

// const Accordion = () => {
//   // const { courseId } = useParams();
//   const courseId =useParams();
//   const [accordionData, setAccordionData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/cc/${courseId}`);
//         const data = await response.json();
        
//         // Ensure that data is an array before setting it
//         if (Array.isArray(data)) {
//           setAccordionData(data);
//         } else {
//           console.error('Invalid data format received from the API:', data);
//         }
//       } catch (error) {
//         console.error('Error fetching accordion data:', error);
//       }
//     };

//     fetchData();
//   }, [courseId]);

//   return (
//     <div className="accordion-FullPage">
//       {accordionData.map((item, index) => (
//         <AccordionItem key={index} data={item} />
//       ))}
//     </div>
//   );
// };

// export default Accordion;


// Accordion.js
// import React, { useEffect, useState } from 'react';
// import AccordionItem from './AccordionItem';
// import './accordion.css';

// const Accordion = ({ courseId }) => {
//   const [accordionData, setAccordionData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/cc/${courseId}`);
//         const data = await response.json();
//         setAccordionData(data);
//       } catch (error) {
//         console.error('Error fetching accordion data:', error);
//       }
//     };

//     fetchData();
//   }, [courseId]);

//   return (
//     <div className="accordion-FullPage">
//       {accordionData.map((item, index) => (
//         <AccordionItem key={index} data={item} />
//       ))}
//     </div>
//   );
// };

// export default Accordion;


// Accordion.js
// import React, { useEffect, useState } from 'react';
// import AccordionItem from './AccordionItem';
// import './accordion.css';

// const Accordion = ({ courseId }) => {
//   const [accordionData, setAccordionData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/cc/${courseId}`);
//         const data = await response.json();

//         if (Array.isArray(data)) {
//           setAccordionData(data);
//         } else {
//           console.error('Data is not an array:', data);
//         }
//       } catch (error) {
//         console.error('Error fetching accordion data:', error);
//       }
//     };

//     fetchData();
//   }, [courseId]);

//   // Log accordionData to help diagnose the issue
//   useEffect(() => {
//     console.log('Accordion Data:', accordionData);
//   }, [accordionData]);

//   return (
//     <div className="accordion-FullPage">
//       {accordionData.map((item, index) => (
//         <AccordionItem key={index} data={item} />
//       ))}
//     </div>
//   );
// };

// export default Accordion;
