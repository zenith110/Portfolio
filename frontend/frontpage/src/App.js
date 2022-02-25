import { useContext } from 'react'
import { useQuery, gql } from '@apollo/client'
import { ThemeContext } from './contexts/theme'
import Header from './components/Header/Header'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import './App.css'

const App = () => {
  const [{ themeName }] = useContext(ThemeContext)
  // const [projects, setProjects] = useState([])
  const query = gql`
    query getProjects {
      githubProjects {
        projects {
          name
          link
          readme
          stars
          createdon
          languages {
            language
          }
        }
      }
    }
  `
  const { loading, error, data } = useQuery(query)
  if (loading) {
    return <p>Loading Graphql data...</p>
  }

  if (error) return <p>Error :(</p>
  const projects = []
  const skillsStorage = []
  data.githubProjects.projects.map((projectInfo) =>
    projects.push({
      name: projectInfo.name,
      description: projectInfo.readme,
      sourceCode: projectInfo.link,
      stack: projectInfo.languages,
    })
  )
  data.githubProjects.projects.map((projectInfo) =>
    projectInfo.languages.map((skillsData) =>
      skillsStorage.push(skillsData.language)
    )
  )
  const skills = [...new Set(skillsStorage)]
  console.table(skills)
  return (
    <div id='top' className={`${themeName} app`}>
      <Header projects={projects} skills={skills} />

      <main>
        <About />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <Contact />
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  )
}

export default App
