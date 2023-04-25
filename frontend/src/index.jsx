import { render } from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from './App'
import { ThemeProvider } from './contexts/theme'
import './index.css'
import Blog from "./components/Blog/Blog"
import Article from "./components/Article/Article"
const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  cache: new InMemoryCache()
})

render(
  <ApolloProvider client={client}>
    <ThemeProvider>
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:articleuuid" element={<Article />} />
          </Routes>
      </BrowserRouter>,
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
