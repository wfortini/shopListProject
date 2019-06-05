import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import Routes from './Routes';
import ReduxThunk from 'redux-thunk';

export default props => (
    <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
    </Provider>
);