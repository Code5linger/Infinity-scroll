// Unsplash API
const apiKey = `z-rjVRgF51aQ68h_4uPyGfq7YxTyHsTRspSf9tdYfVw`;
const count = `10`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get Photos from Unsplash API
async function getPhotos(params) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    // Catch Error
  }
}

// On Load
getPhotos();
