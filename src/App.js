import React, {Component} from 'react';
import gql from "graphql-tag";
import {Query, Mutation, Subscription} from 'react-apollo'
//withApollo, graphql, compose,
import './App.css';

// function getRandomInt(min, max) {
//     return (Math.floor(Math.random() * (max - min)) + min).toString();
// }

const GET_TODOS = gql`
    {
        viewer {
            allTodos {
                edges {
                    node {
                        name
                        id
                        createdAt,
                        modifiedAt
                    }
                }
            }
        }
    }
`;

const GREATE_TODO = gql`
    mutation newTodo($todo: CreateTodoInput!) {
        createTodo(input: $todo) {
            changedEdge {
                node {
                    name
                    id
                    createdAt,
                    modifiedAt
                }
            }
        }
    }
`;

const SUBSCRIPTION_GREATE_TODO = gql`
    subscription subsTodo($event: [TodoMutationEvent]!) {
        subscribeToTodo(mutations: $event) {
            edge {
                node {
                    name,
                    id,
                    createdAt
                }
            }
        }
    }
`;


class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Subscription subscription={SUBSCRIPTION_GREATE_TODO} variables={{event: ["createTodo"]}}>
                    {({ data, loading }) => {
                        return (
                            <h4>New comment: {!loading}</h4>
                        )
                    }}
                </Subscription>
                <Mutation
                    mutation={GREATE_TODO}
                    update={(cache, {data}) => {
                        const todosQuery = cache.readQuery({query: GET_TODOS});
                        const edges = todosQuery.viewer.allTodos.edges;

                        const newTodos = data.createTodo.changedEdge;

                        const newData = Object.assign({}, todosQuery);

                        newData.viewer.allTodos.edges = [newTodos, ...edges];

                        cache.writeQuery({
                            query: GET_TODOS,
                            data: newData
                        });
                    }}>
                    {(newTodo, {data}) => {
                        let input;
                        return (
                            <div>
                                <form
                                    className={'form'}
                                    onSubmit={e => {
                                        e.preventDefault();
                                        newTodo({variables: {todo: {name: input.value}}});
                                        input.value = "";
                                    }}
                                >
                                    <input
                                        ref={node => {
                                            input = node;
                                        }}
                                    />
                                    <button type="submit">Add Todo</button>
                                </form>
                            </div>
                        )
                    }}
                </Mutation>
                <Query query={GET_TODOS}>
                    {({loading, error, data, subscribeToMore}) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;
                        return (
                            <ul>

                                {data.viewer.allTodos.edges.map(({node}) => (
                                    <li key={node.id}>
                                        <span>Id: {node.id} </span>
                                        <span>Name: {node.name}</span>
                                    </li>
                                ))}
                            </ul>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default App;