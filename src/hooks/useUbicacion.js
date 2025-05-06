import { useEffect, useState } from 'react';
import { axiosClient } from '@services/axiosClient';

export function useUbicacion() {
    const [ubicacion, setUbicacion] = useState(null);
    const [radio, setRadio] = useState(50); // km por defecto
    const [empresas, setEmpresas] = useState([]);

    // 1. Obtener ubicación actual del navegador
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                const lat = coords.latitude;
                const lng = coords.longitude;

                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
                    const data = await res.json();

                    const address = data.address;

                    const distrito = address?.suburb || address?.hamlet || address?.neighbourhood || '';
                    const canton = address?.city || address?.town || address?.village || '';
                    const provincia = address?.state || '';

                    const partes = [distrito, canton].filter(Boolean);
                    const nombre = partes.length > 0 ? partes.join(', ') : provincia || 'Ubicación actual';


                    setUbicacion({ nombre, lat, lng });
                } catch (error) {
                    console.error('Error usando Nominatim:', error);
                    setUbicacion({ nombre: 'Ubicación detectada', lat, lng });
                }
            },
            (err) => console.error('Error obteniendo ubicación:', err),
            { enableHighAccuracy: true }
        );
    }, []);

    // 2. Llamar a la API cuando cambia ubicación o radio
    useEffect(() => {
        if (ubicacion?.lat && ubicacion?.lng) {
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
