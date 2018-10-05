chrome.storage.sync.get(['theme'], storage => {
    $('head').append(`<link rel="stylesheet" href="../assets/themes/${storage.theme}.css">`);
});

const clearBadge = () => chrome.browserAction.setBadgeText({text: ''});

const fd = new FormData();
const req = new XMLHttpRequest();

fd.append('ajax', 'receiveNotify');
req.open('POST', 'https://forum.pasja-informatyki.pl/eventnotify');
req.onreadystatechange = e => {
    if(req.readyState === 4 && req.status === 200) {
        const response  = req.responseText;
        const nfyContainerInbox = $(response).find('#nfyContainerInbox');

        if(response !== 'Userid is empty!') {
            $('.nfyContainer').empty();
            $('.nfyContainer').append(nfyContainerInbox);
            $('a').attr('target', '_blank');
            $(response).find('.nfyFooter').remove();

            clearBadge();
        } else {
            const template = `<div id="nfyWrap" class="nfyWrap">
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
req.send(fd);

