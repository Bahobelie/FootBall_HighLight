import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
               <React.StrictMode>
                   <App/>
               </React.StrictMode>
    </StrictMode>
);
