// Object containing image URLs
const destaques = {
  image1: "https://res.cloudinary.com/dognkye6x/image/upload/v1695386211/IMG_4847_zomx8h.jpg",
  image2: "https://res.cloudinary.com/dognkye6x/image/upload/v1691336468/_MG_4958_qtyhx0.jpg",
  image3: "https://res.cloudinary.com/dognkye6x/image/upload/v1695386675/IMG_5243_bh2zxk.jpg",
  image4: "https://res.cloudinary.com/dognkye6x/image/upload/v1695386148/oaks-shore-33_s1fykx.jpg",
  image5: "https://res.cloudinary.com/dognkye6x/image/upload/v1691336422/B2B054D1-FFDE-461D-966D-A0AADE49932C_ms8yfv.jpg",
  image6: "https://res.cloudinary.com/dognkye6x/image/upload/v1695386672/IMG_5260_kdyrca.jpg"
};

const generateCarouselItems = (destaques) => {
  const carouselInner = document.querySelector('.carousel-inner');

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

generateCarouselItems(destaques);
