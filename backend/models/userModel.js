const supabase = require('../config/supabaseClient.js');

const userModel = {
  getUser: async (username, email) => {
    const { data, erro } = await supabase
    .from('users')
    .select('*')
    .or(`username.eq.${username},email.eq.${email}`);
    
    return { data, erro }
  },

  insertUser: async (username, email, password) => {
    const { error } = await supabase
    .from('users')
    .insert([{ username, email, password }]);

    return error
  },

  loginUser: async (username) => {
    const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

    return { data, error }
  }
}

module.exports = userModel