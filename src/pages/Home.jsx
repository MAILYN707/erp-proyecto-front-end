import React, { useEffect } from 'react';
import { axiosClient } from '../services/axiosClient';

export function Home() {
  useEffect(() => {
    axiosClient.get('/productos')
      .then(response => console.log('✅ Productos:', response.data))
      .catch(error => console.error('❌ Error de CORS:', error));
  }, []);

  return (
    <div className="main-container">
      <div id="home-background">
        <div className="background-overlay"></div>
        <div className="hero-section">
          <h1 className='font-bold font-playfair'>Conectamos empresas. Simplificamos el abastecimiento.</h1>
          <p>
            Encuentra proveedores confiables cerca de tu empresa, gestiona tus compras y haz seguimiento con un solo clic.
          </p>
          <button className="explore-button">Explora proveedores</button>
        </div>
      </div>
    </div>
  );
}
