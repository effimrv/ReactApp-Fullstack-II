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
        .quick-admin-modal { 
          position: fixed; 
          inset: 0; 
          z-index: 3000; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          padding: 20px;
        }
        .quick-admin-backdrop { 
          position: absolute; 
          inset: 0; 
          background: rgba(0,0,0,0.7); 
          backdrop-filter: blur(4px);
        }
        /* Force a solid, high-contrast dialog background so text is always readable */
        .quick-admin-dialog {
          position: relative;
          width: 380px;
          max-width: 90vw;
          z-index: 3100;
          background: linear-gradient(145deg, rgba(10,25,15,0.98), rgba(5,15,10,0.98)) !important;
          color: #ffffff !important;
          border: 2px solid rgba(0,255,68,0.3);
          box-shadow: 
            0 20px 60px rgba(0,0,0,0.8),
            0 0 30px rgba(0,255,68,0.2);
          border-radius: 1rem;
          padding: 1.5rem !important;
          margin: auto;
        }
        .quick-admin-dialog h5 { 
          color: #fff; 
          font-weight: 700;
          text-align: center;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }
        .quick-admin-dialog p { 
          color: rgba(255,255,255,0.9); 
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .quick-admin-dialog strong { 
          color: var(--primary-color); 
          text-shadow: 0 0 8px rgba(0,255,68,0.3);
        }
        .quick-admin-dialog .btn-secondary { 
          background: rgba(255,255,255,0.1); 
          border: 2px solid rgba(255,255,255,0.3); 
          color: #fff;
          border-radius: 0.75rem;
          padding: 0.6rem 1.2rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .quick-admin-dialog .btn-secondary:hover {
          background: rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.5);
          transform: translateY(-1px);
        }
        .quick-admin-dialog .btn-danger { 
          background: linear-gradient(135deg, #0080ff, #0066cc); 
          color: #fff; 
          border: none;
          border-radius: 0.75rem;
          padding: 0.6rem 1.2rem;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(0,128,255,0.3);
          transition: all 0.3s ease;
        }
        .quick-admin-dialog .btn-danger:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,128,255,0.4);
        }
        .quick-admin-dialog .d-flex {
          gap: 1rem;
        }
      `}</style>
    </div>
  );
};

export default QuickAdminModal;
