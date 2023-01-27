import { render } from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from './App'
import Blog from "./components/Blog/Blog"
import Article from "./components/Article/Article"
import { ThemeProvider } from './contexts/theme'
import './index.css'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache: new InMemoryCache(),
})

render(
  <ApolloProvider client={client}>
    <ThemeProvider>
       <BrowserRouter>
          <Routes>
            <Route path="/blog/:title" element={<Article/>}/>
            <Route path="/blog" element={<Blog />} />
            <Route path="/" element={<App />} />
          </Routes>
      </BrowserRouter>,
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
