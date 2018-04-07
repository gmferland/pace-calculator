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
  child.setAttribute('value', escapeText(e.name));
  child.innerHTML = escapeText(e.name);
  selectEvent.appendChild(child);
});

function escapeText(text) {
  let returnText = '';
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    switch (char) {
      case '&':
        returnText = returnText.concat('&amp');
      case '<':
        returnText = returnText.concat('&lt');
      case '>':
        returnText = returnText.concat('&gt');
      case '"':
        returnText = returnText.concat('&quot');
      case "'":
        returnText = returnText.concat('&#x27');
      case '/':
        returnText = returnText.concat('&#x2F');
      default:
        returnText = returnText.concat(char);
    }
  }
  return returnText;
}
