

document.addEventListener('DOMContentLoaded', function() {
  const storedData = localStorage.getItem('albumsData');

  if (!storedData) {
  fetch('https://my-json-server.typicode.com/dancosta-fed/album_jsonServer/db')
    .then(response => response.json())
    .then(data => {
      const albums = data.albums;
      for (const album in albums) {
        if (albums.hasOwnProperty(album)) {
          if (albums[album].destaque === true) {
            generateCarouselItems(albums[album].photos)
            break;
          }
        }
      }

    })
    .catch(error => {
      console.error('Erro ao fazer o fetch dos dados: ', error);
    });
  }

  if (storedData) {
    const albumsData = JSON.parse(storedData);
    for (const album in albumsData.albums) {
      if (albumsData.albums.hasOwnProperty(album)) {
        if (albumsData.albums[album].destaque === true) {
          generateCarouselItems(albumsData.albums[album].photos)
          break;
        }
      }
    }
  }
});

const generateCarouselItems = (destaques) => {
  const carouselInner = document.querySelector('.carousel-inner');
  carouselInner.innerHTML = '';

  for (const key in destaques) {
    if (Object.hasOwnProperty.call(destaques, key)) {
      const imageUrl = destaques[key];

      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');

      const image = document.createElement('img');
      image.src = imageUrl;
      image.classList.add('rounded', 'd-block', 'w-100');
      image.alt = '...';

      carouselItem.appendChild(image);

      if (Object.keys(destaques).indexOf(key) === 0) {
        carouselItem.classList.add('active');
      }

      carouselInner.appendChild(carouselItem);
    }
  }
}

const updateCarouselFromLocalStorage = () => {
  const storedData = JSON.parse(localStorage.getItem('albumsData'));

  if (storedData && storedData.destaque === true) {
    generateCarouselItems(storedData.photos);
  }
}

window.addEventListener('albumsData', (event) => {
  if (event.key === 'albumsData') {
    updateCarouselFromLocalStorage();
  }
});