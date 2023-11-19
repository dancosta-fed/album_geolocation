// Object containing album image URLs and details
const albumCovers = {
  fotos_snowboarding: {
    imageUrl: "https://res.cloudinary.com/dognkye6x/image/upload/v1695386211/IMG_4847_zomx8h.jpg",
    title: "Fotos Snowboarding",
    description: "Fotos tiradas por Dan Costa em Queenstown, NZ.",
    date: "2021",
    link: "fotos_snowboarding",
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

function generateAlbums(albumCovers) {
  const albumsContainer = document.querySelector('.albumCoversContainer');

  for (const key in albumCovers) {
    if (Object.hasOwnProperty.call(albumCovers, key)) {
      const album = albumCovers[key];

      const albumDiv = document.createElement('div');
      albumDiv.classList.add('bg-light', 'p-2', 'rounded', 'm-1', 'album-styles');

      const albumLink = document.createElement('a');
      albumLink.href = `albumDetails.html?link=${album.link}`;
      albumLink.style.textDecoration = 'none';

      const image = document.createElement('img');
      image.src = album.imageUrl;
      image.classList.add('rounded', 'album-cover');
      image.alt = 'Album Cover';

      const albumDetails = document.createElement('div');

      const title = document.createElement('h3');
      title.classList.add('text-secondary');
      title.textContent = album.title;

      const description = document.createElement('p');
      description.classList.add('text-secondary');
      description.textContent = album.description;

      const date = document.createElement('p');
      date.classList.add('text-secondary');
      date.textContent = `Data: ${album.date}`;

      albumDetails.appendChild(title);
      albumDetails.appendChild(description);
      albumDetails.appendChild(date);
      albumLink.appendChild(image);
      albumLink.appendChild(albumDetails);
      albumDiv.appendChild(albumLink);
      albumsContainer.appendChild(albumDiv);
    }
  }
}

generateAlbums(albumCovers);
