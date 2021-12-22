import { ApolloServer, gql } from 'apollo-server';

const  machines = [
    { id : "01", brand: "Incubator_A",vertion: "v.4"},
    { id : "02", brand: "Incubator_B",vertion: "v.6"},
    { id : "03", brand: "Incubator_C",vertion: "v.2"},
];
const  eggs = [
    { egg_id : "01",date : "06/11/2545"},
    { egg_id : "02",date : "07/01/2649"},
];
//schema
const typeDefs = gql`
    type Query {
        machines:[Machine]
        machine(id: String) : Machine
        eggs:[Egg]
        egg(egg_id: String) : Egg

    }
    type Machine{
        id : String
        brand : String
        vertion : String
    }
    type Egg{
        egg_id : String
        date : String

    }
`;

//resolver
const resolvers = {
    Query:{
        machines: (parent,args,context ,info)=>{
            return machines;
        },
        machine: (parent,args,context ,info)=>{
            return machine.find(machine=> machine.id === args.id);
        },
        eggs: (parent,args,context ,info)=>{
            return eggs;
        },
        egg: (parent,args,context ,info)=>{
            return egg.find(egg=> egg.egg_id === args.egg_id);
        },

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
