// Fills in the "DATE:" field in the header strip with today's date,
// formatted like a document control field (e.g. 12 JUL 2026).
(function () {
  var el = document.getElementById('doc-date');
  if (!el) return;

  var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  var d = new Date();
  var formatted = String(d.getDate()).padStart(2, '0') + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();

  el.textContent = 'DATE: ' + formatted;
})();

// Types the title block in line by line, like it's being struck out on a
// typewriter. Falls back to showing everything instantly if the visitor
// has reduced motion set, or if something goes wrong.
(function () {
  var lines = Array.prototype.slice.call(document.querySelectorAll('[data-type]'));
  if (!lines.length) return;

  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Store each line's real text, then clear it for typing.
  var originals = lines.map(function (el) { return el.textContent; });

  if (prefersReducedMotion) {
    return; // leave original text in place, no animation
  }

  lines.forEach(function (el) { el.textContent = ''; });

  var CHAR_DELAY = 22;   // ms per character
  var LINE_PAUSE = 160;  // ms pause between lines

  function typeLine(index) {
    if (index >= lines.length) return;

    var el = lines[index];
    var text = originals[index];
    var cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    el.appendChild(cursor);

    var charIndex = 0;

    function typeChar() {
      if (charIndex < text.length) {
        cursor.insertAdjacentText('beforebegin', text.charAt(charIndex));
        charIndex++;
        setTimeout(typeChar, CHAR_DELAY);
      } else {
        cursor.classList.add('typing-cursor--done');
        setTimeout(function () { typeLine(index + 1); }, LINE_PAUSE);
      }
    }

    typeChar();
  }

  typeLine(0);
})();
