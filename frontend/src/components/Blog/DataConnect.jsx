import { useState } from 'react'
import Header from "./Header"
import Footer from '../Footer/Footer'
import ArticleSearch from './ArticleSearch'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const DataConnect = () => {
    const [keyword, setKeyword] = useState("");
    console.log(keyword)
    return(
        <div>
            <Header/>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            display="flex" justifyContent="center"
            >
            <TextField id="fullWidth" fullWidth label="Text to search" variant="filled" onInput={(e) => setKeyword(e.target.value)} value={keyword}/>
            </Box>
            <ArticleSearch keyword={keyword}/>
            <Footer />
        </div>
    )
}
export default DataConnect