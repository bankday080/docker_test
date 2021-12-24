import { ApolloServer, gql } from 'apollo-server';
//import { assertValidSDL } from 'graphql/validation/validate';

const user = [
    {name: "phusit", sex: "Male", id: 1, password: "ab123"},
    {name: "pak", sex: "Male", id: 2, password: "ab123"},
    {name: "fluke", sex: "Male", id: 3, password: "ab123"},
    {name: "puame", sex: "Male", id: 4, password: "ab123"},

];

const books = [
    {title: "The loard", userID: 1, id: 0},
    {title: "The of", userID: 2, id: 1},
    {title: "The Ring", userID: 4, id: 2},
    {title: "The Bank", userID: 3, id: 3},
];

const location = [
    {address: "13", city: "phayao",userID:1, id:0},
    {address: "1", city: "chiangrai",userID:2, id:1},
    {address: "112/1", city: "phayao",userID:3, id:2},
    {address: "20", city: "phayao",userID:4, id:3},
];

//schema
const typeDefs = gql`
    type Query {
        hello: String
        hi: String
        users: [User]
        user(name: String): User
    }
    type User{
        id: ID
        name: String
        password: String
        sex: String
        books: [Book]
        location: [Location]
    }
    type Book {
        id: ID
        title: String
    }
    type Location {
        id: ID
        address: String
        city: String
    }
    type Mutation {
        addUser (name: String, sex: String): User
        creataUser(name: String, password: String): User
    }
`;

//resolver
const resolvers = {
    Query:{
        hello: (parent, args, context, info) => {
            return "dee";
        },
        hi: (parent, args, context, info) => {
            return "bye";
        },
        users: (parent, args, context, info) => {
            return user;
        },
        user: (parent, args, context, info) => {
            return user.find( user => user.name === args.name);
        },
       
    },
    User: {
        books: ({ id }, args, context, info) => {
            return books.filter(book => book.userID == id);
        },
        location: ({ id }, args, context, info) => {
            return location.filter(location => location.userID == id);
        }
    },
    Mutation: {
        addUser: (parent, args, context, info) => {
            const {name, sex} = args; //const name = args.name;

            //add info to database
            user.push({name: name, sex: sex});
            return {name: name, sex: sex};

        }
    }
};


//function apollo-server
const startApolloServer = async (typeDefs, resolver) => {
    const server = new ApolloServer({ typeDefs, resolvers});
    const { url } = await server.listen(); // { url } = { url: ...., port: ...}
    console.log(`Server ready at ${url}`);
};
//call function
startApolloServer(typeDefs, resolvers);