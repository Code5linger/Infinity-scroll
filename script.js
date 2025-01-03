const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImage = 0;
let photosArray = [];

// Unsplash API
const apiKey = `z-rjVRgF51aQ68h_4uPyGfq7YxTyHsTRspSf9tdYfVw`;
const count = `5`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  console.log('image loaded');
  imageLoaded++;
  console.log(imagesLoaded);
  if (imageLoaded === totalImage) {
    ready = true;
    loader.hidden = true;
    console.log('ready =', ready);
  }
}

// Healer Function to Set Attributes on DOM Elements
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Element for Links & Photos
function displayPhotos() {
  imageLoaded = 0;
  totalImage = photosArray.length;
  console.log('total images', totalImage);
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link Unsplash
    const item = document.createElement('a');
    setAttribute(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // Create <img> for photo
    const img = document.createElement('img');
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listeners, check when each is finished loading
    img.addEventListener('load', imageContainer);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API
async function getPhotos(params) {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error
  }
}

// Check to see of scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    console.log('load more');
  }
});

// On Load
getPhotos();
