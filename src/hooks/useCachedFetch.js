import { useEffect, useState } from 'react';
import { axiosClient } from '@services/axiosClient';

export function useCachedFetch(endpoint, cacheKey, refreshMs = 60000) {
  const [data, setData] = useState(() => {
    const cached = localStorage.getItem(cacheKey);
    return cached ? JSON.parse(cached) : null;
  });

  const [loading, setLoading] = useState(!data);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axiosClient.get(endpoint);
        if (isMounted) {
          setData(response.data.data);
          localStorage.setItem(cacheKey, JSON.stringify(response.data.data));
        }
      } catch (error) {
        console.error('Error en useCachedFetch:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    // Si no hay datos, cargar inmediatamente
    if (!data) fetchData();

    // Siempre refrescar en segundo plano
    const interval = setInterval(fetchData, refreshMs);
    fetchData();

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [endpoint, cacheKey, refreshMs]);

  return { data, loading };
}
