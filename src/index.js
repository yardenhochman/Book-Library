import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";
import { create } from "jss";
import React from 'react';
import ReactDOM from 'react-dom';
import JssProvider from "react-jss/lib/JssProvider";
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const styleNode = document.createComment("insertion-point-jss");
document.head.insertBefore(styleNode, document.head.firstChild);
const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
jss.options.insertionPoint = "insertion-point-jss";

const Root = () => (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <App />
  </JssProvider>
);
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
