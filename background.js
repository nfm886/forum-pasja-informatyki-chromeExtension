chrome.runtime.onInstalled.addListener(updateBadge);

function updateBadge() {

  const xhttp = new XMLHttpRequest();

  xhttp.open('GET', 'https://forum.pasja-informatyki.pl/async-notifications', true);
  xhttp.onreadystatechange = function(evt) {
    if(xhttp.readyState == 4 && xhttp.status === 200) {
      response = xhttp.response;
      
      if(Number(response) > 0)
        chrome.browserAction.setBadgeText({text: response});
      else
        chrome.browserAction.setBadgeText({text: ''});
    }
  }
  xhttp.send(null);
}

setInterval(updateBadge, 1000*60);
