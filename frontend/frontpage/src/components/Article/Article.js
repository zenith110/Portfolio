import { useContext } from 'react'
import { gql, useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from '../Footer/Footer'
import { ThemeContext } from "../../contexts/theme"
import ArticleBody from './Components/ArticleBody';

const Article = () => {
    const { title } = useParams();

    const [{ themeName }] = useContext(ThemeContext)
    const articleViewQuery = gql`
    query($title: String!){
        article(title: $title){
            title
            description
            dateWritten
            contentData
            author{
            name
            profile
            picture
            }
            tags{
                language
            }
        }
        }
    `
    const { data, loading, error } = useQuery(articleViewQuery, {
        variables: {
            title
        }
    });
    if (loading) return <p>Loading Graphql data...</p>
    // eslint-disable-next-line no-return-assign
    if (error) return `Submission error! ${error.message}`;
    
    return(
        <div id='top' className={`${themeName} app`}>
             <Header/>
             <ArticleBody data={data}/>
             <Footer/>
        </div>
    )
}
export default Article