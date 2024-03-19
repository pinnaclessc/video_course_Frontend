import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import classes from "./SignUpPage.module.css";

export default function SignUpPage() {
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser)._id : null;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userId) {
      navigate(`/MyLearningPage/:${userId}`);
      window.location.reload();
    }
  }, [userId, navigate]);

  const submitHandler = async (event) => {
    let result = await fetch("http://13.200.156.92:8000/vc/register-newStudent", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result));
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className={classes["signup-fullpage"]}>
      <div className={classes["signup-heading"]}>
        Sign up and start learning
      </div>
      <div className={classes["email-div"]}>
        <div className={classes["email-heading"]}>Name</div>
        <input
          className={classes["email-inputbox"]}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={classes["email-div"]}>
        <div className={classes["email-heading"]}>E-mail</div>
        <input
          className={classes["email-inputbox"]}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={classes["email-div"]}>
        <div className={classes["email-heading"]}>Password</div>
        <input
          className={classes["email-inputbox"]}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className={classes["signup-btn"]} type="submit" onClick={submitHandler}>
        Sign up
      </button>
      <p className={classes["tandc-para"]}>
        By signing up, you agree to our <Link to="/TearmAndCondition">Terms of Use</Link> and{" "}
        <Link to="/privacyPolicy">Privacy Policy</Link>.
      </p>
      <p className={classes["login-para"]}>
        Already have an account?<Link to="/login">Log in</Link>
      </p>
    </div>
  );
}