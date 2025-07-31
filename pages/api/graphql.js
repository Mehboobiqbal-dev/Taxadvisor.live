import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from './schema';

const resolvers = {
  Query: {
    blogs: async () => {
      // Implementation goes here
    },
    blog: async (parent, { id }) => {
      // Implementation goes here
    },
    comments: async (parent, { blogId }) => {
      // Implementation goes here
    },
  },
  Subscription: {
    blogAdded: {
      subscribe: () => pubsub.asyncIterator(['BLOG_ADDED'])
    },
    commentAdded: {
      subscribe: (parent, { blogId }) => pubsub.asyncIterator([`COMMENT_ADDED_${blogId}`])
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: '/api/graphql',
  }
});

export const config = {
  api: {
    bodyParser: false,
  }
};

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export default handler;

