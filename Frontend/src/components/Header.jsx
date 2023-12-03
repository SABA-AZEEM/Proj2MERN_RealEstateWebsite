import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

function Header() {
  return (
    <header className='bg-slate-300 shadow-md'>
        <div className='flex justify-between items-center mx-auto max-w-6xl p-3'>
            <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-600'>Saba</span>
                    <span className='text-slate-900'>Estate</span>
                </h1>
            </Link>
            <form className='bg-slate-100 p-2 rounded-md flex items-center'>
                <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                <FaSearch className='text-slate-900'/>
            </form>
            <nav>
                <ul className='flex gap-3'>
                    <Link to='/'>
                        <li className='text-slate-900 font-semibold hover:underline cursor-pointer hidden sm:inline'>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li className='text-slate-900 font-semibold hover:underline cursor-pointer hidden sm:inline'>About</li>
                    </Link>
                    <Link to='/sign-in'>
                        <li className='text-slate-900 font-semibold hover:underline cursor-pointer'>Sign In</li>
                    </Link>
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Header