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
import Learning from "./components/learningNew/Learning"

const App = () => {
  const [{ themeName }] = useContext(ThemeContext)
  const projectQuery = gql`
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
  const bioQuery = gql`
    query{
    profile{
      readme
      position
      company
    }
  }
  `
  const notionQuery = gql`
    query{
    notionGoals{
      goals
    }
}
  `
  const githubProjectsQuery = useQuery(projectQuery);
  const githubBioQuery = useQuery(bioQuery);
  const notionGoalsQuery = useQuery(notionQuery);
  const errors = githubProjectsQuery.error || githubBioQuery.error || notionGoalsQuery.error
  const loading = githubProjectsQuery.loading || githubBioQuery.loading || notionGoalsQuery.loading
  if (loading) {  
    return <p>Loading Graphql data...</p>
  }
  
  // eslint-disable-next-line no-return-assign
  if (errors){
    console.log(errors)
  }
  const projects = []
  const skillsStorage = []
  const topicsStorage = []
  const bio = githubBioQuery.data.profile;
  const notionData = notionGoalsQuery.data.notionGoals.goals;
  const year =  new Date().getFullYear();
  githubProjectsQuery.data.githubProjects.projects.map((projectInfo) =>
    projects.push({
      name: projectInfo.name,
      description: projectInfo.description,
      sourceCode: projectInfo.githublink,
      stack: projectInfo.languages,
      topics: projectInfo.topics,
      livePreview: projectInfo.deploymentlink,
    })
  )
  githubProjectsQuery.data.githubProjects.projects.map((projectInfo) =>
    projectInfo.languages.map((skillsData) =>
      skillsStorage.push(skillsData.language)
    )
  )
  githubProjectsQuery.data.githubProjects.projects.map((projectInfo) =>
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
    'Emacs Lisp',
    'Vim script',
    'Makefile',
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
        <About bio={bio}/>
        <Projects projects={projects} topics={topics} />
        <Skills skills={skills} />
        <Learning notionData={notionData} year={year}/>
        <Contact />
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  )
}

export default App
