import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from '../firebase';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';
import './login.css';

function Login() {

    const [{}, dispatch] = useStateValue();
const signinButton=()=>{
auth.signInWithPopup(provider)
.then((result)=> {
    dispatch({
        type:actionTypes.SET_USER,
        user: result.user,
    })
})
.catch((error)=>alert(error.message));
};

    return (
        <div className="login">
            <div className="login__container">
                <img src="/whatsapp.png" />
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={signinButton}>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default Login
