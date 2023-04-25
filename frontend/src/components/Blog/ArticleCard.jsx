/* eslint-disable prefer-template */

import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"

const ArticleCard = ({article}) => {
    const date = new Date(article.dateWritten.split(".")[0])
    const cleanedDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
    const navigate = useNavigate()
    return (
    <div className='project'>
    <img src={article.titleCard} alt="" width={200} height={200}/>
    <h3>{article.title}</h3>

    <p className='project__description'>{article.description}</p>
    {article.tags && (
      <ul className='project__stack'>
        {article.tags.map((tag) => (
          <li key={tag.language} className='project__stack-item'>
            {tag.language}
          </li>
        ))}
      </ul>
    )}
     <Button size="small" onClick={() => navigate(`/blog/${article.uuid}`)}>View Article</Button>
     <Button size="small">Published: {cleanedDate}</Button>
  </div>
  )
}

export default ArticleCard