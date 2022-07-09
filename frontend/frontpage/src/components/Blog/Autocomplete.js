import { useState } from "react";
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Header from "./Header";
import Footer from '../Footer/Footer'
import './Autocomplete.css'
import DataConnect from "./DataConnect";
const AutoComplete = () => {
    const [suggestion, setSuggestion] = useState("")
    const [articles, setArticles] = useState({})
    console.log(suggestion);
    return (
        <>
            <Header />
            <Box sx={{ input: { textAlign: "center" } }}>
                <input type="text"
                    onChange={(e) => setSuggestion(e.target.value)} value={suggestion} placeholder="article"/>
            </Box>
            <DataConnect keyword={suggestion} />
            <Footer />
        </>
    )
}
export default AutoComplete