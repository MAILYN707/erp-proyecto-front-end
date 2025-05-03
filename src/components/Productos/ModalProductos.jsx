// ModalProducto.jsx
import React, { useState } from 'react';

export default function ModalProducto({ producto, onClose }) {
    const [cantidad, setCantidad] = useState(1);

    const incrementar = () => setCantidad(c => c + 1);
    const decrementar = () => setCantidad(c => (c > 1 ? c - 1 : 1));

    return (
        <div className="modal-overlay">
            <div className="modal-container animate-fade-in">
                <button onClick={onClose} className="modal-close">✕</button>

                <div className="modal-content">
                    {/* Imagen con flechas */}
                    <div className="carousel-container">
                        <button className="carousel-button">❮</button>
                        <img src={producto.imagen} alt="Producto" className="carousel-image" />
                        <button className="carousel-button">❯</button>
                    </div>

                    {/* Info y precio */}
                    <div className="info-section">
                        <div className="product-info">
                            <h2>{producto.nombre}</h2>
                            <p><strong>Categoría:</strong> {producto.categoria}</p>
                            <p><strong>Nombre Empresa:</strong> {producto.empresa}</p>
                            <p className="descripcion">
                                {producto.descripcion || 'Descripción: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.'}
                            </p>
                        </div>

                        <div className="precio-carrito">
                            <p className="precio">₡ {producto.precio.toLocaleString()}</p>
                            <div className="cantidad">
                                <button onClick={decrementar}>-</button>
                                <span>Cantidad: {cantidad}</span>
                                <button onClick={incrementar}>+</button>
                            </div>
                            <button className="boton-carrito">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icono">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.75 14.25a1.125 1.125 0 001.125.75h11.25a1.125 1.125 0 001.125-1.125V6.375a1.125 1.125 0 00-1.125-1.125H6.091m-.984 0L4.5 3.75m0 0H2.25" />
                                </svg>
                                Añadir al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}