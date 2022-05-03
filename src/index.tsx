import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import store from './redux/store';
if (process.env.NODE_ENV !== "development"){
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
  console.warn = () => {}
  console.trace = () => {}
  console.info = () => {}
  console.dirxml = () => {}
  console.dir = () => {}
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();