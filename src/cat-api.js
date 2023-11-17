import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_bMg61mGsStKEFbpBnZ797RQUsAdvZZUnIZlQZKL7aIYV4Z6BBcYBJ0TEwdvHaZ3Y';

function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => Promise.reject(error));
}

function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => Promise.reject(error));
}

export { fetchBreeds, fetchCatByBreed };
