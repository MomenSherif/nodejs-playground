const searchResultEl = document.getElementById('search-result');
const form = document.querySelector('form');
const locationInput = form.location;

form.addEventListener('submit', e => {
  e.preventDefault();
  const location = locationInput.value.trim();
  locationInput.value = '';
  searchResultEl.textContent = 'Loading...';


  fetch(`/weather?address=${location}`)
    .then(res => res.json())
    .then(({ error, ...data }) => {
      if (error) return (searchResultEl.textContent = error);

      const html = `
        <p>Temp: ${data.temperature}, It's ${data.precipProbability}% to rain</p>
        <p>${data.location} is ${data.summary}</p>
      `;
      searchResultEl.innerHTML = html;
    })
    .catch(err => console.log(err));
});
