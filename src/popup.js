const events = [
  {
    name: 'Mile',
    distance: 1609,
  },
  {
    name: '5k',
    distance: 5000,
  },
  {
    name: '10k',
    distance: 10000,
  },
];

const selectEvent = document.getElementById('event');
events.forEach(function(e) {
  const child = document.createElement('option');
  child.setAttribute('value', e.name);
  child.innerHTML = e.name;
  selectEvent.appendChild(child);
});
