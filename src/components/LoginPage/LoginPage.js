import React, { useState, useEffect } from 'react';
import { postData } from '../../apiCalls';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import loginLogo from '../../images/login-logo.png'

const LoginPage = ({ user, setUser, appError, setAppError }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsSubmitted, setCredentialsSubmitted] = useState(false);
  const [loginError, setLoginError] = useState(false);

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
    setAppError(null);
    
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
        const data = await postData('user', {username, password});
        console.log('helo', data)
        setUser(data.credentialsFound[0])
      } catch (error) {
        setAppError(error)
      }
    }
    if(credentialsSubmitted) {
    login(username, password);
    }

    return () => setAppError(null)
    
  }, [credentialsSubmitted])

 const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user])

  return (
    <div className='loginpage-container'>
      <main className='login-form-container'>
        <img className='login-logo' src={loginLogo} alt="please log in sign"/>
        <form name='login-form' className='login-form'>
          <label className='input-label' htmlFor='username'>Username:</label>
          <input className='login-input' value={username} onChange={(e) => { handleChange(e) }} name='username' type='text' />
          <label className='input-label' htmlFor='password'>Password:</label>
          <input className='login-input' value={password} onChange={(e) => { handleChange(e) }} name='password' type='password' />
          <button className='login-btn' onClick={(e) => {submitCredentials(e)}}>Login</button>
          {loginError && <p>Please enter both username and password!</p>}
          {user && <p>Login Successful! You will be directed back to the homepage shortly</p>}
          {appError && <ErrorMessage appError={appError}/>}
        </form>
      </main>
    </div>
  )
}

export default LoginPage