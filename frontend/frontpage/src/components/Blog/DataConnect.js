import uniqid from 'uniqid'
import { useState } from 'react'
import { gql, useQuery } from "@apollo/client";
import ArticleSection from './ArticleSection';

const DataConnect = ({ keyword }) => {
    console.log(keyword)
    const articleViewQuery = gql`
    query($keyword: String!){
    articles(keyword: $keyword){
        article{
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
          language
        }
        }
    }
    }`;


    const { data, loading, error } = useQuery(articleViewQuery, {
        variables: {
            keyword
        }
    });
    if (loading) {
        return <p>Loading Graphql data...</p>
    }
    // eslint-disable-next-line no-return-assign
    if (error) return `Could not load articles! ${error.message}`;
    const articles = []
    data.articles.article.map((articleData) =>
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
    )
    console.log(articles)
    // const [currentArticles, setCurrentArticles] = useState(articles)
    return (
        <div>
            {/* <ArticleSection key={uniqid()} articles={currentArticles} /> */}
        </div>
    )
}
export default DataConnect