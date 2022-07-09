/* eslint-disable react/button-has-type */
/* eslint-disable array-callback-return */
import { useContext, useState } from 'react'
import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  // const [checkedState, setCheckedState] = useState([])
  const toggleNavList = () => setShowNavList(!showNavList)
  //   const addInput = (e, tag) => {
  //   checkedState.push(tag)
  //   setCheckedState(checkedState)
  // }
//   const filterArticles = () => {
//       if(checkedState.length <= 0 || checkedState === undefined){
//           setCurrentArticles(articles)
//           handleClose()
//       }
//       else if(checkedState !== undefined || checkedState.length > 0){
//         const filteredArticlesStorage = []
//         articles.filter((element) =>
//             element.tags.map((tag) => {
//                 if(checkedState.includes(tag.language)){
//                     filteredArticlesStorage.push(element)
//                 }
//             }
//             )
//         )

//         const filteredArticles = [...new Set(filteredArticlesStorage)]
//         setCheckedState([])
//         setCurrentArticles(filteredArticles)
//         handleClose()
//   }
// }
  return (
    <nav className='center nav'>
      {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        > */}
        {/* <Box sx={style}>
         <p style={{textAlign: "center"}}>Filter articles by keywords</p>
           {tags && (
            <ul className='project__stack'>
                {tags.map((tag) => (
                <div style={{margin: 10}} key={uniqid()}>
                    <input type="checkbox" id={tag} name={tag} value={tag} key={uniqid()}style={{margin: 5}} onChange={(e) => addInput(e,tag)}/>{tag}
                </div>
                ))}
            </ul>
            )}
           <button onClick={filterArticles} key="filteringButton" className='center margin-auto'>Close</button>
        </Box>
      </Modal> */}
      <ul
        style={{ display: showNavList ? 'flex' : null }}
        className='nav__list'
      >
        <li className='nav__list-item'>
          <a
            href={process.env.REACT_APP_ADMIN_PANEL}
            onClick={toggleNavList}
            className='link link--nav'
          >
            Admin Panel
          </a>
        </li>
        <li className='nav__list-item'>
          <a
            href='https://status.abrahannevarez.dev'
            onClick={toggleNavList}
            className='link link--nav'
          >
            Status Page
          </a>
        </li>
        <li className='nav__list-item'>
          <a
            href={process.env.REACT_APP_BLOG}
            onClick={toggleNavList}
            className='link link--nav'
          >
            Blog
          </a>
        </li>
        {/* <button className='nav__list-item' onClick={handleOpen}>Filter Articles</button> */}
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
