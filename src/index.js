import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerPicsServiceWorker from './registerPicsServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerPicsServiceWorker();
