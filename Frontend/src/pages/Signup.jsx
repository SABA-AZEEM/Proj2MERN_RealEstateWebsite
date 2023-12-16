import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom';

export default function Signup() {

  const [formData, setFormData] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading]=useState(false);
  const navigate= useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };

  const handleSubmit = async (e)=>{
    try{
      e.preventDefault();
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/auth/signup',{
        method:"POST",
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success===false){
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in')
    }catch(error){
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='my-7 text-3xl font-semibold text-center'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' className='border rounded-lg p-3' id='username' onChange={handleChange}/>
        <input type="email" placeholder='Email' className='border rounded-lg p-3' id='email' onChange={handleChange}/>
        <input type="password" placeholder='Password' className='border rounded-lg p-3' id='password' onChange={handleChange}/>
        <button disabled={loading} className='rounded-lg p-3 bg-slate-700 text-white uppercase hover:opacity-95 disabled:opacity-80'>
          {loading? 'Loading...' : 'sign up'}
        </button>
      </form>
      <div className='flex mt-5 gap-2'>
        <p>Already have an Account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
