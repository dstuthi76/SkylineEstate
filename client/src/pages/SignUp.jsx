import React from 'react';
import { Link,Navigate,useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
    const res = await fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success==false){
      setLoading(false);
     setError(data.message);
     
     return;
    }
    setLoading(false);
    setError(null);
    navigate('/SignIn');
    }catch(error){
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Create Account</h1>
      <form  onSubmit={handleSubmit}className='flex flex-col gap-4'>
        <input type='text'  placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type='text' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <input type='text' placeholder='mobileNumber' className='border p-3 rounded-lg' id='mobileNumber' onChange={handleChange} />
        <input type='text' placeholder='address' className='border p-3 rounded-lg' id='address' onChange={handleChange} />
        <input type='text' placeholder='state' className='border p-3 rounded-lg' id='state' onChange={handleChange} />
        <input type='text' placeholder='district' className='border p-3 rounded-lg' id='district' onChange={handleChange} />
        <input type='text' placeholder='mandal' className='border p-3 rounded-lg' id='mandal' onChange={handleChange} />
        <input type='text' placeholder='pincode' className='border p-3 rounded-lg' id='pincode' onChange={handleChange} />
        <button disabled={loading}className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >{loading ? 'loading...':'Sign Up'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/SignIn'>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
