import React from "react";
import {BrowserRouter} from 'react-router-dom'
import { ThemeProvider } from "@material-ui/core";
import Menu from './core/Menu'
import theme from "./theme";
import MainRouter from './MainRouter'

const App = () => {
    return(
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <MainRouter />
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App;