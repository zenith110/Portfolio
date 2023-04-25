/* eslint-disable react/button-has-type */
import ReactMarkdown from 'react-markdown'
import "./ArticleBody.css"
const ArticleBody = ({data}) => {
    
    const {contentData} = data.article
    return(
        <div>
            <div style={{textAlign: "center"}}>
            <ReactMarkdown children={contentData} className="foo"/>
            </div>
        </div>
    )
}
export default ArticleBody