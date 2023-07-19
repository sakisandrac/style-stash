import React, { useState, useEffect } from 'react';
import { getUserData } from '../../apiCalls';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ user, setUser}) => {

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
      } catch (error) {
        console.log('login error', error)
        //set error component here come back to it
      }
    }
    if(credentialsSubmitted) {
    login(username, password);
    }
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
        <form>
          <label className='input-label' htmlFor='username'>Username:</label>
          <input className='login-input' value={username} onChange={(e) => { handleChange(e) }} name='username' type='text' />
          <label className='input-label' htmlFor='password'>Password:</label>
          <input className='login-input' value={password} onChange={(e) => { handleChange(e) }} name='password' type='password' />
          <button className='submit-btn' onClick={(e) => {submitCredentials(e)}}>Login</button>
          {loginError && <p>Please enter both username and password!</p>}
          {user && <p>Login Successful! You will be directed back to the homepage shortly</p>}
        </form>
      </main>
    </div>
  )
}

export default LoginPage