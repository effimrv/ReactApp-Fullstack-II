import React, { useEffect, useState } from 'react';

const AdminUsers = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    try {
      const list = JSON.parse(localStorage.getItem('usuarios') || '[]');
      setUsuarios(list);
    } catch {
      setUsuarios([]);
    }
  }, []);

  const eliminar = (id) => {
    if (!confirm('Eliminar usuario?')) return;
    const list = usuarios.filter(u => u.id !== id);
    localStorage.setItem('usuarios', JSON.stringify(list));
    setUsuarios(list);
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
                  <div style={{width:48, height:48, borderRadius:8, background:'#f1f3f5', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700}}>
                    {u.nombre ? u.nombre.split(' ').map(n=>n[0]).slice(0,2).join('') : u.email[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="fw-semibold">{u.nombre}</div>
                    <div className="small text-muted">{u.email}</div>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="small text-muted">Registrado: {u.fechaRegistro ? new Date(u.fechaRegistro).toLocaleDateString() : '-'}</div>
                  <div className="small text-muted">Rol: {u.role || (u.email === 'admin@admin.com' ? 'admin' : 'user')}</div>
                  <div className="d-flex gap-2 mt-2">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(u.id)}>Eliminar</button>
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
    </div>
  );
};

export default AdminUsers;
