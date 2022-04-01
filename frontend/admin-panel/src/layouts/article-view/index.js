/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { gql, useQuery, useMutation} from "@apollo/client";
import Grid from "@mui/material/Grid";
import Article from "./components/article";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
function ArticleView(){
    const articleViewQuery = gql`
    query{
    articles{
        article{
        title
        author{
            name
        }
        contentData
        dateWritten
        url
        uuid
        description
        }
    }
    }`;
  
  const { data, loading, error } = useQuery(articleViewQuery);
  const deleteArticlesClient = gql`
            mutation{
            deleteAllArticles{
                uuid
                }
            }
        `;
  const [deleteAllArticles, { deleteData, deleteLoading, deleteError }] = useMutation(deleteArticlesClient);
  if (loading || deleteLoading) {
    return <p>Loading Graphql data...</p>
  }
  // eslint-disable-next-line no-return-assign
  if (error || deleteError) return `Submission error! ${error.message}`;
  return(
      <DashboardLayout>
        <DashboardNavbar absolute isMini />
        <MDBox mt={8}>
            <MDBox mb={3}>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                <Grid container spacing={3}>
                    <Grid item xs={12} xl={6}></Grid>
                        {data.articles.article.map((articleData => (
                            <Article key={articleData.uuid} ArticleData={articleData}/>
                        )))}
                        <br/>
                        <button onClick={() => deleteAllArticles()}>Delete All Articles</button>
                    </Grid>
                </Grid>
                </Grid>
            </MDBox>
        </MDBox>
      </DashboardLayout>
  )
}
export default ArticleView
