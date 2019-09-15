import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './components/general/Header';
import Body from './components/general/Body';

import configureStore from './store/configureStore';

import 'normalize.css/normalize.css';
import './styles/style.scss';

const App = () => (
    <Provider store={configureStore()}>
        <Header />
        <Router>
            <Switch>
                <Body />
            </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
