function showNotifications() {

  let reqBody;
  let notificationTitles = [];
  let notificationIcon = [];
  let notificationWhen = [];
  let notificationLinks = [];
  let notificationMetaAction = [];
  let notificationWhere = [];
  let notificationWhereLink = [];

  const xhttp = new XMLHttpRequest();

  xhttp.open('GET', 'https://forum.pasja-informatyki.pl/updates', true);
  xhttp.onreadystatechange = function(evt) {
    if(xhttp.readyState == 4 && xhttp.status === 200) {
      reqBody = xhttp.responseText;

      const ntfyTitle = $(reqBody).find('div.qa-q-item-main > div.qa-q-item-title > a > span');
      const ntfyWhen = $(reqBody).find('div.qa-q-item-main > span > span > span.qa-q-item-when > span.qa-q-item-when-data');
      const ntfyMeta = $(reqBody).find('div.qa-q-item-main > span > span > a');
      const ntfyWhere = $(reqBody).find('div.qa-q-item-main > span > span > span.qa-q-item-where > span.qa-q-item-where-data > a');

      ntfyTitle.each((key, value) => notificationTitles.push(strip_html_tags(value.textContent)));
      ntfyWhen.each((key, value) => {
        if(value.textContent.indexOf('dni') != -1 || value.textContent.indexOf('dzień') != -1) {
          notificationWhen.push(value.textContent + ' temu');
        } else {
          notificationWhen.push(value.textContent);
        }
      });
      ntfyMeta.each((key, value) => {
        let filteredLink = $(value).attr('href').replace('./', 'https://forum.pasja-informatyki.pl/');
        notificationLinks.push(filteredLink);
        if(value.textContent.indexOf('koment') != -1) {
          notificationIcon.push('comment');
          notificationMetaAction.push('Komentarz do');
        }
        else if(value.textContent.indexOf('wybrana') != -1) {
          notificationIcon.push('best');
          notificationMetaAction.push('Najlepsza odpowiedź w');
        }
        else {
          notificationMetaAction.push(value.textContent);
        }
      });

      ntfyWhere.each((key, value) => {
        notificationWhere.push(value.textContent);
        let filteredLink = $(value).attr('href').replace('./', 'https://forum.pasja-informatyki.pl/');
        notificationWhereLink.push(filteredLink);
      });

      $('.notification-container').empty();
      $('.notification-container').append(`
        <div class="notification__actions">
          <span class="notification__actions--info"><a href="https://forum.pasja-informatyki.pl" target="_blank">Forum Pasja Informatyki</a></span>
          <span class="notification__actions--close">zamknij [ x ]</span>
        </div>`);

      for(let i = 0; i < notificationTitles.length; i++) {
        $('.notification-container').append(`
          <div class="notification__item">
            <h3 class="notification__header">
            <span class="notification__header--action">
              <img class="notification__header--icon" src="images/${notificationIcon[i]}-icon.png">
              ${notificationMetaAction[i]}</span>
              <span class="notification__header--link">
               <a href="${notificationLinks[i]}" target="_blank">${notificationTitles[i]}</a>
              </span>
            </h3>
            <h6 class="notification__meta">
              ${notificationWhen[i]} w <a href="${notificationWhereLink[i]}" target="_blank">${notificationWhere[i]}</a>
            </h6>
          </div>`);
      }

      $('.notification__actions--close').on('click', function() {
        window.close();
      });
    }
  }
  xhttp.send(null);
}

function strip_html_tags(str)
{
   if ((str===null) || (str===''))
       return false;
  else
   str = str.toString();
  return str.replace(/<[^>]*>/g, '');
}

showNotifications();