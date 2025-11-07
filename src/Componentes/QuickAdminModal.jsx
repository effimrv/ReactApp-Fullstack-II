import React from 'react';

const QuickAdminModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="quick-admin-modal">
      <div className="quick-admin-backdrop" onClick={onClose} />
      <div className="quick-admin-dialog card shadow-sm p-3">
        <h5 className="mb-2">Entrar como admin</h5>
        <p className="small text-muted">Vas a iniciar sesión como <strong>admin@admin.com</strong>. ¿Deseas continuar?</p>
        <div className="d-flex justify-content-end gap-2 mt-3">
          <button className="btn btn-sm btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-sm btn-danger" onClick={onConfirm}>Entrar</button>
        </div>
      </div>

      <style>{`
        .quick-admin-modal { position: fixed; inset: 0; z-index: 3000; display: flex; align-items: center; justify-content: center; }
        .quick-admin-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.45); }
        .quick-admin-dialog { position: relative; width: 320px; max-width: calc(100% - 32px); z-index: 3100; }
      `}</style>
    </div>
  );
};

export default QuickAdminModal;
