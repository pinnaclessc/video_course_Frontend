import React, { useState } from "react";
import Styles from './ProfilePicture.module.css'

const ProfilePicture = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  return (
    <div className={Styles["ProfilePicture-fullPage"]}>
      <p className={Styles["preview-heading"]}>Preview:</p>
      <div className={Styles["Preview"]}>
      {image && (
        <div className={Styles["preview-div"]}>
          <img
            src={image}
            alt="Uploaded preview"
            style={{ maxWidth: "300px" }}
            className={Styles["preview-image"]}
          />
        </div>
      )}
      </div>
      <div className={Styles['input-div']}>
      <input type="file" accept="image/*" onChange={handleImageChange} className={Styles['file-input']} />
      </div>
      <button className={Styles['save-btn']}>Save</button>
    </div>
  );
};

export default ProfilePicture;
