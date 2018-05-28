import React, {Component} from 'react';
import './App.css';
import {Query, Mutation, Subscription} from 'react-apollo'

//graphQL
import * as queries from './shared/graphql/user/queries';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Query query={queries.GET_USERS} variables={{ids: [1, 2, 3]}}>
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
