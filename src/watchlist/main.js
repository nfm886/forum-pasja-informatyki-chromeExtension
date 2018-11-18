const followList = new Array();
const watchList = new Array();
const lastQuestions = new Array();

const appendPosts = data => {
  const sorted = data.sort((a,b) => b.date - a.date);

  const result = new Array();

  $.each(sorted, (i, e) => {
      const matchingItems = $.grep(result, (item) => {
        return item.title === e.title && item.url === e.url;
      });
      if (matchingItems.length === 0){
          result.push(e);
      }
  });

  $('#nfyContainerInbox').empty();
  for(let i = 0; i < result.length; i++) {
    const template = `<div class="itemBox">
                        <div class="nfyItemLine">
                          <p class="nfyWhat">
                            <span class="tag-icon"><i class="fab fa-slack"></i></span><a href="${result[i].url}" target="_blank">${result[i].title}</a>
                          </p>
                          <p class="nfyTime">${result[i].when} w <span class="show-tag">${result[i].tag}</span></p>
                        </div>
                      </div>`;
    $('#nfyContainerInbox').append(template);
  }

  chrome.storage.local.set({lastQuestions: lastQuestions});
}

const gettingPosts = (object, value) => {

  if(value >= 0) {
    const req = new XMLHttpRequest();
    req.open('GET', object[value].link, true);

    req.onreadystatechange = (e) => {
      if(req.readyState === 4 && req.status === 200) {

        const doc = req.responseText;
        const title = $(doc).find('div.qa-q-item-main > div.qa-q-item-title > a > span');
        const when = $(doc).find('div.qa-q-item-main > span > span > span.qa-q-item-when > span.qa-q-item-when-data');
        const urls = $(doc).find('div.qa-q-item-main > div.qa-q-item-title > a');
        
        lastQuestions.push({
          tag: object[value].name,
          title: html_unescape(title[0].innerHTML).trunc(65).toString(),
          url: urls[0].getAttribute('href').replace('../', 'https://forum.pasja-informatyki.pl/')
        });

        title.each((key, item) => {
          watchList.push({
            title: html_unescape(title[key].innerHTML).trunc(65).toString(),
            when: parseWhen(when[key].innerHTML),
            date: parseTime(when[key].innerHTML),
            tag: object[value].name,
            url: urls[key].getAttribute('href').replace('../', 'https://forum.pasja-informatyki.pl/')
          });
        });

        value = value - 1;
        gettingPosts(followList, value);
      }
    }
    req.send();
  } else {
    appendPosts(watchList);
  }
}

chrome.storage.sync.get(['followed'], storage => {
  if(storage.followed != undefined && storage.followed.length > 0) {
    for(let i = 0; i < storage.followed.length; i++) {
      followList.push({
        name: storage.followed[i].name,
        link: storage.followed[i].link
      });
    }
    gettingPosts(followList, followList.length - 1);
  } else {
    activateSettingsTab();
  }
});