import gql from "graphql-tag";

export const mainInfo = gql`
    fragment User on User {
        id,
        username,
        email,
        last_login
    }
`;