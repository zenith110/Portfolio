import uniqid from 'uniqid'
import { useState } from 'react'
import Header from "./Header"
import Footer from '../Footer/Footer'
import ArticleSection from './ArticleSection';

const DataConnect = ({articles, filteredTags}) => {
    const [currentArticles, setCurrentArticles] = useState(articles)
    return(
        <div>
            <Header articles={articles} tags={filteredTags} setCurrentArticles={setCurrentArticles} currentArticles={currentArticles}/>
            <ArticleSection key={uniqid()} articles={currentArticles} tags={filteredTags}/>
            <Footer />
        </div>
    )
}
export default DataConnect