$('.page-watchlist').on('click', () => {
  window.location = '../../views/watchlist.html';
});

$('.page-notifications').on('click', () => {
  window.location = '../../views/popup.html';
});

$('#nfyReadClose').on('click', () => {
  window.close();
});