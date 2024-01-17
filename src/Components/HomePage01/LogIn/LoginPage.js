import React,{useState,useEffect} from "react";
import classes from "./LoginPage.module.css";
import { Link,useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { BsApple } from "react-icons/bs";

export default function LoginPage(){
  
  const navigate=useNavigate("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  useEffect(()=>{

    const auth=localStorage.getItem('user')
    if(auth){
      const userId=JSON.parse(localStorage.getItem("user"))._id
      navigate(`/MyLearningPage/:${userId}`)
      window.location.reload();

    }
},[])


  const loginHandler=async(e)=>{
    // console.log(email,password)

    let result=await fetch('http://localhost:8000/vc/api/login',
    {
    method:'post',
    body:JSON.stringify({email,password}),
    headers:{
        'Content-Type':'application/json'
    }
})
result=await result.json();
// console.log(result)
 if(result.name){
 localStorage.setItem('user',JSON.stringify(result));
 console.log(result)
 const userId=JSON.parse(localStorage.getItem("user"))._id
 navigate(`/MyLearningPage/${userId}`)
 }
 else{
  alert("please Enter the Correct Field")
 }
}
  return (
    <>
      <div className={classes["Loginpage-fullpage"]}>
        <div className={classes["Loginpage-inner-div"]}>
          <div className={classes["Loginpage-heading"]}>
            Log in to your Pinnacle account
          </div>
          <div className={classes["Google-div"]}>
            <button className={classes["Google-btn"]}>
              <FcGoogle size={25}/> Continue with Google
            </button>
          </div>
          <div className={classes["Google-div"]}>
            <button className={classes["Google-btn"]} >
              <FaFacebook size={25}/>
              Continue with Facebook
            </button>
          </div>
          <div className={classes["Google-div"]}>
            <button className={classes["Google-btn"]}>
              <BsApple size={25} /> Continue with Apple
            </button>
          </div>
          <div className={classes["email-div"]}>
            <div className={classes["email-heading"]}>E-mail</div>
            <input className={classes["email-inputbox"]} type="email" onChange={(e)=>(setEmail(e.target.value))} value={email} />
          </div>
          <div className={classes["password-div"]}>
            <div className={classes["password-heading"]}>Password</div>
            <input className={classes["password-inputbox"]} type="password"  onChange={(e)=>(setPassword(e.target.value))} value={password}/>
          </div>
          <button className={classes["Login-btn"]} type="submit" onClick={loginHandler}>
            Log in
          </button>
          <div className={classes["ForgotPassword-div"]}>
            or <a href="/">Forgot Password</a>
          </div>
          <div className={classes["signup-div"]}>
            Don't have an account?
            <Link to="/sighup"> Sign up Log in with your organization</Link>
          </div>
        </div>
      </div>
    </>
  );
}
