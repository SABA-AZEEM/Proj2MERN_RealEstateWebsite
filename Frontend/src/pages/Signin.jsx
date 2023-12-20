import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess, signInFailure, signInStart } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function Signin() {

  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      dispatch(signInStart());
      const res = await fetch('http://localhost:3000/api/auth/signin',{
        method:"POST",
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();
      
      if(data.success===false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/')
    }catch(error){
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='my-7 text-3xl font-semibold text-center'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='Email' className='border rounded-lg p-3' id='email' onChange={handleChange}/>
        <input type="password" placeholder='Password' className='border rounded-lg p-3' id='password' onChange={handleChange}/>
        <button disabled={loading} className='rounded-lg p-3 bg-slate-700 text-white uppercase hover:opacity-95 disabled:opacity-80'>
          {loading? 'Loading...' : 'sign in'}
        </button>
        <OAuth />
      </form>
      <div className='flex mt-5 gap-2'>
        <p>Dont have an Account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
