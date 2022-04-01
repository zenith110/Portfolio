import { gql, useMutation} from "@apollo/client";
const Article = ({ArticleData}) => {
    const deleteArticleClient = gql`
            mutation($uuid: String){
            deleteArticle(uuid: $uuid){
                uuid
                }
            }
        `;
  const [deleteArticle, { data, loading, error }] = useMutation(deleteArticleClient);
  if (loading) {
    return <p>Loading Graphql data...</p>
  }
  // eslint-disable-next-line no-return-assign
  if (error) return `Submission error! ${error.message}`;
    return(
        <div>
        <p>{ArticleData.title}</p>
        <button>Edit</button>
        <button onClick={() => 
        deleteArticle({
            variables: {
                uuid: ArticleData.uuid
            },
        })
        }>Delete</button>
        </div>
    )
}
export default Article