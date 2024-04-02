import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate=useNavigate()
  const submitHandler = async (event) => {
    event.preventDefault();
  
    try {
      let result = await fetch("http://localhost:8000/vc/login", {
    
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (!result.ok) {
        throw new Error("Invalid credentials");
      }
  
      const responseData = await result.json();
      console.log("Full response from server:", responseData);
  
      if (responseData.name) {
        localStorage.setItem('user', JSON.stringify(responseData));
        navigate('/');
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <div className={classes["login-fullpage"]}>
        <div className={classes["login-heading"]}>Log in to your account</div>
        <form className={classes["login-form"]} onSubmit={submitHandler}>
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
          {error && <p className={classes["error-message"]}>{error}</p>}
          <button className={classes["login-btn"]} type="submit">
            Log in
          </button>
        </form>
        <p className={classes["signup-para"]}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;

