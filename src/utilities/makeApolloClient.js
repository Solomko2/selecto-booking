import ApolloClient from 'apollo-client';
import {ApolloLink} from "apollo-link";
import {createHttpLink} from "apollo-link-http";
import {InMemoryCache} from 'apollo-cache-inmemory';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import {split} from 'apollo-link';

function makeApolloClient(scapholdUrl) {
    const httpUri = `http://localhost:4000/graphql`;
    const wsUri = `ws://localhost:4000/subscriptions`;

    const httpLink = createHttpLink({uri: httpUri});

    const middlewareLink = new ApolloLink((operation, forward) => {
        operation.setContext({
            headers: {
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NjYXBob2xkLmF1dGgwLmNvbS8iLCJzdWIiOiJnaXRodWJ8ODc2OTA5NSIsImF1ZCI6Ikp0Z2Z5WklRMnBKajlySThFOWU2MTdoUWNrMFJueEFuIiwiaWF0IjoxNTI3MDk0ODIwLCJleHAiOjE1Mjk2ODY4MjB9.6TL8XKFVLxw87SXUGSra2Xpjq0imcHWtl1udpA3Ycjk'
            }
        });
        return forward(operation);
    });

    const newlink = middlewareLink.concat(httpLink);

    const wsLink = new WebSocketLink({
        uri    : wsUri,
        options: {
            reconnect: true
        }
    });

    const link = split(
        ({query}) => {
            const {kind, operation} = getMainDefinition(query);
            return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        newlink
    );

    const cache = new InMemoryCache();

    const client = new ApolloClient({
        link,
        cache
    });

    return client;
}

export default makeApolloClient;
