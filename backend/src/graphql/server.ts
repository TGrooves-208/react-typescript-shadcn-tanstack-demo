import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';

// Create executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Create GraphQL Yoga server
export const graphqlServer = createYoga({
  schema,
  // GraphQL endpoint path
  graphqlEndpoint: '/api/v2/graphql',
  // Enable GraphQL Playground in development
  landingPage: false,
  // Custom context (if needed for authentication later)
  context: async ({ request }) => {
    return {
      // Add any context data here (like user auth)
    };
  },
});