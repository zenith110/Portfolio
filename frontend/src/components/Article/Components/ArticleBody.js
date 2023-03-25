/* eslint-disable react/button-has-type */
import parse from 'html-react-parser';


const ArticleBody = ({data}) => {
    
    const body = parse(data.article.contentData)
    return(
        <div>
            <div style={{textAlign: "center"}}>
                {body}
            </div>
        </div>
    )
}
export default ArticleBody