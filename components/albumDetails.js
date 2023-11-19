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
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695386212/IMG_4751_ywotuh.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695386210/IMG_4745_vk0xzg.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695386200/IMG_7427_x8soly.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695386153/oaks-shore-51_inmkgp.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695386148/oaks-shore-33_s1fykx.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695386143/oaks-shore-29_i7bai2.jpg',
    ]
  },
  fotos_Blue_Pools: {
    imageUrl: "https://res.cloudinary.com/dognkye6x/image/upload/v1695431057/IMG_7721_oh8xmn.jpg",
    title: "Blue Pools",
    description: "Fotos tiradas por Dan Costa no sul da NZ.",
    date: "2020",
    link: "fotos_Blue_Pools",
    location: "Haast, NZ",
    photos: [
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695386212/IMG_4751_ywotuh.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695386210/IMG_4745_vk0xzg.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695386200/IMG_7427_x8soly.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695386153/oaks-shore-51_inmkgp.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695386148/oaks-shore-33_s1fykx.jpg',
      'https://res.cloudinary.com/dognkye6x/image/upload/v1695386143/oaks-shore-29_i7bai2.jpg',
    ]
  },
};

// Get URL parameters
const params = new URLSearchParams(window.location.search);
const title = params.get('link');
const decodedLink = decodeURIComponent(title.replace(/\+/g, ' '));
const selectedAlbum = albumCovers[decodedLink];

const generateAlbumDetails = (album) => {
  console.log(album);
  return `
    <div class="bg-light p-2 rounded d-md-flex">
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

const albumDetailsContainer = document.getElementById('albumDetailsContainer');

console.log('selectedAlbum', selectedAlbum);
if (selectedAlbum) {
  const albumDetailsHTML = generateAlbumDetails(selectedAlbum);
  albumDetailsContainer.innerHTML = albumDetailsHTML;
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
