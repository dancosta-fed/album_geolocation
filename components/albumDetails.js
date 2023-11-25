// Object containing album image URLs and details

let ALBUMS = [];

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM carregado com sucesso!');

  const storedData = localStorage.getItem('albumsData');

  if (!storedData) {
    fetch('https://my-json-server.typicode.com/dancosta-fed/album_jsonServer/db')
      .then(response => response.json())
      .then(data => {

      localStorage.setItem('albumsData', JSON.stringify(data));
      const albumsData = JSON.parse(localStorage.getItem('albumsData'));

        ALBUMS = albumsData.albums;
        const params = new URLSearchParams(window.location.search);
        const title = params.get('link');
        const decodedLink = decodeURIComponent(title.replace(/\+/g, ' '));
    
        const findAlbum = ALBUMS.find(album => album.link === decodedLink);
        setSelectedAlbum(findAlbum);
      })
      .catch(error => {
        console.error('Erro ao fazer o fetch dos dados: ', error);
      });
  }

  if (storedData) {
    const albumsData = JSON.parse(storedData);
    ALBUMS = albumsData.albums;

    const params = new URLSearchParams(window.location.search);
    const title = params.get('link');
    const decodedLink = decodeURIComponent(title.replace(/\+/g, ' '));

    const findAlbum = ALBUMS.find(album => album.link === decodedLink);

    setSelectedAlbum(findAlbum);
    
  }
});


const albumDetailsContainer = document.getElementById('albumDetailsContainer');


import { MAPBOX_API_KEY } from '../env.js';

mapboxgl.accessToken = MAPBOX_API_KEY ? MAPBOX_API_KEY : '';

// Now use apiKey in your code


const generateAlbumDetails = (album) => {
  return `
    <div class="bg-light p-2 rounded mb-4 d-md-flex">
      <img src="${album.imageUrl}" class="rounded album-cover-page" alt="${album.title}">

      <div class="p-3 w-100">
        <div class="d-flex justify-content-between">
          <div>
            <h3 class="text-secondary">Descrição</h3>
            <p class="text-secondary">${album.description}</p>
          </div>

          <div id="destaque">
          ${
            album.destaque 
            ? '<i class="fas fa-heart fs-2 heartBtn"></i>'
            : '<i class="far fa-heart fs-2 heartBtn"></i>'
          }
          </div>
          
        </div>
        <div class="d-flex justify-content-between">
          <div>
            <h5 class="text-secondary">Localização</h5>
            <p class="text-secondary">${album.location}</p>
          </div>

          <div class="text-end">
            <h5 class="text-secondary">Data de Registro</h5>
            <p class="text-secondary">${album.date}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

const generatePhotoHTML = (album) => {
  let photosHTML = '';

  album.photos.forEach((photo, index) => {
    photosHTML += `
      <div class="col-12 col-md-6 col-lg-4 mb-3 mt-4">
        <a href="#photoModal${index + 1}" data-bs-toggle="modal" data-bs-target="#photoModal${index + 1}">
          <img src="${photo}" class="rounded foto-album" alt="snowboarder">
        </a>
      </div>
    `;
  });

  return photosHTML;
};

const generateModalHTML = (album) => {
  let modalHTML = '';

  album.photos.forEach((photo, index) => {
    modalHTML += `
      <div class="modal fade" id="photoModal${index + 1}" tabindex="-1" aria-labelledby="imagemLabel${index + 1}" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="imagemLabel${index + 1}">${album.title}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div id="foto${index + 1}" class="carousel slide">
                <div class="carousel-inner">
                  ${album.photos
                    .map(
                      (img, idx) => `
                        <div class="carousel-item ${idx === 0 ? 'active' : ''}">
                          <img src="${img}" class="d-block w-100" alt="...">
                        </div>
                      `
                    )
                    .join('')}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#foto${index + 1}" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#foto${index + 1}" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  return modalHTML;
};

const getCoordinatesFromLocation = async (locationName) => {
  const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json?access_token=${mapboxgl.accessToken}`);
  const data = await response.json();
  // Assuming the first result contains the coordinates
  const coordinates = data.features[0].center;
  return coordinates; // [longitude, latitude]
};

const createMap = (longitude, latitude) => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [longitude, latitude],
    zoom: 9
  });


  new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .addTo(map);
};

const setSelectedAlbum = (album) => {
  if (album) {
    const navLink = document.querySelector('.navbar-nav .nav-link');
    navLink.textContent = album.title;
    navLink.href = `albumDetails.html?link=${album.link}`;
  
    const albumDetailsHTML = generateAlbumDetails(album);
    albumDetailsContainer.innerHTML = albumDetailsHTML;
  
    const photoGalleryHTML = generatePhotoHTML(album);
    albumDetailsContainer.insertAdjacentHTML('beforeend', `
      <h3 class="text-secondary text-center">Galeria de Fotos</h3>
      <div class="row">${photoGalleryHTML}</div>
    `);
  
    const modalGalleryHTML = generateModalHTML(album);
    document.body.insertAdjacentHTML('beforeend', modalGalleryHTML);
  
    getCoordinatesFromLocation(album.location)
    .then(coordinates => {
      console.log('Coordinates:', coordinates);
        // Check if the map container exists
        let mapContainer = document.getElementById('map');
  
        // If the map container doesn't exist, create it
        if (!mapContainer) {
          mapContainer = document.createElement('div');
          mapContainer.id = 'map';
          albumDetailsContainer.insertAdjacentElement('afterend', mapContainer);
  
          const locationTitle = document.createElement('h3');
          locationTitle.classList.add('text-secondary', 'text-center', 'mt-4', 'mb-4');
          locationTitle.textContent = 'Localização';
          albumDetailsContainer.insertAdjacentElement('afterend', locationTitle);
        }
  
        // Proceed to create the map
          createMap(coordinates[0], coordinates[1]);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  } else {
    albumDetailsContainer.innerHTML = `
    <div class="d-flex justify-content-center align-items-center p-4">
      <div class="text-center d-flex flex-column align-items-center">
        <h2 class="text-primary fw-bold mb-4">Status 404</h2>
        <h3 class="text-danger">Album não foi encontrado</h3>
      </div>
    </div>
    `;
  }
};

