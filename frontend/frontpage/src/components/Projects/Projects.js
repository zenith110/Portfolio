import uniqid from 'uniqid'
import ProjectContainer from '../ProjectContainer/ProjectContainer'

import './Projects.css'

const Projects = ({ projects }) => {
  if (projects.length <= 0) return null
  console.log(projects[0].stack[0].language)
  return (
    <section id='projects' className='section projects'>
      <h2 className='section__title'>Projects</h2>

      <div className='projects__grid'>
        {projects.map((project) => (
          <ProjectContainer key={uniqid()} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
