import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
// because robots export is not default, need to destructure using brackets


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
