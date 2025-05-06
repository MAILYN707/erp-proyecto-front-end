import { axiosClient } from '@services/axiosClient';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet';

// Corrección de íconos default para Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


function CambiarVista({ center }) {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.setView(center);
        }
    }, [center]);

    return null;
}

export function ModalUbicacion({ ubicacion: ubicacionProp, radio: radioProp, onUbicacionChange, onClose }) {

    const [ubicacion, setUbicacion] = useState(ubicacionProp || '');
    const [radio, setRadio] = useState(radioProp || 50);

    useEffect(() => {
        setUbicacion(ubicacionProp || {});
        setRadio(radioProp || 50);
    }, [ubicacionProp, radioProp]);

    useEffect(() => {
        const fetchCoordenadas = async () => {
            if (ubicacion?.nombre && (!ubicacion.lat || !ubicacion.lng)) {
                try {
                    const res = await axiosClient.get('/test-geocoding', {
                        params: { direccion: `${ubicacion.nombre}, Costa Rica` }

                    });

                    if (res.data?.coordenadas?.lat && res.data?.coordenadas?.lng) {
                        setUbicacion(prev => ({
                            ...prev,
                            lat: res.data.coordenadas.lat,
                            lng: res.data.coordenadas.lng
                        }));
                    } else {
                        console.warn('No se encontraron coordenadas para la ubicación');
                    }
                } catch (error) {
                    console.error('Error al geocodificar:', error);
                }
            }
        };

        const timeout = setTimeout(fetchCoordenadas, 800);
        return () => clearTimeout(timeout);
    }, [ubicacion?.nombre]);

    const handleAplicar = () => {
        onUbicacionChange({ ubicacion, radio });
        onClose();
    };


    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[400px] max-w-full relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                    onClick={onClose}
                >✕</button>

                <h2 className="text-xl font-bold mb-4">Cambiar ubicación</h2>

                <div className="mb-4 text-start">
                    <label className="text-sm font-medium text-gray-600 mb-1 block">Buscar por provincia, ciudad o localidad</label>
                    <div className="relative">
                        <FaMapMarkerAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#345769]" />
                        <input
                            type="text"
                            value={ubicacion?.nombre || ''}
                            onChange={(e) => setUbicacion({ nombre: e.target.value })} // <<< AQUÍ ESTÁ EL CAMBIO
                            className="w-full pl-8 p-2 border rounded focus:outline-[#345769]"
                        />
                    </div>
                </div>

                <div className="mb-4 text-start">
                    <label className="text-sm font-medium text-gray-600 mb-1 block">Radio</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={radio}
                        onChange={(e) => setRadio(Number(e.target.value))}
                    >
                        {[1, 2, 5, 10, 20, 40, 50, 60, 65, 80, 100, 250, 500].map((r) => (
                            <option key={r} value={r}>{r} kilómetros</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4 h-60 rounded overflow-hidden relative">
                    <MapContainer
                        center={[ubicacion?.lat || 9.7489, ubicacion?.lng || -83.7534]} // fallback: centro de CR
                        zoom={8}
                        scrollWheelZoom={false}
                        style={{ height: '100%', width: '100%' }}
                    >
                        {ubicacion?.lat && ubicacion?.lng && (
                            <>
                                <CambiarVista center={[ubicacion.lat, ubicacion.lng]} />
                                <Marker position={[ubicacion.lat, ubicacion.lng]} />
                                <Circle center={[ubicacion.lat, ubicacion.lng]} radius={radio * 1000} />
                            </>
                        )}

                        <TileLayer
                            attribution='&copy; OpenStreetMap'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>

                    {!ubicacion?.lat || !ubicacion?.lng ? (
                        <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                            <div className="animate-spin h-10 w-10 border-4 border-t-[#345769] border-gray-200 rounded-full"></div>
                        </div>
                    ) : null}
                </div>

                <button
                    onClick={handleAplicar}
                    className="w-full bg-[#345769] text-white py-2 rounded font-semibold"
                >
                    Aplicar
                </button>
            </div>
        </div>
    );
}
