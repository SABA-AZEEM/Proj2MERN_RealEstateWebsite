import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import {useSelector} from 'react-redux';

function Header() {

    const {currentUser} = useSelector(state=>state.user);
    const [searchTerm, setSearchTerm ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm',searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl);
        }
    },[location.search]);

  return (
    <header className='bg-slate-300 shadow-md'>
        <div className='flex justify-between items-center mx-auto max-w-6xl p-3'>
            <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-600'>Saba</span>
                    <span className='text-slate-900'>Estate</span>
                </h1>
            </Link>
            <form onSubmit={handleSubmit} className='bg-slate-100 p-2 rounded-md flex items-center'>
                <input 
                    type="text" 
                    placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                />
                <button>
                    <FaSearch className='text-slate-900'/>
                </button>
            </form>
            <nav>
                <ul className='flex gap-3'>
                    <Link to='/'>
                        <li className='text-slate-900 font-semibold hover:underline cursor-pointer hidden sm:inline'>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li className='text-slate-900 font-semibold hover:underline cursor-pointer hidden sm:inline'>About</li>
                    </Link>
                    <Link to='/profile'>
                        {currentUser?
                        (
                        <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile" />
                        ):(
                        <li className='text-slate-900 font-semibold hover:underline cursor-pointer'>Sign In</li>
                        )}
                    </Link>
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Header