import { ApolloServer, gql } from 'apollo-server';

//schema
const typeDefs = gql`
    type Query {
        hello: String
    }
`;

//resolver
const resolvers = {
    Query:{
        hello: (parent, args, context, info) => {
            return "world"
        }
    }
}


//function apollo-server
const startApolloServer = async (typeDefs, resolver) =>{
    const server = new ApolloServer({ typeDefs, resolvers});
    const { url } = await server.listen(); // { url } = { url: ...., port: ...}
    console.log(`Server ready at ${url}`);
};