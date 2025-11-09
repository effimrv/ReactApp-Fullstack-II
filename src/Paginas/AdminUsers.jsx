import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaExclamationTriangle, FaUser, FaUserCircle } from 'react-icons/fa';

// Función para determinar si un email es de admin
const esEmailAdmin = (email) => {
  const emailsAdmin = [
    'cely.gamer@levelup.com',
    'maca.gamer@levelup.com',
    'benja.gamer@levelup.com'
  ];
  return emailsAdmin.includes(email);
};

const AdminUsers = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem('usuarios') || '[]');
      setUsuarios(list);
    } catch {
      setUsuarios([]);
    }
  }, []);

  const confirmarEliminacion = (usuario) => {
    setUsuarioAEliminar(usuario);
    setShowDeleteModal(true);
  };

  const eliminar = () => {
    if (!usuarioAEliminar) return;
    const list = usuarios.filter(u => u.id !== usuarioAEliminar.id);
    localStorage.setItem('usuarios', JSON.stringify(list));
    setUsuarios(list);
    setShowDeleteModal(false);
    setUsuarioAEliminar(null);
  };

  const cancelarEliminacion = () => {
    setShowDeleteModal(false);
    setUsuarioAEliminar(null);
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Gestión de Usuarios</h2>
        <div className="small text-muted">Total: {usuarios.length}</div>
      </div>

      <div className="row g-4">
        {usuarios.map(u => (
          <div key={u.id} className="col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <div>
                    <div className="fw-semibold" style={{ color: '#00bfff' }}>{u.nombre}</div>
                    <div className="small text-muted">{u.email}</div>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="small text-muted">Registrado: {u.fechaRegistro ? new Date(u.fechaRegistro).toLocaleDateString() : '-'}</div>
                  <div className="small text-muted">Rol: {u.role || (esEmailAdmin(u.email) ? 'admin' : 'user')}</div>
                  <div className="d-flex gap-2 mt-2">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => confirmarEliminacion(u)}>
                      <FaTrashAlt className="me-1" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {usuarios.length === 0 && (
        <div className="text-center py-5">
          <h5>No hay usuarios</h5>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content border-0" style={{ 
              borderRadius: '15px',
              background: 'linear-gradient(135deg, #001a00 0%, #003300 50%, #004d00 100%)',
              boxShadow: '0 0 40px rgba(0, 255, 65, 0.4), 0 0 20px rgba(0, 255, 65, 0.2)',
              border: '1px solid rgba(0, 255, 65, 0.3)'
            }}>
              <div className="modal-header border-0 pb-2">
                <h6 className="modal-title text-warning d-flex align-items-center">
                  <FaExclamationTriangle className="me-2" />
                  Confirmar eliminación
                </h6>
                <button type="button" className="btn-close btn-close-white" onClick={cancelarEliminacion}></button>
              </div>
              <div className="modal-body py-2">
                {usuarioAEliminar && (
                  <div>
                    <p className="mb-3 text-light small">¿Eliminar este usuario?</p>
                    <div className="gaming-card p-2 mb-3" style={{ borderRadius: '10px' }}>
                      <div className="d-flex align-items-center gap-2">
                        <div className="d-flex align-items-center justify-content-center" 
                             style={{
                               width: '32px', 
                               height: '32px', 
                               borderRadius: '50%', 
                               backgroundColor: 'var(--primary-color)',
                               color: 'black',
                               fontSize: '0.8rem',
                               fontWeight: 'bold'
                             }}>
                          <FaUser size={12} />
                        </div>
                        <div>
                          <div className="fw-bold text-light" style={{ fontSize: '0.85rem' }}>
                            {usuarioAEliminar.nombre}
                          </div>
                          <div className="text-muted" style={{ fontSize: '0.7rem' }}>
                            {usuarioAEliminar.email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <small className="text-danger">
                        <FaExclamationTriangle className="me-1" />
                        Acción irreversible
                      </small>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer border-0 pt-2">
                <button type="button" 
                        className="btn btn-sm btn-secondary me-2" 
                        onClick={cancelarEliminacion}
                        style={{ borderRadius: '20px' }}>
                  Cancelar
                </button>
                <button type="button" 
                        className="btn btn-sm btn-danger" 
                        onClick={eliminar}
                        style={{ borderRadius: '20px' }}>
                  <FaTrashAlt className="me-1" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
