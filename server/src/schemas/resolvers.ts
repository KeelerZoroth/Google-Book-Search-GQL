import User, { UserDocument } from "../models/User.js";
import { signToken, AuthenticationError } from "../services/auth.js";


interface CreateUserArgs {
    username: string;
    email: string;
    password: string;
}

interface LoginUserArgs {
    email: number;
    password: string;
}

interface SaveBookArgs {
    bookId: string;
    title: string;
    authors: string[];
    description: string;
    image: string;
    link: string;
}


const resolvers = {
    Query:{
        me: async (_parent: any, _args: any, context: any): Promise<UserDocument | null> => {
            if(context.user){
                const user = await User.findOne({ _id: context.user._id });
                return user
            }
            throw AuthenticationError
        },
    },

    Mutation: {
        createUser: async (_parent: any, { username, email, password }: CreateUserArgs): Promise<{token: string, user: UserDocument}> => {
            const user = await User.create({ username, email, password });
          
            const token = signToken(user.username, user.password, user._id);
            
            return { token, user };
        },

        login: async (_parent: any, { password, email }: LoginUserArgs): Promise<{token: string, user: UserDocument}> => {
            const user = await User.findOne({ email });
            
            if (!user) {
                throw new AuthenticationError('Could not authenticate user.');
            }
            
            const correctPw = await user.isCorrectPassword(password);
          
            
            if (!correctPw) {
                throw new AuthenticationError('Could not authenticate user.');
            }
        
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        saveBook: async (_parent: any, { bookData }: { bookData: SaveBookArgs }, context: any): Promise<UserDocument | null> => {
            if(context.user){
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: { ...bookData } } },
                    { new: true, runValidators: true }
                )
            }
            throw AuthenticationError
        },

        removeBook: async (_parent: any, { bookId }: { bookId: string }, context: any): Promise<UserDocument | null> => {
            if(context.user){
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true, runValidators: true }
                )
            }
            throw AuthenticationError
        }
    }
}


export default resolvers