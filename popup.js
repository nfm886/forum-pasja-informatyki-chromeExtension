function showNotifications() {

    const fd = new FormData();
    fd.append('ajax', 'receiveNotify');

    const xhttp = new XMLHttpRequest();

    xhttp.open('POST', 'https://forum.pasja-informatyki.pl/eventnotify', true);
    xhttp.onreadystatechange = function(evt) {
        if(xhttp.readyState === 4 && xhttp.status === 200) {

            const response  = xhttp.responseText;

            if(response != 'Userid is empty!') {

                $('.notifications').empty();
                $('.notifications').append(response);
                

                $('a').attr('target', '_blank');

                $('.nfyFooter a').attr('href', 'https://github.com/nfm886/forum-pasja-informatyki-chromeExtension');
                $('.nfyFooter a').text('GitHub')

                $('#nfyReadClose').on('click', () => {
                    window.close();
                });

                clearBadge();
            } else {
                const template = `
                    <div id="nfyWrap" class="nfyWrap">
                        <div class="nfyTop">Nie jesteś zalogowany <a id="nfyReadClose" href="https://forum.pasja-informatyki.pl/login" target="_blank">zaloguj się</a></div>
                        <div class="nfyContainer">
                            <div id="nfyContainerInbox" class="emptyActivity">
                                <p>Brak aktywności</p>
                            </div>
                            <div class="nfyFooter">
                                <a href="https://github.com/nfm886/forum-pasja-informatyki-chromeExtension" target="_blank">GitHub</a>
                            </div>
                        </div>
                    </div>`;
                $('.notifications').empty();
                $('.notifications').append(template);
            }
        }
    }
    xhttp.send(fd);
}

function clearBadge() {
    chrome.browserAction.setBadgeText({text: ''});
}

showNotifications();