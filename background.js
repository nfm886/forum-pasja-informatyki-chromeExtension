chrome.runtime.onInstalled.addListener(updateBadge);

function updateBadge() {

  const xhttp = new XMLHttpRequest();

  xhttp.open('GET', 'https://forum.pasja-informatyki.pl/', true);
  xhttp.onreadystatechange = function(evt) {
    if(xhttp.readyState == 4 && xhttp.status === 200) {
      reqBody = xhttp.responseText;

      const ntfyBadge = $(reqBody).find('#osnbox > a > span')[0].textContent;

      chrome.browserAction.setBadgeText({text: ntfyBadge});
    }
  }
  xhttp.send(null);
}

setInterval(updateBadge, 1000*60);
