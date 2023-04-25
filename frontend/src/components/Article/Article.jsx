import { useContext } from 'react'
import { gql, useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from '../Footer/Footer'
import { ThemeContext } from "../../contexts/theme"
import ArticleBody from './Components/ArticleBody';
import ArticleHeader from './Components/ArticleHeader';
import { useNavigate } from "react-router-dom"
import "./Article.css"
const Article = () => {
    const { articleuuid } = useParams();
    const navigate = useNavigate()
    const [{ themeName }] = useContext(ThemeContext)
    const articleViewQuery = gql`
    query($articleUuid: String!){
        article(article_uuid: $articleUuid){
                    title
					titleCard
					uuid
					author{
						name
						picture
						username
					}
					contentData
					dateWritten
					url
					description
					tags{
					    tag
					}
        }
        }
    `
    const { data, loading, error } = useQuery(articleViewQuery, {
        variables: {
            articleUuid: articleuuid
        }
    });
    if (loading) return <p></p>
    // eslint-disable-next-line no-return-assign
    if (error) return `Submission error! ${error.message}`;
    
    return(
        <div id='top' className={`${themeName} app`}>
             <Header/>
             <div className='ArticlesContent'>
                <ArticleHeader data={data}/>
                <ArticleBody data={data}/>
             </div>
             <br/>
             <div style={{textAlign: 'center'}}>
             <button onClick={() => navigate(-1)}>Go Back</button>
             </div>
             <Footer/>
        </div>
    )
}
export default Article