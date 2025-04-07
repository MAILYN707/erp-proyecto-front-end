import React from 'react';


export function Home() {
  return (
    <div className="main-container">
      <div id="home-background">
        <div className="background-overlay"></div>
        <div className="hero-section">
          <h1>Conectamos empresas. Simplificamos el abastecimiento.</h1>
          <p>
            Encuentra proveedores confiables cerca de tu empresa, gestiona tus compras y haz seguimiento con un solo clic.
          </p>
          <button className="explore-button">Explora proveedores</button>
        </div>
      </div>
    </div>
  );
}
