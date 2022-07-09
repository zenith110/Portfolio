import { useContext } from 'react'
import { ThemeContext } from "../../contexts/theme"
import AutoComplete from "./Autocomplete";

const Blog = () => {
  const [{ themeName }] = useContext(ThemeContext)
  
  

    return(
      <div id='top' className={`${themeName} app`}>
        <AutoComplete />
    </div>
    )}
export default Blog