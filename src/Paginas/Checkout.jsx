import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { localStorageService } from '../Data/localStorage';

const Checkout = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [aplicado, setAplicado] = useState(false);
  const [descuentoPorcentaje, setDescuentoPorcentaje] = useState(0);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    setItems(localStorageService.obtenerCarrito());
    // Cargar cupon persistente si existe
    const cupon = localStorageService.obtenerCupon();
    if (cupon && cupon.porcentaje) {
      setDescuentoPorcentaje(cupon.porcentaje);
      setAplicado(true);
      setCodigo(cupon.codigo || '');
    }
  }, []);

  const calcularSubtotal = () => items.reduce((t, i) => t + (i.precio * i.cantidad), 0);
  const calcularEnvio = () => calcularSubtotal() > 200000 ? 0 : 3000;
  const calcularDescuento = (subtotal) => {
    if (!aplicado || descuentoPorcentaje <= 0) return 0;
    return Math.round(subtotal * (descuentoPorcentaje / 100));
  };

  const calcularTotal = () => calcularSubtotal() - calcularDescuento(calcularSubtotal()) + calcularEnvio();

  const handleResultado = (aceptada) => {
    const subtotal = calcularSubtotal();
    const envio = calcularEnvio();
  const descuento = calcularDescuento(subtotal);
  const total = calcularTotal();

    const orden = {
      id: `ord_${Date.now()}`,
      fecha: new Date().toISOString(),
      items,
      subtotal,
  descuento,
      envio,
      total,
      estado: aceptada ? 'accepted' : 'rejected'
    };

    // Guardar la orden aunque sea rechazada (para registro), y si fue aceptada vaciar el carrito
    localStorageService.crearOrden(orden);

    if (aceptada) {
      localStorageService.vaciarCarrito();
      window.dispatchEvent(new Event('storage'));
    }

    // Navegar a la pantalla de resultado, pasando estado
    navigate('/order-result', { state: { ordenId: orden.id, estado: orden.estado } });
  };

  if (!items || items.length === 0) {
    return (
      <div className="container py-5">
        <h2>No hay productos en el carrito</h2>
        <p>Agrega productos antes de proceder al pago.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Proceder al Pago</h1>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="mb-3">Resumen de compra</h5>
          <ul className="list-unstyled mb-3">
            {items.map(it => (
              <li key={it.id} className="d-flex justify-content-between py-2 border-bottom">
                <span>{it.nombre} x {it.cantidad}</span>
                <strong>${(it.precio * it.cantidad).toLocaleString('es-CL')}</strong>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal</span>
            <strong style={{color: '#ffffff'}}>${calcularSubtotal().toLocaleString('es-CL')}</strong>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Envío</span>
            <strong style={{color: calcularEnvio() === 0 ? '#ffffff' : 'inherit'}}>{calcularEnvio() === 0 ? 'Gratis' : `$${calcularEnvio().toLocaleString('es-CL')}`}</strong>
          </div>

          {/* Bloque de código de descuento: debajo de Envío y encima de Total */}
          <div className="mb-3">
            <div className="d-flex align-items-center mb-2 gap-2">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Ingresar código"
                value={codigo}
                onChange={e => setCodigo(e.target.value)}
                style={{maxWidth: '160px'}}
                disabled={aplicado}
              />
              <button className="btn btn-sm btn-outline-primary" onClick={() => {
                const val = (codigo || '').trim();
                if (!val) { setMensaje({ type: 'error', text: 'Ingresa un código.' }); return; }
                if (val.toLowerCase() === 'levelup10'.toLowerCase()) {
                  setDescuentoPorcentaje(10);
                  setAplicado(true);
                  setMensaje({ type: 'success', text: 'Cupón aplicado :)' });
                } else {
                  setMensaje({ type: 'error', text: 'Código inválido.' });
                }
              }} disabled={aplicado}>Aplicar</button>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => {
                setAplicado(false);
                setCodigo('');
                setDescuentoPorcentaje(0);
                setMensaje({ type: 'info', text: 'Cupón eliminado.' });
              }} disabled={!aplicado}>Quitar</button>
            </div>
            {mensaje && (
              <div className={`alert ${mensaje.type === 'error' ? 'alert-danger' : mensaje.type === 'success' ? 'alert-success' : 'alert-info'} p-2 mb-2`} role="alert" style={{fontSize: '0.9rem'}}>
                {mensaje.text}
              </div>
            )}

            {aplicado && (
              <div className="d-flex justify-content-between text-success mb-2">
                <span>Descuento ({descuentoPorcentaje}%)</span>
                <strong>-${calcularDescuento(calcularSubtotal()).toLocaleString('es-CL')}</strong>
              </div>
            )}
          </div>
          <hr />
          <div className="d-flex justify-content-between mb-0 fw-bold fs-5">
            <span>Total</span>
            <span>${calcularTotal().toLocaleString('es-CL')}</span>
          </div>
        </div>
      </div>

      <div className="d-flex gap-3">
        <button className="btn btn-success" onClick={() => handleResultado(true)}>Aceptar pago (simular éxito)</button>
        <button className="btn btn-danger" onClick={() => handleResultado(false)}>Rechazar pago (simular fallo)</button>
      </div>
    </div>
  );
};

export default Checkout;
