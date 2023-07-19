import React, { useState, useEffect } from 'react';
import { getUserData } from '../../apiCalls';
import './LoginPage.css'

const LoginPage = ({ user, setUser}) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsSubmitted, setCredentialsSubmitted] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value)
    } 

    if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  const submitCredentials = (e) => {
    e.preventDefault();
    if(username && password) {
      setCredentialsSubmitted(prev => !prev)
      setLoginError(false)
    } else {
      setLoginError(true)
    }
  }

    useEffect(() => {
    const login = async (username, password) => {
      try {
        const data = await getUserData({username, password});
        console.log(data.credentialsFound[0])
        setUser(data.credentialsFound[0])
        setLoginSuccess(true)
      } catch (error) {
        console.log('login error', error)
        setLoginSuccess(false)
        //set error here come back to it
      }
    }
    if(credentialsSubmitted) {
    login(username, password);
    }
  }, [credentialsSubmitted])

 
  return (
    <div className='loginpage-container'>
      <main className='login-form-container'>
        <form>
          <label className='input-label' htmlFor='username'>Username:</label>
          <input className='login-input' value={username} onChange={(e) => { handleChange(e) }} name='username' type='text' />
          <label className='input-label' htmlFor='password'>Password:</label>
          <input className='login-input' value={password} onChange={(e) => { handleChange(e) }} name='password' type='password' />
          <button className='submit-btn' onClick={(e) => {submitCredentials(e)}}>Login</button>
          {loginError && <p>Please enter both username and password!</p>}
          {loginSuccess && <p>Login Successful!</p>}
        </form>
      </main>
    </div>
  )
}

export default LoginPage