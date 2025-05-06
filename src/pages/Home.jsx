import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Home() {

  return (
    <div className="main-container">
      <div id="home-background">
        <div className="background-overlay"></div>
        <div className="hero-section">
          <h1 className='font-bold font-playfair'>Conectamos empresas. Simplificamos el abastecimiento.</h1>
          <p>
            Encuentra proveedores confiables cerca de tu empresa, gestiona tus compras y haz seguimiento con un solo clic.
          </p>
          <Link to="/Proveedores">
            <button className="explore-button">Explora proveedores</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
