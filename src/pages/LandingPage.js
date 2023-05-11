import React, { useContext, useState,useEffect } from 'react'
import styles from './Landing.module.css'
import { ModeContext } from '../components/NavBar'
import fire from '../Fire'
import Footer from '../components/Footer'
import { FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const LandingPage = () => {
  const mode=useContext(ModeContext)
  const [email,setemail]=useState('')
  const [user,setuser]=useState('')
  const [emailerror,setemailerror]=useState('')
  const [passworderror,setpassworderror]=useState('')
  const [password,setpassword]=useState('')
  const [acc,setacc]=useState(true)


  const clearInputs=()=>{
    setemail('');
    setpassword('');
  }
  const clearErrors=()=>{
    setemailerror('');
    setpassworderror('');
  }

  const handleLogout=()=>{
    fire.auth().signOut();
  }

  const authListener=()=>{
    fire.auth().onAuthStateChanged(user=>{
      if(user){
        clearInputs();
        setuser(user);}
      else{
        setuser("");
      }
    })
  }
  useEffect(()=>{
    authListener()
  })
    const handleLogin=()=>{
      clearErrors()
      fire
      .auth()
      .signInWithEmailAndPassword(email,password)
      .catch(err=>{
        switch(err.code){
          case "auth/invalid-email":
            setemailerror('Invalid Email');
          break;
          case "auth/user-disabled":
            setemailerror('Account Disabled');
          break;
          case "auth/user-not-found":
            setemailerror("Account Not Found");
            break;
          case "auth/wrong-password":
            setpassworderror('Incorrect Password');
            break;
          default: 
          setemailerror('something went wrong');
          setPassworderror('something went wrong');
  
        }
      })
    }
    const handleSignup=()=>{
      clearErrors()
      fire.auth()
      .createUserWithEmailAndPassword(email,password)
      .catch(err=>{
        switch(err.code){
          case "auth/invalid-email":
            setemailerror('Please Enter Valid Email');
            break;
          case "auth/email-already-in-use":
            setemailerror('Email Already Exist');
            break;
          case "auth/weak-password":
            setpassworderror('password too short');
            break;
          default: 
          setemailerror('something went wrong');
          setPassworderror('something went wrong');
  
        }
      })
      
    }
  return (
    <>
    <div className={styles.box} style={{backgroundColor:!mode?'rgb(63, 62, 62)':'rgb(200, 200, 200)'}} >
          <span style={{textAlign:'center',width:'350px',color:mode?'black':'white'}}>
          Zmovies Home of Movies and Series Trailer.  
          </span>
     <div className={styles.account} style={{display:user?'none':'flex'}}>
     <div className={styles.accountbox}>
          <div className={styles.form}>
          <h3 style={{color:'rgb(0,145,255'}}>UserName</h3>
          <span>{emailerror}</span>
          <input type='text' value={email} onChange={(e)=>setemail(e.target.value)}/>
          <h3 style={{color:'rgb(0,145,255'}}>Password</h3>
          <span>{passworderror}</span>
          <input type='password' value={password} onChange={(e)=>setpassword(e.target.value)}/>
          </div>
          <div className={styles.login}>
            <button style={{display:acc?'block':'none'}} onClick={handleLogin}>Login</button> <p style={{display:acc?'block':'none'}} onClick={()=>setacc(!acc)}>Don`t have account ?</p>
            <button style={{display:!acc?'block':'none'}} onClick={handleSignup}>Sign up</button> <p style={{display:!acc?'block':'none'}} onClick={()=>setacc(!acc)}>Have an account ?</p>
          </div>
      </div>
     </div>
     {user?<div className={styles.welcom}>
      <div className={styles.bigc}>
      <div className={styles.smallcc}>
        <div className={styles.smallc}>
          <Link to='/'><FaPlay size={40} color='white'/></Link>
        </div>
      </div>
      </div>
      <h2>Thank you & Enjoy</h2><button onClick={handleLogout}>logout</button>
     </div>:''}
        </div>
        <Footer/>
        </>
  )
}

export default LandingPage