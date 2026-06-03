function fmtNum(n, dec = 2) {
  if (n === null || n === undefined || n === '') return '—';
  return Number(n).toLocaleString('pt-MZ', {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec
  });
}

function fmtData(d) {
  if (!d) return '—';
  const dt = new Date(d + 'T00:00:00');
  return dt.toLocaleDateString('pt-MZ', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
}

function hoje() {
  return new Date().toISOString().split('T')[0];
}

function showToast(msg, tipo = 'success') {
  const cores = {
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:9999;
    background:${cores[tipo] || cores.info};
    color:#fff; padding:12px 20px; border-radius:8px;
    font-size:14px; font-weight:600;
    box-shadow:0 4px 12px rgba(0,0,0,0.3);
    animation: fadeIn .3s ease;
  `;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}

async function confirmar(msg) {
  return new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed; inset:0; background:rgba(0,0,0,0.6);
      z-index:9998; display:flex; align-items:center; justify-content:center;
    `;
    overlay.innerHTML = `
      <div style="background:#0f2044; border:1px solid #1e3a6e; border-radius:12px;
                  padding:28px 32px; max-width:380px; text-align:center;">
        <p style="color:#e2e8f0; font-size:15px; margin:0 0 20px">${msg}</p>
        <div style="display:flex; gap:12px; justify-content:center;">
          <button id="btn-nao" style="padding:8px 24px; border-radius:6px;
            border:1px solid #334155; background:transparent;
            color:#94a3b8; cursor:pointer; font-size:14px;">Cancelar</button>
          <button id="btn-sim" style="padding:8px 24px; border-radius:6px;
            border:none; background:#f59e0b;
            color:#0a1628; cursor:pointer; font-weight:700; font-size:14px;">Confirmar</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('#btn-sim').onclick = () => { overlay.remove(); resolve(true); };
    overlay.querySelector('#btn-nao').onclick = () => { overlay.remove(); resolve(false); };
  });
}
