import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShippingFast, FaShieldAlt, FaHeadset, FaArrowRight } from 'react-icons/fa';
import ProductoCard from '../Componentes/ProductoCard';
import { obtenerProductos } from '../Data/productos';

const Home = () => {
  const [productosDestacados, setProductosDestacados] = useState([]);

  useEffect(() => {
    const productos = obtenerProductos();
    setProductosDestacados(productos.slice(0, 3));
  }, []);

  const caracteristicas = [
    { icono: <FaShippingFast />, titulo: 'Envío Gratis', descripcion: 'En compras sobre $50.000' },
    { icono: <FaShieldAlt />, titulo: 'Garantía', descripcion: 'Hasta 2 años de garantía' },
    { icono: <FaHeadset />, titulo: 'Soporte', descripcion: 'Asistencia técnica especializada' }
  ];

  return (
    <div>
      {}
      <section className="hero-section position-relative py-5" style={{ 
            minHeight: '80vh',
            background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--accent-color) 100%)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
          <div className="container-fluid py-5 px-5" style={{ width: '100%' }}>
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
              <h1 className="display-3 fw-bold mb-4 text-white" style={{ letterSpacing: '-0.02em' }}>
                Eleva tu <span style={{ color: '#e0e7ff' }}>Experiencia</span> Gaming
              </h1>
                <p className="lead mb-4 text-white-200 text-center" style={{ fontSize: '1.25rem', maxWidth: '500px' }}>
                Encuentra los periféricos y accesorios más avanzados para maximizar tu rendimiento en el juego.
              </p>
                <Link to="/productos" className="btn btn-light btn-lg" style={{
                  borderRadius: 'var(--border-radius)',
                  padding: '0.75rem 2rem',
                  transition: 'var(--transition)',
                  boxShadow: 'var(--shadow-md)',
                  margin: '0 auto',
                  display: 'block'
                }}>
                  Explorar Productos <FaArrowRight className="ms-2" />
                </Link>
            </div>
            <div className="col-lg-6 text-center position-relative">
              <img
                src="https://media.istockphoto.com/id/1560833158/es/foto/controlador-de-juego-con-teclado-iluminado-de-color-p%C3%BArpura-en-medio-de-varios-dispositivos.jpg?s=612x612&w=0&k=20&c=VcOavuq_yYYY_prnW6qehysZIA_xxCKOYiTtPUR0XyI="
                alt="Setup Gaming Profesional"
                className="img-fluid"
                style={{
                  maxHeight: '700px',
                  width: '60%',
                  minWidth: '110px',
                  borderRadius: 'var(--border-radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  transform: 'perspective(1000px) rotateY(-5deg)',
                  objectFit: 'cover',
                  margin: '0 auto'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {caracteristicas.map((caracteristica, index) => (
              <div key={index} className="col-md-4">
                <div className="card border-0 shadow-sm h-100 text-center">
                  <div className="card-body p-4">
                    <div className="text-primary mb-3" style={{fontSize: '3rem'}}>
                      {caracteristica.icono}
                    </div>
                    <h4>{caracteristica.titulo}</h4>
                    <p className="text-muted">{caracteristica.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Productos Destacados</h2>
            <p className="lead text-muted">Los productos más populares de nuestra tienda</p>
          </div>
          
          <div className="row g-4">
            {productosDestacados.map(producto => (
              <div key={producto.id} className="col-md-4">
                <ProductoCard producto={producto} />
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/productos" className="btn btn-outline-primary btn-lg">
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;