import "./ArticleHeader.css"
const ArticleHeader = ({data}) => {
    const { title } = data.article
    const {name} = data.article.author
    const { dateWritten } = data.article
    const date = new Date(dateWritten.split(".")[0])
    const cleanedDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
    return(
        <div className="articleheader">
        <h1>{title}</h1>
        <h2>Written by {name} on {cleanedDate}</h2>
        <br/>
        </div>
    )
}

export default ArticleHeader