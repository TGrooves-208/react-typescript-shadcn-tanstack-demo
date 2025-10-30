export const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    profession: String
    company: String
    created_at: String!
    updated_at: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    profession: String
    company: String
  }

  input UpdateUserInput {
    name: String
    email: String
    profession: String
    company: String
  }

  type Query {
    # Get all users
    users: [User!]!
    
    # Get user by ID
    user(id: ID!): User
    
    # Search users by company
    usersByCompany(company: String!): [User!]!
    
    # Search users by profession
    usersByProfession(profession: String!): [User!]!
  }

  type Mutation {
    # Create a new user
    createUser(input: CreateUserInput!): User!
    
    # Update an existing user
    updateUser(id: ID!, input: UpdateUserInput!): User!
    
    # Delete a user
    deleteUser(id: ID!): User!
  }
`;