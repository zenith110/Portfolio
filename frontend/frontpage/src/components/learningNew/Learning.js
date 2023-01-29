const Learning = ({ notionData, year}) => (

    <div style={{textAlign: "center"}}>
        <h2 className='about__role'>Skills I am currently learning in {year}</h2>
        {notionData.map(skills => (
            <li key={skills}>{skills}</li>
        ))}
    </div>
    )
export default Learning;