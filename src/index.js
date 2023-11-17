import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const breedSelect = new SlimSelect({
    select: '.breed-select',
  });

  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  try {
    loader.style.display = 'block';
    const breeds = await fetchBreeds();
    loader.style.display = 'none';
    breedSelect.setData(breeds.map(breed => ({ text: breed.name, value: breed.id })));
  } catch (err) {
    loader.style.display = 'none';
    error.style.display = 'block';
    console.error(err);
  }

  breedSelect.slim.data.data.select.addEventListener('change', async () => {
  const selectedBreedId = breedSelect.selected();
  loader.style.display = 'block';
  error.style.display = 'none';

  try {
    const catData = await fetchCatByBreed(selectedBreedId);
    loader.style.display = 'none';
    catInfo.innerHTML = `
      <img src="${catData[0].url}" alt="Cat Image" style="max-width: 100%;">
      <h2>${catData[0].breeds.length > 0 ? catData[0].breeds[0].name : 'Unknown Breed'}</h2>
      <p>${catData[0].breeds.length > 0 ? catData[0].breeds[0].description : 'No description available.'}</p>
      <p>Temperament: ${catData[0].breeds.length > 0 ? catData[0].breeds[0].temperament : 'Unknown'}</p>
    `;
  } catch (err) {
    loader.style.display = 'none';
    error.style.display = 'block';
    console.error(err);
  }
});

});
