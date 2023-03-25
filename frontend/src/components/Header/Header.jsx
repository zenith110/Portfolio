import { header } from '../../portfolio'
import Navbar from '../Navbar/Navbar'
import './Header.css'

const Header = ({ projects, skills }) => {
  const { homepage, title } = header

  return (
    <header className='header center'>
      <h3>
        {homepage ? (
          <a href={homepage} className='link'>
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <Navbar projects={projects} skills={skills} />
    </header>
  )
}

export default Header
