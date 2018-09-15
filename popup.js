function showNotifications() {

    const fd = new FormData();
    fd.append('ajax', 'receiveNotify');

    const xhttp = new XMLHttpRequest();

    xhttp.open('POST', 'https://forum.pasja-informatyki.pl/eventnotify', true);
    xhttp.onreadystatechange = function(evt) {
        if(xhttp.readyState === 4 && xhttp.status === 200) {

            const response  = xhttp.responseText;

            $('.notifications').empty();
            $('.notifications').append(response);

            $('a').attr('target', '_blank');

            $('.nfyFooter a').attr('href', 'https://github.com/nfm886/forum-pasja-informatyki-chromeExtension');
            $('.nfyFooter a').text('GitHub')

            $('#nfyReadClose').on('click', () => {
                window.close();
            });

            clearBadge();
        }
    }
    xhttp.send(fd);
}

function clearBadge() {
    chrome.browserAction.setBadgeText({text: ''});
}

showNotifications();