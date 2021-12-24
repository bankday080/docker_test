import { ApolloServer, gql } from 'apollo-server';

const users = [
    {name: "phusit", sex: "Male", id: "62021191"}
]

//schema
const typeDefs = gql`
    type Query {
        hello: String
    }
    type User{
        name: String
        sex: String
        id: String
    }
    type Mutation {
        addUser (name: String, sex: String): User
    }
`;

//resolver
const resolvers = {
    Query:{
        hello: (parent, args, context, info) => {
            return "dee";
        },
       
    },
    Mutation: {
        addUser: (parent, args, context, info) => {
            const {name, sex} = args; //const name = args.name;

            //add info to database
            users.push({name: name, sex: sex});
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