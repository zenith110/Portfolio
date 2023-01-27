import { header } from '../../portfolio'
import Navbar from './Navbar'
import './Header.css'

const Header = ({ articles, tags, setCurrentArticles }) => {
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
      <Navbar articles={articles} tags={tags} setCurrentArticles={setCurrentArticles}/>
    </header>
  )
}

export default Header
