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

const placeDetails = {
  kathmandu: {title:'Kathmandu Valley', category:'LIVING HERITAGE', art:'city', html:'<span>काठमाडौँ</span><div class="temple"><i></i><i></i><i></i></div>', description:'Look closely at the courtyards and carved windows: architecture is part of the story here, alongside the everyday life of the city.'},
  pokhara: {title:'Pokhara', category:'LAKES & LANDSCAPES', art:'lake', html:'<span class="sun"></span><span class="ridge"></span><span class="boat"></span>', description:'Phewa Lake brings water and mountain scenery into the same view. This part of the project explores the quieter side of Nepal’s landscapes.'},
  lumbini: {title:'Lumbini', category:'HISTORY & REFLECTION', art:'garden', html:'<span class="stupa"></span>', description:'A place associated with the birth of the Buddha, Lumbini introduces another part of Nepal’s story: sacred history and reflection.'},
  himalayas: {title:'The Himalayas', category:'MOUNTAIN LANDSCAPES', art:'mountain', html:'', description:'The Himalayas extend across Nepal’s north. This point represents a broad mountain region, rather than a single destination or trail.'}
};
const placeButtons = document.querySelectorAll('[data-place]');
placeButtons.forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.place;
  const detail = placeDetails[key];
  placeButtons.forEach(item => item.setAttribute('aria-pressed', String(item.dataset.place === key)));
  document.querySelector('#detail-title').textContent = detail.title;
  document.querySelector('#detail-category').textContent = detail.category;
  document.querySelector('#detail-description').textContent = detail.description;
  const art = document.querySelector('#detail-art');
  art.className = `art ${detail.art}`;
  // Markup comes only from the static, local place definitions above.
  art.innerHTML = detail.html;
  document.querySelector('#detail-link').href = `#place-${key}`;
}));
const detailLink = document.querySelector('#detail-link');
if (detailLink) detailLink.addEventListener('click', () => {
  // A selected place must remain reachable even if its category was filtered out.
  document.querySelector('[data-filter="all"]').click();
});
