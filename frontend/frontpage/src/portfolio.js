const header = {
  // all the properties are optional - can be left empty or deleted
  homepage: process.env.REACT_APP_HOME,
  title: 'Home',
}

const about = {
  // all the properties are optional - can be left empty or deleted
  name: 'Abrahan Nevarez',
  description:
    'Hi there. I am currently a full stack engineer dabbling in various technologies. Currently I am learning the Grafana stack: Grafana, Loki, and Tempo. I am also learning Terraform to develop infrastructure. ',
  resume:
    'https://fetchitbucket.s3.us-east-2.amazonaws.com/Abrahan_Nevarez_Latest_Resume.pdf',
  social: {
    linkedin: 'https://www.linkedin.com/in/abrahan-nevarez/',
    github: 'https://github.com/zenith110',
  },
}

const contact = {
  // email is optional - if left empty Contact section won't show up
  email: 'contact@abrahannevarez.dev',
}

export { header, about, contact }
