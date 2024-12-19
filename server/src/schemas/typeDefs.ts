const typeDefs = `
    type Book {
        bookId: String
        title: String
        authors: [String]
        description: String
        image: String
        link: String
    }


    input BookInput {
        bookId: String
        title: String
        authors: [String]
        description: String
        image: String
        link: String
    }

    type User {
        _id: ID
        username: String
        email: String
        savedBooks: [Book]
        bookCount: Int
    }


    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(password: String!, email: String!): Auth
        saveBook(bookData: BookInput!): User
        removeBook(bookId: String!): User
    }


`

export default typeDefs