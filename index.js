import { MAPBOX_API_KEY } from '../env.js';

mapboxgl.accessToken = MAPBOX_API_KEY ? MAPBOX_API_KEY : '';

const createMap = (longitude, latitude) => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [longitude, latitude],
    zoom: 9
  });

  new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
};

navigator.geolocation.getCurrentPosition(
  position => {
    const { longitude, latitude } = position.coords;
    createMap(longitude, latitude);
  },
  error => {
    console.error('Error getting location:', error);
    const defaultLongitude = -43.9378;
    const defaultLatitude = -19.9208;
    createMap(defaultLongitude, defaultLatitude);
  }
);
