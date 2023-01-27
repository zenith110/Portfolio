import uniqid from 'uniqid'
import { useState } from 'react'
import ProjectContainer from '../ProjectContainer/ProjectContainer'
import './Projects.css'

const Projects = ({ projects, topics }) => {
  /*
  Set default state of current projects to be the projects from the prop
  */
  const [currentProjects, setCurrentProjects] = useState(projects)
  const FilterProjects = (e) => {
    if (e.target.value === 'all') {
      setCurrentProjects(projects)
    } else {
      const filteredData = projects.filter((element) =>
        Object.values(element.topics).includes(e.target.value)
      )
      setCurrentProjects(filteredData)
    }
  }
  if (projects.length <= 0 && topics.length <= 0) return null

  // First time, render all the projects
  return (
    <section id='projects' className='section projects'>
      <h2 className='section__title'>Projects</h2>
      <ul className='skills__list'>
        {topics.map((topic) => (
          <button
            type='button'
            key={uniqid()}
            value={topic}
            className='skills__list-item btn btn--plain'
            onClick={FilterProjects}
            onKeyDown={FilterProjects}
          >
            {topic}
          </button>
        ))}
      </ul>
      <div className='projects__grid'>
        {currentProjects.map((project) => (
          <ProjectContainer key={uniqid()} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
