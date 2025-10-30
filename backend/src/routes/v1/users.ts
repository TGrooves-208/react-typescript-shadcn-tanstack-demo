import express from 'express';
import { supabase, User } from '../../config/supabase.js';

const router = express.Router();

// GET /api/v1/users - Get all users
router.get('/users', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({
      success: true,
      data,
      count: data?.length || 0,
      message: 'Users retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/v1/users/:id - Get user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(500).json({ error: error.message });
    }

    res.json({
      success: true,
      data,
      message: 'User retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /api/v1/users - Create new user
router.post('/users', async (req, res) => {
  try {
    const { name, email, profession, company } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ 
        error: 'Name and email are required' 
      });
    }

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, profession, company }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return res.status(409).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({
      success: true,
      data,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// PUT /api/v1/users/:id - Update user
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, profession, company } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ 
        error: 'Name and email are required' 
      });
    }

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
        return res.status(404).json({ error: 'User not found' });
      }
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: error.message });
    }

    res.json({
      success: true,
      data,
      message: 'User updated successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// DELETE /api/v1/users/:id - Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(500).json({ error: error.message });
    }

    res.json({
      success: true,
      data,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;