import React, {Component} from 'react';
import gql from "graphql-tag";
import {Query, Mutation, Subscription} from 'react-apollo'
import './App.css';


const GET_CHANELS = gql`
    {
        channels {
            id,
            name,
            messages {
                id,
                text
            }
        }
    }
`;

const GET_CHANEL = gql`
    query getChanel($id: ID!) {
        channel(id: $id) {
            id
            name
            messages {
                id
                text
            }
        }
    }
`;

const ADD_MESSAGE = gql`
    mutation setMessage($message:  MessageInput!) {
        addMessage(message: $message) {
            id,
            text
        }
    }

`;

const SUBSCRIPTION = gql`
    subscription messageWasAdded($chanelId: ID!) {
        messageAdded(channelId: $chanelId) {
            id,
            text
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
                <div>
                    <Query query={GET_CHANEL} variables={{id: "1"}}>
                        {({ loading, error, data, subscribeToMore }) => {
                            if (loading) return "Loading...";
                            if (error) return `Error! ${error.message}`;
                            const messages = data.channel.messages;
                            subscribeToMore({
                                document: SUBSCRIPTION,
                                variables: { chanelId: "1" },
                                updateQuery: (prev, { subscriptionData }) => {
                                    if (!subscriptionData.data) return prev;
                                    const newMessageItem = subscriptionData.data.messageAdded;
                                    console.log(prev.channel.messages, newMessageItem);
                                    return Object.assign({}, prev, {
                                        channel: {
                                            messages: [newMessageItem, ...prev.channel.messages]
                                        }
                                    });
                                }
                            });

                            return (
                                <ul>
                                    {messages.map(message => (
                                        <li key={message.id}>{message.text}</li>
                                    ))}
                                </ul>
                            );
                        }}
                    </Query>

                    <Mutation mutation={ADD_MESSAGE}>
                        {(setMessage, { data }) => {
                            let input;
                            return (
                            <div>
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        setMessage({ variables: { message: {channelId: "1", text: input.value} } });
                                        input.value = "";
                                    }}
                                >
                                    <input
                                        ref={node => {
                                            input = node;
                                        }}
                                    />
                                    <button type="submit">Add Message</button>
                                </form>
                            </div>
                        )}}
                    </Mutation>

                    {/*<Subscription*/}
                        {/*subscription={SUBSCRIPTION}*/}
                        {/*variables={{ chanelId: "1" }}>*/}
                        {/*{({ data, loading }) => {*/}
                            {/*console.log(data, loading);*/}
                            {/*return (*/}
                                {/*<h4>New comment</h4>*/}
                            {/*)*/}
                        {/*}}*/}
                    {/*</Subscription>*/}

                </div>
            </div>
        );
    }
}

export default App;