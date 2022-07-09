import { useState } from "react";
import { Grid, TextField } from "@mui/material";

import Header from "./Header";
import Footer from '../Footer/Footer'
import './Autocomplete.css'
import DataConnect from "./DataConnect";
const AutoComplete = () => {
    const [suggestion, setSuggestion] = useState("");
    return (
        <>
            <Header />
            <Grid container direction="column" alignItems="center" justifyContent="center">
                <TextField id="filled-basic" label="articles" variant="filled" type="text" onChange={(e) => setSuggestion(e.target.value)} value={suggestion} />
            </Grid>
            <div style={{margin: "20px"}}>
            <DataConnect keyword={suggestion} />
            </div>
            <Footer />
        </>
    )
}
export default AutoComplete