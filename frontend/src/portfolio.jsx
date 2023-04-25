
const header = {
    // all the properties are optional - can be left empty or deleted
    homepage: import.meta.env.VITE_HOME,
    title: 'Home',
  }
  
  const about = {
    name: 'Abrahan Nevarez',
    resume:
      'https://assets.abrahannevarez.dev/Abrahan_Nevarez_Latest_Resume.pdf',
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