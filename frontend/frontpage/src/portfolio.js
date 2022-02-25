const header = {
  // all the properties are optional - can be left empty or deleted
  homepage: 'https://abrahannevarez.dev',
  title: 'Home',
}

const about = {
  // all the properties are optional - can be left empty or deleted
  name: 'Abrahan Nevarez',
  role: 'Fullstack Engineer',
  description:
    'Hi there. I am currently a full stack engineer dabbling in various technologies. Currently I am learning the Grafana stack: Grafana, Loki, and Tempo. I am also learning Terraform to develop infrastructure. ',
  resume: 'https://example.com',
  social: {
    linkedin: 'https://www.linkedin.com/in/abrahan-nevarez/',
    github: 'https://github.com/zenith110',
  },
}

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

export { header, about, contact }
