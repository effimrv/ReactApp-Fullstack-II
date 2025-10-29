import React from 'react';
import { FaBullseye, FaEye, FaUsers, FaMedal, FaRocket, FaHeart } from 'react-icons/fa';

const Nosotros = () => {
  const equipo = [
    {
      nombre: 'Aracely Escobar',
      rol: 'Desarrolladora Frontend',
      descripcion: 'Especialista en crear experiencias web increíbles.',
      icono: <FaRocket />
    },
    {
      nombre: 'Macarena Espinoza', 
      rol: 'Especialista en Gaming',
      descripcion: 'Conoce todos los juegos y periféricos del mercado.',
      icono: <FaUsers />
    }
  ];

  const valores = [
    { icono: <FaUsers />, titulo: 'Comunidad', descripcion: 'Creemos en el poder de la comunidad gaming.' },
    { icono: <FaMedal />, titulo: 'Calidad', descripcion: 'Productos de la más alta calidad.' },
    { icono: <FaRocket />, titulo: 'Innovación', descripcion: 'Buscamos las últimas tecnologías.' },
    { icono: <FaHeart />, titulo: 'Pasión', descripcion: 'Compartimos la pasión por los videojuegos.' }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-dark text-white py-5">
        <div className="container text-center py-5">
          <h1 className="display-4 fw-bold mb-4">Sobre Nosotros</h1>
          <p className="lead">
            Conoce la historia detrás de LevelUpGamer
          </p>
        </div>
      </section>

      {/* Quiénes Somos */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="display-6 fw-bold mb-4">¿Qué es LevelUpGamer?</h2>
              <p className="lead mb-4">
                LevelUpGamer es una tienda online dedicada a productos gamers de alta calidad. 
              </p>
              <p>
                Desde 2020, hemos estado comprometidos con brindar la mejor experiencia de compra 
                a jugadores de todos los niveles.
              </p>
            </div>
            <div className="col-lg-6">
              <img 
                src="/images/about-team.jpg" 
                alt="Equipo LevelUpGamer"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="text-primary mb-3" style={{fontSize: '3rem'}}>
                    <FaBullseye />
                  </div>
                  <h3>Nuestra Misión</h3>
                  <p>
                    Brindar experiencias únicas a través de productos innovadores y de calidad.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="text-primary mb-3" style={{fontSize: '3rem'}}>
                    <FaEye />
                  </div>
                  <h3>Nuestra Visión</h3>
                  <p>
                    Convertirnos en la tienda gamer de referencia en Latinoamérica.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center display-5 fw-bold mb-5">Nuestros Valores</h2>
          <div className="row g-4">
            {valores.map((valor, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card border-0 text-center h-100">
                  <div className="card-body">
                    <div className="text-primary mb-3" style={{fontSize: '2.5rem'}}>
                      {valor.icono}
                    </div>
                    <h5>{valor.titulo}</h5>
                    <p className="text-muted">{valor.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center display-5 fw-bold mb-5">Nuestro Equipo</h2>
          <div className="row g-4">
            {equipo.map((miembro, index) => (
              <div key={index} className="col-md-6">
                <div className="card border-0 shadow-sm h-100 text-center">
                  <div className="card-body p-4">
                    <div className="text-primary mb-3" style={{fontSize: '3rem'}}>
                      {miembro.icono}
                    </div>
                    <h5>{miembro.nombre}</h5>
                    <h6 className="text-primary">{miembro.rol}</h6>
                    <p>{miembro.descripcion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;