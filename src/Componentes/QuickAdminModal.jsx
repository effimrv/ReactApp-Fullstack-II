import React from 'react';

const QuickAdminModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="quick-admin-modal">
      <div className="quick-admin-backdrop" onClick={onClose} />
      <div className="quick-admin-dialog card shadow-sm p-3">
        <h5 className="mb-2">Entrar como admin</h5>
  <p className="small text-muted">Vas a iniciar sesión como <strong>ara.escobar@duoc.cl</strong>. ¿Deseas continuar?</p>
        <div className="d-flex justify-content-end gap-2 mt-3">
          <button className="btn btn-sm btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-sm btn-danger" onClick={onConfirm}>Entrar</button>
        </div>
      </div>

      <style>{`
        .quick-admin-modal { position: fixed; inset: 0; z-index: 3000; display: flex; align-items: center; justify-content: center; }
        .quick-admin-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.55); }
        /* Force a solid, high-contrast dialog background so text is always readable */
        .quick-admin-dialog {
          position: relative;
          width: 320px;
          max-width: calc(100% - 32px);
          z-index: 3100;
          background: rgba(6,18,14,0.98) !important; /* solid dark surface */
          color: #ffffff !important;
          border: 1px solid rgba(0,255,68,0.06);
          box-shadow: 0 14px 40px rgba(0,0,0,0.7);
          border-radius: 0.6rem;
        }
        .quick-admin-dialog h5 { color: #fff; }
        .quick-admin-dialog p { color: rgba(255,255,255,0.9); }
        .quick-admin-dialog strong { color: var(--primary-light); }
        .quick-admin-dialog .btn-secondary { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.06); color: #fff; }
        .quick-admin-dialog .btn-danger { background: var(--danger-color); color: #fff; border: none; }
      `}</style>
    </div>
  );
};

export default QuickAdminModal;
