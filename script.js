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
