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
      <section className="hero-section position-relative py-5 hero-large">
          <div className="container-fluid py-5 px-5 hero-inner" style={{ width: '100%' }}>
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
              <h1 className="display-3 fw-bold mb-4 text-white hero-title" style={{ letterSpacing: '-0.02em' }}>
                Eleva tu <span className="text-accent">Experiencia</span> Gaming
              </h1>
                <p className="lead mb-4 text-white text-center hero-sub" style={{ fontSize: '1.25rem', maxWidth: '560px' }}>
                Encuentra periféricos y accesorios de alto rendimiento. Potencia tu juego con equipo pensado para ganar.
              </p>
                <Link to="/productos" className="btn btn-hero btn-lg">
                  Explorar Productos <FaArrowRight className="ms-2" />
                </Link>
                <div className="mt-4 d-flex gap-3 hero-quick-links">
                  <Link to="/contacto" className="btn btn-outline-light btn-sm">Contáctanos</Link>
                  <Link to="/nosotros" className="btn btn-outline-light btn-sm">Conócenos</Link>
                </div>
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
              {/* decorative neon stripes */}
              <div className="hero-stripe hero-stripe-1" />
              <div className="hero-stripe hero-stripe-2" />
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
                <div className="card border-0 shadow-sm h-100 text-center feature-card">
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
      <section className="py-5 bg-dark-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold neon-glow">Productos Destacados</h2>
            <p className="lead" style={{color: 'var(--text-muted)'}}>Los productos más populares de nuestra tienda</p>
          </div>
          
          <div className="row g-4 featured-grid">
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