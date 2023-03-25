import uniqid from 'uniqid'
import { useState } from 'react'
import Header from "./Header"
import Footer from '../Footer/Footer'
import ArticleSearch from './ArticleSearch'

const DataConnect = () => {
    const [keyword, setKeyword] = useState("");
    return(
        <div>
            <Header/>
            <input onChange={(e) => setKeyword(e.target.value)}/>
            <ArticleSearch keyword={keyword}/>
            <Footer />
        </div>
    )
}
export default DataConnect