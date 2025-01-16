import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { logo } from '../assets';


const Header = () => {
  return (
        <header className ="w-full flex
        justify-between items-center
        sm:px-8 px-4 pt-2 flex-col mb-4" >
            <nav className ="flex items-center justify-between
            w-full pt-3" >
                <Link to="/">
                    <img src = {logo} alt= "logo"
                     className= 'w-44 object-contain' />
                </Link>
    
                <button
                    type ='button'
                    onClick={() => window.open('https://github.com/zeeshaan28')}  
                    className ='black_btn'
                >
                    Github
                </button>
            </nav>
            </header> 
  )
}

export default Header