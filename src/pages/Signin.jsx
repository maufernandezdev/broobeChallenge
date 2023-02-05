import React from 'react'
import signIn from '../utils/signin'
import {Link} from 'react-router-dom'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import useForm from '../hooks/useForm'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const Signin = () => {

  const navigate = useNavigate();
  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    const signInResponse = await signIn(values);
    if(signInResponse){
      toast.success('Successful registration!', {
        position: "bottom-center",
        duration: 3500,
        style: {
            fontFamily:'ui-monospace, Menlo, Monaco, Cascadia Mono, Segoe UI Mono, Roboto Mono, Oxygen Mono, Ubuntu Monospace, Source Code Pro, Fira Mono, Droid Sans Mono, Courier New, monospace'},
      });
      setTimeout(() => {
        navigate('/login')
      }, 3500);
    }
  }
  const initialForm = {name:'', email: '', password: ''}
  const { values , handleInputChange , handleBlur} = useForm(initialForm);

  return (
    <div className='container'>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name='name' type='text' placeholder='...' onChange={e => handleInputChange(e)} onBlur={handleBlur} required/>
        <label>Email</label>
        <input name='email' type='email' placeholder='...' onChange={e => handleInputChange(e)} onBlur={handleBlur} required/>
        <label>Password</label>
        <input name='password' type='password' placeholder='...' onChange={e => handleInputChange(e)} onBlur={handleBlur} required/>
        <input type='submit' value='SIGN UP' />
      </form>
      <div className='container__redirect'>
        <p>Already have an account? <Link to='/login'>Login <HiOutlineArrowNarrowRight></HiOutlineArrowNarrowRight></Link></p>  
      </div>
      <Toaster/>  
    </div>
  )
}

export default Signin