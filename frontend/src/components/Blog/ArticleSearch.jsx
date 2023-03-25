import ArticleSection from "./ArticleSection"
import { gql, useQuery } from "@apollo/client";
const ArticleSearch = ({keyword}) => {
    const articleViewQuery = gql`
    query($input: searchInput){
    articles(input: $input){
        articleCollection{
        title
        titleCard
        uuid
        author{
            name
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
    }`;

  
  const { data, loading, error } = useQuery(articleViewQuery, {
    variables: 
    {
        input: {
            term: keyword
        }
    }
  });
  if (loading) {
    return <p>Loading Graphql data...</p>
  }
  // eslint-disable-next-line no-return-assign
  if (error) return `Could not load articles! ${error.message}`;
  const articles = []
  data.articles.article.map((articleData) => {
    articles.push({
      title: articleData.title,
      titleCard: articleData.titleCard,
      author: {
        name: articleData.author.name
      },
      contentData: articleData.contentData,
      dateWritten: articleData.dateWritten,
      url: articleData.url,
      description: articleData.description,
      tags: articleData.tags,
      uuid: articleData.uuid
    })
  })
    return(
        <>
        <ArticleSection articles={articles}/>
        </>
    )
}
export default ArticleSearch