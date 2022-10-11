import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import { authentication } from '../firebaseConfig';
import { RecaptchaVerifier,  signInWithPhoneNumber } from 'firebase/auth';
import {Link} from 'react-router-dom'
function Signup() {
    const [signupUser, setsignupUser] = useState({});
    const [expandForm, setexpandForm] = useState(false)
    const [otpIncorrect, setotpIncorrect] = useState(false)
    const [OTP, setOTP] = useState('')
    const handleUser = (event) => {
        let newInput = {[event.target.name]: event.target.value};

        setsignupUser({...signupUser, ...newInput})
    }


  

const generateRecaptcha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-div', {
    'size': 'invisible',
    'callback': (response) => {
    }
  }, authentication);

}

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(signupUser.phone.length >= 12){
          setexpandForm(true)
          generateRecaptcha();
          let appVerifier = window.recaptchaVerifier;
          console.log(signupUser.phone)
          signInWithPhoneNumber(authentication, signupUser.phone, appVerifier)
            .then(confirmationResult => {
              window.confirmationResult = confirmationResult
            })
            .catch(error=>{
              console.log(error)
            })
        }
    }

    const verifyOTP = (e) => {
      let otp = e.target.value;
      setOTP(otp);

      if(otp.length === 6){
        let confirmationResult = window.confirmationResult;
        console.log(confirmationResult)
        confirmationResult.confirm(otp).then((result) => {
          localStorage.setItem('userAccessToken',result.user.accessToken)
          window.location = "/"
        }).catch((error) => {
          setotpIncorrect(true)
        });
      }
    }


    const returnToSignIn = () => {
      window.location.reload()
    }

    

  return (
    <form onSubmit={handleSubmit}>
    <RegisterElements >
              <h2>Sign in with phone number</h2>
              <div style={{width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <label htmlFor="nameInput">Name:</label>
                <input id="nameInput" type="text" name="name" placeholder='Name' onChange={e => handleUser(e)}  />
              </div>
              <div style={{width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <label htmlFor="phoneNumberInput">Phone Number:</label>
                <input id="phoneNumberInput" type="text" name="phone" placeholder='Phone number' onChange={e => handleUser(e)}  />
              </div>
              {expandForm?
                   <>
                   <input id="otpInput" type="text" placeholder='Enter the OTP' value={OTP} onChange={verifyOTP}/>
                   {otpIncorrect?
                      <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <ErrorMessage>
                          Incorrect OTP
                        </ErrorMessage>             
                        <Link onClick={returnToSignIn}>Back to Sign In</Link>                 
                      </div>
                    :
                   <div>Please enter the one time pin sent to your phone</div>
                    }
                   </>
                    :
                    <>
                    <button type="submit">Send OTP</button>
                    </>
               
                }
                <div id="recaptcha-div"/>
    </RegisterElements>
    </form>
  )
}

const RegisterElements = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

`
const ErrorMessage = styled.div`
background-color:rgb(239, 149, 30);
margin:20px 0;
color:red;
font-weight:800;
font-size:32px;
padding: 0 20px;
`
export default Signup