const projectsData = []
async function grapqhlSender() {
  const grapqhlClient = await fetch(process.env.REACT_APP_GRAPHQL_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `{
        githubProjects{
        projects{
          name
          link
          readme
          stars
          createdon
        }
      }
      }`,
    }),
  })
  const data = await grapqhlClient.json()
  const dataInnards = data.data.githubProjects.projects
  dataInnards.map((projectInfo) =>
    projectsData.push({
      name: projectInfo.name,
      link: projectInfo.link,
      readme: projectInfo.readme,
      stars: projectInfo.stars,
      createdOn: projectInfo.createdOn,
    })
  )
  return projectsData
}
const grapqhlData = grapqhlSender()
const header = {
  // all the properties are optional - can be left empty or deleted
  homepage: 'https://rajshekhar26.github.io/cleanfolio',
  title: 'JS.',
}

const about = {
  // all the properties are optional - can be left empty or deleted
  name: 'Abrahan Nevarez',
  role: 'Fullstack Engineer',
  description:
    'Adipisicing sit fugit ullam unde aliquid sequi Facilis soluta facilis perspiciatis corporis nulla aspernatur. Autem eligendi rerum delectus modi quisquam? Illo ut quasi nemo ipsa cumque perspiciatis! Maiores minima consectetur.',
  resume: 'https://example.com',
  social: {
    linkedin: 'https://www.linkedin.com/in/abrahan-nevarez/',
    github: 'https://github.com/zenith110',
  },
}

// projects can be added an removed
// if there are no projects, Projects section won't show up
const projects = []
grapqhlData.then((data) =>
  data.map((projectInfo) =>
    projects.push({
      name: projectInfo.name,
      description: projectInfo.readme,
      sourceCode: projectInfo.link,
      // stack: ['SASS', 'TypeScript', 'React'],
      // sourceCode: 'https://github.com',
      // livePreview: 'https://github.com',
    })
  )
)

// projects can be added an removed
// if there are no projects, Projects section won't show up
// grapqhlData.then((data) =>
//   data.map((projectInfo) => {
// name: projectInfo.name,
// description:
//   'Amet asperiores et impedit aliquam consectetur? Voluptates sed a nulla ipsa officia et esse aliquam',
// stack: ['SASS', 'TypeScript', 'React'],
// sourceCode: 'https://github.com',
// livePreview: 'https://github.com',
//   })
// )

const skills = [
  // skills can be added or removed
  // if there are no skills, Skills section won't show up
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Redux',
  'SASS',
  'Material UI',
  'Git',
  'CI/CD',
  'Jest',
  'Enzyme',
]

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: 'contact@abrahannevarez.dev',
}

export { header, about, projects, skills, contact }
