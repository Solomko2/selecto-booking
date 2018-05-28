import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


import { ApolloProvider } from 'react-apollo';
import makeApolloClient from "./utilities/makeApolloClient";

// import { HttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';

// import { WebSocketLink } from 'apollo-link-ws';
// import { getMainDefinition } from 'apollo-utilities';
// import { split } from 'apollo-link';

// const wsLink = new WebSocketLink({
//     uri: `wss://us-west-2.api.scaphold.io/graphql/api2018`,
//     options: {
//         reconnect: true
//     }
// });

// const httpLink = new HttpLink({ uri: 'https://us-west-2.api.scaphold.io/graphql/api2018' });
// const link = split(
//     // split based on operation type
//     ({ query }) => {
//         const { kind, operation } = getMainDefinition(query);
//         return kind === 'OperationDefinition' && operation === 'subscription';
//     },
//     wsLink,
//     httpLink,
// );


// const client = new ApolloClient({
//     link: httpLink,
//     cache: new InMemoryCache()
// });
const client = makeApolloClient("us-west-2.api.scaphold.io/graphql/api2018");
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root')
);

registerServiceWorker();