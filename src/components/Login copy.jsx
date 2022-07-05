import React from 'react'
import {GoogleOutlined,FacebookOutlined} from '@ant-design/icons';
// import firebase from 'firebase/compat/app';
import {signInWithPopup,GoogleAuthProvider,FacebookAuthProvider} from 'firebase/auth'

import {auth} from '../firebase';

const Login = () => {
    // console.log(auth)

    const signInWithGoogle = () =>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider)
        .then(res=>console.log('res:',res))
        .catch(err=>console.log('error in google',err))
    }
   const signWithfacebook = () =>{
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth,provider)
    .then(res=>console.log('face',res))
    .catch(err=>console.log('error in facebook',err))

   }
  return (
    <div id='login-page'>
        <div id="login-card">
            <h2>Welcome to PeriChat</h2>
            <div className="login-button google" 
            // onClick={()=>auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
            onClick={()=>signInWithGoogle()}
            >
            <GoogleOutlined/> Sing In with google
            </div>
            <br />
            <br />
            <div className="login-button facebook"
            // onClick={()=>auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
            onClick={()=>signWithfacebook()}
            >
             <FacebookOutlined/> Sing In with facebook
            </div>
        </div>
    </div>
  )
}

export default Login