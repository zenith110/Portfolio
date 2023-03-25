const Learning = ({ notionData, year}) => (

    <div style={{textAlign: "center"}}>
        <h2 className='about__role'>Skills I am currently learning in {year}</h2>
        {notionData.map(skills => (
            <p key={skills}>{skills}</p>
        ))}
    </div>
    )
export default Learning;