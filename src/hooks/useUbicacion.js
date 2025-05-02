import { useEffect, useState } from 'react';
import { axiosClient } from '@services/axiosClient';

export function useUbicacion() {
    const [ubicacion, setUbicacion] = useState(null);
    const [radio, setRadio] = useState(50); // km por defecto
    const [empresas, setEmpresas] = useState([]);

    // 1. Obtener ubicación actual del navegador
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                setUbicacion({ nombre: 'Detectando...', lat: coords.latitude, lng: coords.longitude });
            },
            (err) => console.error('Error obteniendo ubicación:', err),
            { enableHighAccuracy: true }
        );
    }, []);

    // 2. Llamar a la API cuando cambia ubicación o radio
    useEffect(() => {
        if (ubicacion) {
            axiosClient
                .get(`/empresas/cercanas`, {
                    params: { lat: ubicacion.lat, lng: ubicacion.lng, radio },
                })
                .then((res) => setEmpresas(res.data.data))
                .catch(console.error);
        }
    }, [ubicacion, radio]);

    return {
        ubicacion,
        radio,
        setUbicacion,
        setRadio,
        empresas,
      };
}
