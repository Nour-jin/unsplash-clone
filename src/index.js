import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import CONFIG from "./components/Api"

import "./index.css"


ReactDOM.render(
  <React.StrictMode>
    <App
     appId={CONFIG.__APP_ID__}
     baseUrl={CONFIG.BASE_URL}/>
  </React.StrictMode>,
  document.getElementById('root')
);


