"use strict";
const filters = document.querySelectorAll('[data-filter]');
const places = document.querySelectorAll('[data-category]');
filters.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    let count = 0;
    places.forEach(place => {
      place.hidden = selected !== 'all' && place.dataset.category !== selected;
      if (!place.hidden) count++;
    });
    document.querySelector('#filter-status').textContent = `${count} places shown`;
  });
});
