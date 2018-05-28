import gql from "graphql-tag";
import * as userFragments from "../fragments";

export const GET_USERS = gql`
    query getAllUsers($ids: [Int!]!) {
        users(ids: $ids) {
            ...User
        }
    },
    ${userFragments.mainInfo}

`;