// Object containing album image URLs and details
const albumCovers = {
  fotos_snowboarding: {
    imageUrl: "https://res.cloudinary.com/dognkye6x/image/upload/v1695386211/IMG_4847_zomx8h.jpg",
    title: "Fotos Snowboarding",
    description: "Fotos tiradas por Dan Costa em Queenstown, NZ.",
    date: "2021",
    link: "fotos_snowboarding",
    location: "Queenstown, NZ",
    photos: [
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695386212/IMG_4751_ywotuh.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695386210/IMG_4745_vk0xzg.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695386200/IMG_7427_x8soly.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695386153/oaks-shore-51_inmkgp.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695386148/oaks-shore-33_s1fykx.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695386143/oaks-shore-29_i7bai2.jpg',
    ]
  },
  fotos_Stadium: {
    imageUrl: "https://res.cloudinary.com/dognkye6x/image/upload/v1691336468/_MG_4958_qtyhx0.jpg",
    title: "Fotos Estádio",
    description: "Fotos tiradas por Dan Costa em Estádios de Futebol.",
    date: "2023",
    link: "fotos_Stadium",
    location: "Belo Horizonte, MG",
    photos: [
      'https://res.cloudinary.com/dognkye6x/image/upload/v1691336520/IMG_2156_oyfnpj.png',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1691336422/B2B054D1-FFDE-461D-966D-A0AADE49932C_ms8yfv.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1691336468/_MG_4958_qtyhx0.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1691336039/IMG_8525_lb5fil.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1684164835/IMG_0693_obyj0t.png',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1684164789/IMG_1455_vg0bgq.png',
    ]
  },
  fotos_Blue_Pools: {
    imageUrl: "https://res.cloudinary.com/dognkye6x/image/upload/v1695431057/IMG_7721_oh8xmn.jpg",
    title: "South Island, NZ",
    description: "Fotos tiradas por Dan Costa no sul da NZ.",
    date: "2020",
    link: "south_island",
    location: "Queenstown, NZ",
    photos: [
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695431057/IMG_7721_oh8xmn.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695430685/GOPR0819_jel6u9.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695430901/IMG_1911_hvctml.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695430505/IMG_5256-Edit_r2ab1b.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695430204/IMG_5616_gmhujj.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695419277/IMG_2712_g7gl38.jpg',
    ]
  },
};


const params = new URLSearchParams(window.location.search);
const title = params.get('link');
const decodedLink = decodeURIComponent(title.replace(/\+/g, ' '));
const selectedAlbum = albumCovers[decodedLink];
const albumDetailsContainer = document.getElementById('albumDetailsContainer');

import { MAPBOX_API_KEY } from '../env.js';

mapboxgl.accessToken = MAPBOX_API_KEY ? MAPBOX_API_KEY : '';

// Now use apiKey in your code


const generateAlbumDetails = (album) => {
  return `
    <div class="bg-light p-2 rounded mb-4 d-md-flex">
      <img src="${album.imageUrl}" class="rounded album-cover-page" alt="${album.title}">

      <div class="p-3 w-100">
        <div>
          <h3 class="text-secondary">Descrição</h3>
          <p class="text-secondary">${album.description}</p>
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

if (selectedAlbum) {
  const navLink = document.querySelector('.navbar-nav .nav-link');
  navLink.textContent = selectedAlbum.title;
  navLink.href = `albumDetails.html?link=${selectedAlbum.link}`;

  const albumDetailsHTML = generateAlbumDetails(selectedAlbum);
  albumDetailsContainer.innerHTML = albumDetailsHTML;

  const photoGalleryHTML = generatePhotoHTML(selectedAlbum);
  albumDetailsContainer.insertAdjacentHTML('beforeend', `
    <h3 class="text-secondary text-center">Galeria de Fotos</h3>
    <div class="row">${photoGalleryHTML}</div>
  `);

  const modalGalleryHTML = generateModalHTML(selectedAlbum);
  document.body.insertAdjacentHTML('beforeend', modalGalleryHTML);

  getCoordinatesFromLocation(selectedAlbum.location)
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
