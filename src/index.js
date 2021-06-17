import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ThemeProvider, createMuiTheme} from "@material-ui/core";
import {Provider} from "react-redux";
import store from "./redux/store/store";

let theme = createMuiTheme({
  palette : {
    primary : {
      main: '#0A1D37'
    },
    secondary : {
      main: '#D99879'
    },
    warning : {
      main: "#FFD8CC"
    }
  }
})

ReactDOM.render(

  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
  
  
  ,document.getElementById('root')
);