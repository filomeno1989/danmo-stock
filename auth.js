const AUTH = {
  sessao: null,

  init() {
    const s = sessionStorage.getItem('dss_user');
    if (s) this.sessao = JSON.parse(s);
    return this.sessao;
  },

  async login(usuario, senha) {
    const url = `${SUPABASE_URL}/rest/v1/utilizadores?usuario=eq.${encodeURIComponent(usuario)}&senha=eq.${encodeURIComponent(senha)}&ativo=eq.true&select=*`;
    const r = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    const dados = await r.json();
    if (dados && dados.length > 0) {
      this.sessao = dados[0];
      sessionStorage.setItem('dss_user', JSON.stringify(dados[0]));
      return dados[0];
    }
    return null;
  },

  logout() {
    this.sessao = null;
    sessionStorage.removeItem('dss_user');
    window.location.href = 'index.html';
  },

  exigir(niveis = []) {
    this.init();
    if (!this.sessao) {
      window.location.href = 'index.html';
      return false;
    }
    if (niveis.length > 0 && !niveis.includes(this.sessao.nivel)) {
      window.location.href = 'index.html';
      return false;
    }
    return true;
  },

  isAdmin()  { return this.sessao?.nivel === 'admin'; },
  isGestor() { return ['admin','gestor'].includes(this.sessao?.nivel); },
  nome()     { return this.sessao?.nome || ''; },
  nivel()    { return this.sessao?.nivel || ''; },
  id()       { return this.sessao?.id || null; }
};
