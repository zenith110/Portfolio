/* eslint-disable react/button-has-type */
/* eslint-disable array-callback-return */
import { useContext, useState } from 'react'
import Brightness2Icon from '@mui/icons-material/Brightness2'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import MenuIcon from '@mui/icons-material//Menu'
import CloseIcon from '@mui/icons-material//Close'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import uniqid from 'uniqid'
import { ThemeContext } from '../../contexts/theme'
import './Navbar.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Navbar = () => {
  const [{ themeName, toggleTheme }] = useContext(ThemeContext)
  const [showNavList, setShowNavList] = useState(false)
  const toggleNavList = () => setShowNavList(!showNavList)
  return (
    <nav className='center nav'>
      <ul
        style={{ display: showNavList ? 'flex' : null }}
        className='nav__list'
      >
        <li className='nav__list-item'>
          <a
            href={import.meta.env.VITE_ADMIN_PANEL}
            onClick={toggleNavList}
            className='link link--nav'
          >
            Admin Panel
          </a>
        </li>
        <li className='nav__list-item'>
          <a
            href={import.meta.env.VITE_BLOG_URL}
            onClick={toggleNavList}
            className='link link--nav'
          >
            Blog
          </a>
        </li>
      </ul>
      <button
        type='button'
        onClick={toggleTheme}
        className='btn btn--icon nav__theme'
        aria-label='toggle theme'
      >
        {themeName === 'dark' ? <WbSunnyRoundedIcon /> : <Brightness2Icon />}
      </button>

      <button
        type='button'
        onClick={toggleNavList}
        className='btn btn--icon nav__hamburger'
        aria-label='toggle navigation'
      >
        {showNavList ? <CloseIcon /> : <MenuIcon />}
      </button>
    </nav>
  )
}

export default Navbar
