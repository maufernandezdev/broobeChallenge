import React , { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import loginUser from '../utils/login'
import { useNavigate } from 'react-router-dom'
import { Session } from '../context/sessionContext'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import useForm from '../hooks/useForm'

const Login = () => {

  const navigate = useNavigate();
  const {setToken} = useContext(Session);
  const [invalidUserOrPass , setInvalidUserOrPass] = useState(false);

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    const loginSuccess = await loginUser(values);
    if(loginSuccess.token){
      setInvalidUserOrPass(false)
      setToken(loginSuccess.token);
      setTimeout(() => {
        navigate('/issues');
      }, 500);
    }else{
      if(loginSuccess.message === 'Cannot find user'){
        setInvalidUserOrPass(true)
      }
    }
  }

  const initialForm = {email: '', password: ''}
  const { values , handleInputChange , handleBlur} = useForm(initialForm);

  return (
    <div className='container'>
      <h2 style={{padding:'0 27px'}}>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input name='email' type='email' placeholder='...' onChange={e => handleInputChange(e)} onBlur={handleBlur} required/>
        <label>Password</label>
        <input name='password' type='password' placeholder='...' onChange={e => handleInputChange(e)} onBlur={handleBlur} required/>
        <input type='submit' value='LOGIN' />
        {
          invalidUserOrPass && (
            <p className='error'>Incorrect email/password combination</p>
          )
        }
      </form>
      <div className='container__redirect'>
        <p>Don't have an account? <Link to='/signin'>Signup <HiOutlineArrowNarrowRight></HiOutlineArrowNarrowRight></Link></p>  
      </div> 
    </div>
  )
}

export default Login