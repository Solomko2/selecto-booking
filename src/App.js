import React, {Component} from 'react';
import './App.css';
import {Query, Mutation, Subscription} from 'react-apollo'
import gql from "graphql-tag";

const GET_USERS = gql`
    query getAllUsers($ids: [Int!]!) {
        users(ids: $ids) {
            id,
            username,
            email,
            last_login
        }
    }
`;

class App extends Component {
    render() {
        return (
            <div className="App">
                <Query query={GET_USERS} variables={{ids: [1, 2, 3]}}>
                    {({data: {users}, loading, error}) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;

                        console.log(users);
                        return '';
                    }}
                </Query>
            </div>
        );
    }
}

export default App;
