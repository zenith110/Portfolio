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
  const query = gql`
    query getProjects {
      githubProjects {
        projects {
          name
          githublink
          description
          createdon
          deploymentlink
          languages {
            language
          }
          topics
        }
      }
    }
  `
  const { loading, error, data } = useQuery(query)

  if (loading) {
    return <p>Loading Graphql data...</p>
  }
  window.location.href = 'https://status.abrahannevarez.dev'
  if (error) return
  const projects = []
  const skillsStorage = []
  const topicsStorage = []
  data.githubProjects.projects.map((projectInfo) =>
    projects.push({
      name: projectInfo.name,
      description: projectInfo.description,
      sourceCode: projectInfo.githublink,
      stack: projectInfo.languages,
      topics: projectInfo.topics,
      livePreview: projectInfo.deploymentlink,
    })
  )
  data.githubProjects.projects.map((projectInfo) =>
    projectInfo.languages.map((skillsData) =>
      skillsStorage.push(skillsData.language)
    )
  )
  data.githubProjects.projects.map((projectInfo) =>
    projectInfo.topics.map((topic) => topicsStorage.push(topic))
  )

  const badSkills = [
    'Ruby',
    'SCSS',
    'VBScript',
    'Shell',
    'Batchfile',
    'Assembly',
    'Emacs',
    'Lisp',
    'Vim',
    'script',
    'PLSQL',
    'C',
  ]
  const filteredSkills = skillsStorage.filter(
    (skill) => !badSkills.includes(skill)
  )
  const skills = [...new Set(filteredSkills)]
  const topics = [...new Set(topicsStorage)]
  topics.push('all')
  return (
    <div id='top' className={`${themeName} app`}>
      <Header projects={projects} skills={skills} />

      <main>
        <About />
        <Projects projects={projects} topics={topics} />
        <Skills skills={skills} />
        <Contact />
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  )
}

export default App
