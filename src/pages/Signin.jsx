import React, {useState, useRef} from 'react'
import signIn from '../utils/signin'
import {Link} from 'react-router-dom'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import useForm from '../hooks/useForm'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

const Signin = () => {

  const navigate = useNavigate();
  const [pending , setPending] = useState(false);
  const inputName = useRef(null);
  const inputEmail = useRef(null);
  const inputPass = useRef(null);

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    setPending(true);
    const signInResponse = await signIn(values);
    if(signInResponse){
      
      inputName.current.value = '';
      inputEmail.current.value = '';
      inputPass.current.value = '';

      toast.success('Successful registration!', {
        position: "bottom-center",
        duration: 3000,
        style: {
            fontFamily:'ui-monospace, Menlo, Monaco, Cascadia Mono, Segoe UI Mono, Roboto Mono, Oxygen Mono, Ubuntu Monospace, Source Code Pro, Fira Mono, Droid Sans Mono, Courier New, monospace'},
      });

      setTimeout(() => {
        setPending(false);
        navigate('/login')
      }, 2000);
    } else {
      toast.error('Registration error!', {
        position: "bottom-center",
        duration: 3000,
        style: {
            fontFamily:'ui-monospace, Menlo, Monaco, Cascadia Mono, Segoe UI Mono, Roboto Mono, Oxygen Mono, Ubuntu Monospace, Source Code Pro, Fira Mono, Droid Sans Mono, Courier New, monospace'},
      });
      setPending(false);
    }
  }
  const initialForm = {name:'', email: '', password: ''}
  const { values , handleInputChange , handleBlur} = useForm(initialForm);

  return (
    <div className='container'>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name='name' ref={inputName} type='text' placeholder='...' onChange={e => handleInputChange(e)} onBlur={handleBlur} required/>
        <label>Email</label>
        <input name='email' ref={inputEmail} type='email' placeholder='...' onChange={e => handleInputChange(e)} onBlur={handleBlur} required/>
        <label>Password</label>
        <input name='password' ref={inputPass} type='password' placeholder='...' onChange={e => handleInputChange(e)} onBlur={handleBlur} required/>
        <input type='submit' value='SIGN UP' disabled={pending} />
      </form>
      <div className='container__redirect'>
        <p>Already have an account? <Link to='/login'>Login <HiOutlineArrowNarrowRight></HiOutlineArrowNarrowRight></Link></p>  
      </div>
      <Toaster/>  
    </div>
  )
}

export default Signin