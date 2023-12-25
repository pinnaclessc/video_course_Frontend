import React,{useState,useEffect} from "react";
import classes from "./SignUpPage.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {Link,useNavigate} from "react-router-dom";

export default function SignUpPage() {
  const navigate=useNavigate();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  useEffect(() => {
    const auth = localStorage.getItem("user");

    if (auth) {
      navigate("/MyLearningMain");
      window.location.reload();
    }
  }, []);


  const submitHandler = async (event) => {
    let result = await fetch("http://localhost:8000/api/register",{
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result));
      if(result){
      navigate("/MyLearningMain");
     console.log("Singnup Completed");
    }
  };
  return (
    <>
      <Header />
      <div className={classes["signup-fullpage"]}>
        <div className={classes["signup-heading"]}>
          Sign up and start learning
        </div>
        <div className={classes["email-div"]}>
          <div className={classes["email-heading"]} >Name</div>
          <input className={classes["email-inputbox"]} type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className={classes["email-div"]}>
          <div className={classes["email-heading"]}>E-mail</div>
          <input className={classes["email-inputbox"]} type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className={classes["email-div"]}>
          <div className={classes["email-heading"]}>Password</div>
          <input className={classes["email-inputbox"]} type="password" value={password} onChange={(e)=>(setPassword(e.target.value))}/>
        </div>
        <button className={classes["signup-btn"]} type="submit" onClick={submitHandler}>
          Sign up
        </button>
        <p className={classes["tandc-para"]}>
          By signing up, you agree to our <a href="/">Terms of Use</a> and{" "}
          <a href="/">Privacy Policy</a>.
        </p>
        <p className={classes["login-para"]}>
        Already have an account?<Link to="/login">Log in</Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
