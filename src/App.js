// App.js
import React from 'react';
import ThemeCustomization from "./themes";
import ThemeRoutes from "./routes";
import Typography from "@mui/material/Typography";

const App = () => {
    return (
        <ThemeCustomization>
            <ThemeRoutes/>
        </ThemeCustomization>
        <Typography>Test Ci/Cd Peplines</Typography>
    )
};
export default App;
