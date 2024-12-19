import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login( $password: String!, $email: String!) {
        login(password: $password, email: $email) {
            token
            user {
                _id
                username
                email
                savedBooks {
                    bookId
                    title
                    authors
                    description
                    image
                    link
                }
                bookCount
            }
        }
    }
`

export const CREATE_USER = gql`
    mutation createUser( $password: String!, $email: String!, $username: String!) {
        createUser( password: $password, email: $email, username: $username) {
            token
            user {
                _id
                username
                email
                savedBooks {
                    bookId
                    title
                    authors
                    description
                    image
                    link
                }
                bookCount
            }
        }
    }
`

export const SAVE_BOOK = gql`
    mutation saveBook( $bookData: BookInput!) {
        saveBook( bookData: $bookData) {
            _id
            username
            email
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
            bookCount
        }
    }
`

export const REMOVE_BOOK = gql`
    mutation removeBook( $bookId: String!) {
        removeBook( bookId: $bookId) {
            _id
            username
            email
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
            bookCount
        }
    }
`