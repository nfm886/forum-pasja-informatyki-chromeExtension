const tags = new Array();
const url = 'https://forum.pasja-informatyki.pl/tags?start=';
let start = 0;
let pages = 0;

const indexing = (url, start) => {
  $('.scanning').text('Nie zamykaj tego okna do zakończenia.');
  
  const req = new XMLHttpRequest();
  req.open('GET', url + start);
  req.onreadystatechange = e => {
    if(req.readyState === 4 && req.status === 200) {
      const doc = req.responseText;
      const tag = $(doc).find('.qa-tag-link');
      const popularity = $(doc).find('.qa-top-tags-count');
  
      tag.each((key, item) => {
        tags.push({
          name: item.innerText,
          popularity: popularity[key].innerText,
          href: item.getAttribute('href').replace('./', 'https://forum.pasja-informatyki.pl/')
        });
      });

      if(pages === 0) {
        const pagination = $(doc).find('.qa-page-links-item');
        pages = parseInt(pagination[pagination.length - 2].innerText);
      }

      const progress = tags.length / (pages * 30) * 100;
      $('.indexed span').text(tags.length);
      $('.progress').attr('value', progress);

      if(start <= pages * 30) {
        start += 30;
        indexing(url, start);
      } else {
        const currentdate = new Date(); 
        const datetime = currentdate.getDate() + "/"
                        + (currentdate.getMonth()+1)  + "/" 
                        + currentdate.getFullYear() + " o "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes();
        $('.last span').text(datetime);
        $('.scanning').text('Zakończono. Teraz możesz zamknąć to okno lub poszukać tagów do obserwowania.')
        $('.runScan').text('Uruchom indeksowanie');
        $('.runScan').attr('disabled', false);
        $('.searchTags').attr('disabled', false);

        setTimeout(() => {
          $('.progress').css('display', 'none');
        }, 700);

        chrome.storage.local.set({
          index: tags,
          lastScan: datetime
        });
        
        return tags;
      }
    }
  }
  req.send();
}

$('.runScan').on('click', () => {
  $('.progress').css('display', 'block');
  $('.runScan').text('Praca w toku...');
  $('.runScan').attr('disabled', true);
  $('.searchTags').attr('disabled', true);
  indexing(url, start);
});