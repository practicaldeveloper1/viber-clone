import React from 'react'
import { Button } from '@material-ui/core'
import { auth, provider } from "../firebase";
import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import './Login.css'
function Login() {
  const [{ }, dispatch] = useStateValue();

  const signIn = async () => {

    try {
      const result = await auth.signInWithPopup(provider);
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user
      });

    }
    catch (error) {
      alert(error.message);
    }
  }
  return (
    <div className="login">
      <img src="https://tehnoblog.org/wp-content/uploads/2019/01/Viber-App-Logo-1600x1600-1024x1024.png"
        alt=""
      />
      <div className="login__text">
        <h1>Sign in to Viber made by Practical Dev</h1>
      </div>

      <Button onClick={signIn} >
        Sign In With Google
          </Button>

    </div>
  )
}

export default Login
