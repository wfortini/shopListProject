import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import Routes from './Routes';
import ReduxThunk from 'redux-thunk';
import ApolloProvider from 'react-apollo';
import ApolloClient from 'apollo-client';
import HttpLink from 'apollo-link-http';
import InMemoryCache from 'apollo-cache-inmemory';

const apolloClient = new ApolloClient({
    link: new HttpLink({url: 'localhost:'}),
    cache: new InMemoryCache()
})
export default props => (
    <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <ApolloProvider client={apolloClient} >
             <Routes />
        </ApolloProvider>
    </Provider>
);