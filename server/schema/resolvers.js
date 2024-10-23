const User = require("../models/User")


const resolvers = {

    Query: {
        allUsers: async () => {
            const data = await User.find({});
            console.log("User Data: ", data);
            
            return data
        },
        findUser: async (_parent, args, context) => {
            //  findUser: async (_parent, { email }, context) => {
            console.log("incoming Data: ", args) // -> { email: '' }
            
            const user = await User.findOne({ email: args.email });
            console.log("User Data: ", user);
            return user
        }   

    }, 

    Mutation: {

    }

}

