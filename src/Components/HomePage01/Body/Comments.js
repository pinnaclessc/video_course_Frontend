import React, { useRef, useEffect, useState } from 'react';
import commentsData from './comments.json';
import styles from './Comments.module.css';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import{BiPlayCircle} from 'react-icons/bi'
import{FaQuoteLeft,FaQuoteRight} from 'react-icons/fa'

export default function Comments() {
  const [comments, setComments] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Fetch the comments data from the JSON file
    setComments(commentsData);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -250,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left:250,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.comments_fullpage}>
      <button onClick={scrollLeft} className={styles['slider-button-left']}>
        <AiFillLeftCircle size={30} />
      </button>
      <div className={styles.comments_Heading}> How learners like you are achieving their goals</div>
      <div className={styles['scroll-container']} ref={scrollRef}>
        <div className={styles['card-wrapper']}>
          {comments.map(comment => (
            <div key={comment.id} className={styles['card']}>
              <p className={styles['comment']}><FaQuoteLeft size={15}/>  &nbsp;{comment.comment}&#8221;</p>
              <div className={styles.image_name_post_div}>
              <div className={styles.circular_div}><p className={styles.circular_div_para}>{comment.alt}</p></div>
              <div className={styles.name_post_div}>
              <h3 className={styles['name']}>{comment.name}</h3>
              <p className={styles['post']}>{comment.post}</p>
              
              </div>
              </div>


              <div className={styles.videoLink}>
              <BiPlayCircle size={30}/>
              <a href={comment.link} className={styles['link']}>{comment.linkPlaceHolder}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button onClick={scrollRight} className={styles['slider-button-right']}>
        <AiFillRightCircle size={30} />
      </button>
    </div>
  );
}
