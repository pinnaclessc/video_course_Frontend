import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import styles from './CartPage.module.css';

function CartPage() {
  const { userId } = useParams();
  const [cartCourses, setCartCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCartCourses = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/vc/cart/${userId}`);
        setCartCourses(data.courses);
      } catch (err) {
        setError('Failed to load cart courses. Please try again.');
        console.error(err);
      }
    };

    fetchCartCourses();
  }, [userId]);

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Your Cart</h2>
      {cartCourses.length ? (
        cartCourses.map((course) => (
          <div key={course.id} className={styles.courseItem}>
            <Link to={`/course/${course.id}`} className={styles.courseLink}>
              {course.title}
            </Link>
          </div>
        ))
      ) : (
        <div className={styles.empty}>Your cart is empty</div>
      )}
    </div>
  );
}

export default CartPage;
