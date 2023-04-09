const searchQuery = "New York City"; // replace with the place you want to search for
const apiEndpoint = "https://nominatim.openstreetmap.org/search"; // Nominatim API endpoint

// make an HTTP GET request to the Nominatim API endpoint
fetch(`${apiEndpoint}?q=${searchQuery}&format=json`)
  .then(response => response.json())
  .then(data => {
    // extract the latitude and longitude coordinates from the API response
    const lat = data[0].lat;
    const lon = data[0].lon;
    
    // do something with the latitude and longitude coordinates
    console.log(`Latitude: ${lat}, Longitude: ${lon}`);
  })
  .catch(error => {
    console.error(error);
  });
