import { supabase } from '../config/supabase.js';

export const resolvers = {
  Query: {
    // Get all users
    users: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
      }

      return data;
    },

    // Get user by ID
    user: async (_: any, { id }: { id: string }) => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // User not found
        }
        throw new Error(`Failed to fetch user: ${error.message}`);
      }

      return data;
    },

    // Search users by company
    usersByCompany: async (_: any, { company }: { company: string }) => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .ilike('company', `%${company}%`)
        .order('created_at', { ascending: true });

      if (error) {
        throw new Error(`Failed to fetch users by company: ${error.message}`);
      }

      return data || [];
    },

    // Search users by profession
    usersByProfession: async (_: any, { profession }: { profession: string }) => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .ilike('profession', `%${profession}%`)
        .order('created_at', { ascending: true });

      if (error) {
        throw new Error(`Failed to fetch users by profession: ${error.message}`);
      }

      return data || [];
    },
  },

  Mutation: {
    // Create a new user
    createUser: async (_: any, { input }: { input: any }) => {
      const { name, email, profession, company } = input;

      const { data, error } = await supabase
        .from('users')
        .insert([{ name, email, profession, company }])
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          throw new Error('Email already exists');
        }
        throw new Error(`Failed to create user: ${error.message}`);
      }

      return data;
    },

    // Update an existing user
    updateUser: async (_: any, { id, input }: { id: string; input: any }) => {
      const { name, email, profession, company } = input;

      const { data, error } = await supabase
        .from('users')
        .update({ 
          name, 
          email, 
          profession, 
          company,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('User not found');
        }
        if (error.code === '23505') {
          throw new Error('Email already exists');
        }
        throw new Error(`Failed to update user: ${error.message}`);
      }

      return data;
    },

    // Delete a user
    deleteUser: async (_: any, { id }: { id: string }) => {
      const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('User not found');
        }
        throw new Error(`Failed to delete user: ${error.message}`);
      }

      return data;
    },
  },
};