import { useState, useEffect, useCallback } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  address: string;
  isLoading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    address: '',
    isLoading: false,
    error: null,
  });

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({ ...prev, error: 'Geolocation is not supported by your browser' }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Mock reverse geocoding
        const mockAddresses = [
          'Sector 15, Near Metro Station, Noida, UP 201301',
          'Connaught Place, Block A, New Delhi 110001',
          'MG Road, Shanthala Nagar, Bangalore 560001',
          'Andheri West, Lokhandwala, Mumbai 400053',
          'Banjara Hills, Road No. 12, Hyderabad 500034',
        ];
        const randomAddr = mockAddresses[Math.floor(Math.random() * mockAddresses.length)];

        setState({
          latitude,
          longitude,
          address: randomAddr,
          isLoading: false,
          error: null,
        });
      },
      (error) => {
        // If real geolocation fails, use mock data
        const mockLat = 28.5851 + (Math.random() - 0.5) * 0.1;
        const mockLng = 77.3100 + (Math.random() - 0.5) * 0.1;
        setState({
          latitude: mockLat,
          longitude: mockLng,
          address: 'Sector 15, Near Metro Station, Noida, UP 201301',
          isLoading: false,
          error: null,
        });
        console.warn('Geolocation error, using mock:', error.message);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  return { ...state, detectLocation };
}
