import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import styles from './WishlistPage.module.css';

function WishlistPage() {
  const { userId } = useParams();
  console.log(userId)
  const [wishlistCourses, setWishlistCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWishlistCourses = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/vc/wishList/${userId}`);
        setWishlistCourses(data.courses);
      } catch (err) {
        setError('Failed to load wishlist courses. Please try again.');
        console.error(err);
      }
    };

    fetchWishlistCourses();
  }, [userId]);

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Your Wishlist</h2>
      {wishlistCourses.length ? (
        wishlistCourses.map((course) => (
          <div key={course.id} className={styles.courseItem}>
            <Link to={`/course/${course.id}`} className={styles.courseLink}>
              {course.title}
            </Link>
          </div>
        ))
      ) : (
        <div className={styles.empty}>Your wishlist is empty</div>
      )}
    </div>
  );
}

export default WishlistPage;
