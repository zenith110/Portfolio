/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable react/button-has-type */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import { useContext } from 'react'
import { gql, useQuery } from "@apollo/client";
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/extensions
import { ThemeContext } from "../../contexts/theme"
import DataConnect from './DataConnect';

const Blog = () => {
  const [{ themeName }] = useContext(ThemeContext)
  const articleViewQuery = gql`
    query{
    articles{
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

  
  const { data, loading, error } = useQuery(articleViewQuery);
  if (loading) {
    return <p>Loading Graphql data...</p>
  }
  // eslint-disable-next-line no-return-assign
  if (error) return `Could not load articles! ${error.message}`;
  const articles = []
  const tags = []
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
  data.articles.article.map((articleData) => {
    articleData.tags.map((tag) => {
      tags.push(tag.language)
    })
  })
  const filteredTags = [...new Set(tags)]
  

    return(
      <div id='top' className={`${themeName} app`}>
        <DataConnect articles={articles} filteredTags={filteredTags}/>
    </div>
    )}
export default Blog