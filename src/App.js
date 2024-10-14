// App.js
import React from 'react';
import ThemeCustomization from "./themes";
import ThemeRoutes from "./routes";
import Typography from "@mui/material/Typography";

const App = () => {
    return (
        <Typography>Test Ci/Cd Peplines</Typography>

            <ThemeCustomization>
                    <ThemeRoutes/>
                </ThemeCustomization>

    )
};
export default App;
