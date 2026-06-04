const SUPABASE_URL = 'https://czgnbzxoeylicrqjvncd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6Z25ienhvZXlsaWNycWp2bmNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNzcxNzcsImV4cCI6MjA5NDc1MzE3N30.g_msMjIqje6UtMf4Cy-eTodGlRKVWIa5Q0-9s5YpJJw';

const db = {
  async get(tabela, filtros = {}) {
    let url = `${SUPABASE_URL}/rest/v1/${tabela}?select=*`;
    for (const [k, v] of Object.entries(filtros)) {
      url += `&${k}=eq.${encodeURIComponent(v)}`;
    }
    const r = await fetch(url, { headers: headers() });
    return r.json();
  },

  async query(tabela, params = '') {
    const url = `${SUPABASE_URL}/rest/v1/${tabela}?${params}`;
    const r = await fetch(url, { headers: headers() });
    return r.json();
  },

  async insert(tabela, dados) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${tabela}`, {
      method: 'POST',
      headers: { ...headers(), 'Prefer': 'return=representation' },
      body: JSON.stringify(dados)
    });
    return r.json();
  },

  async update(tabela, id, dados) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${tabela}?id=eq.${id}`, {
      method: 'PATCH',
      headers: { ...headers(), 'Prefer': 'return=representation' },
      body: JSON.stringify(dados)
    });
    return r.json();
  },

  async delete(tabela, id) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${tabela}?id=eq.${id}`, {
      method: 'DELETE',
      headers: headers()
    });
    return r.ok;
  }
};

function headers() {
  return {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
  };
}
