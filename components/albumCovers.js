
document.addEventListener('DOMContentLoaded', function() {
  const storedData = localStorage.getItem('albumsData');

  if (!storedData) {
  fetch('https://my-json-server.typicode.com/dancosta-fed/album_jsonServer/db')
    .then(response => response.json())
    .then(data => {

    localStorage.setItem('albumsData', JSON.stringify(data));
    const albumsData = JSON.parse(localStorage.getItem('albumsData'));

      generateAlbums(albumsData);
      handleDestaqueClick(albumsData.albums);
      checkInitialDestaque(albumsData.albums);
    })
    .catch(error => {
      console.error('Erro ao fazer o fetch dos dados: ', error);
    });
  }

  if (storedData) {
    const albumsData = JSON.parse(storedData);
    generateAlbums(albumsData);
    handleDestaqueClick(albumsData.albums);
    checkInitialDestaque(albumsData.albums);
  }
});

const generateAlbums = (albumsData) => {
  const albumsContainer = document.querySelector('.albumCoversContainer');
  if (!albumsData.albums) {
    const noAlbumsMessage = document.createElement('p');
    noAlbumsMessage.classList.add('text-secondary');
    noAlbumsMessage.textContent = 'Nenhum álbum encontrado.';
    albumsContainer.appendChild(noAlbumsMessage);
    return;
  }

  albumsData.albums.forEach(album => {
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
    
    const favoriteButton = document.createElement('button');
    favoriteButton.classList.add('btn', 'btn-outline-danger', 'favorite-btn');
    favoriteButton.innerHTML = `
      <div>
        <span class="">Destaque</span>
        <i class="far fa-heart"></i>
      </div>
    `;
    
    // Set destaque property on button click
    favoriteButton.dataset.albumId = album.id;
    
    albumDetails.appendChild(title);
    albumDetails.appendChild(description);
    albumDetails.appendChild(date);
    albumLink.appendChild(image);
    albumLink.appendChild(albumDetails);
    albumDiv.appendChild(albumLink);
    albumDiv.appendChild(favoriteButton);
    albumsContainer.appendChild(albumDiv);
  });
}

const handleDestaqueClick = (albums) => {
  const favoriteButtons = document.querySelectorAll('.favorite-btn');

  favoriteButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const albumId = this.dataset.albumId;

      // Update frontend - set destaque for clicked album
      albums.forEach(album => {
        if (album.id === parseInt(albumId)) {
          album.destaque = true;
          if (album.destaque) {
            button.classList.remove('btn-outline-danger');
            button.classList.add('btn-danger');
          } else {
            button.classList.remove('btn-danger');
            button.classList.add('btn-outline-danger');
          }

        } else {
          album.destaque = false;
        }
      });

      localStorage.setItem('albumsData', JSON.stringify({ albums }));

      const updatedData = JSON.parse(localStorage.getItem('albumsData'));
      checkInitialDestaque(updatedData.albums);
      location.reload();
    });
  });
};

const checkInitialDestaque = (albums) => {
  const favoriteButtons = document.querySelectorAll('.favorite-btn');

  favoriteButtons.forEach(button => {
    const albumId = button.dataset.albumId;
    const album = albums.find(album => album.id === parseInt(albumId));

    if (album && album.destaque) {
      button.classList.remove('btn-outline-danger');
      button.classList.add('btn-danger');
    } else {
      button.classList.remove('btn-danger');
      button.classList.add('btn-outline-danger');
    }
  });
};

