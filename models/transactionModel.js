const supabase = require('../config/supabaseClient.js');

const transactionModel = {
  getAllTransactionsByUserId: async (user_id) => {
    const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user_id);

    return { data, error }
  },

  insertTransaction: async (user_id, name, type, amount) => {
    const { data, error } = await supabase
    .from('transactions')
    .insert([{ user_id, name, type, amount }])
    .select();

    return { data, error }
  },

  updateTransaction: async (id, name, type, amount) => {
    const { data, error } = await supabase
    .from('transactions')
    .update({ name, type, amount })
    .eq('id', id)
    .select();

    return { data, error }
  },

  deleteTransaction: async (id) => {
    const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);
    
    return error
  }
}

module.exports = transactionModel