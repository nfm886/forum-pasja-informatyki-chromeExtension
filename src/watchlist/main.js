const followList = new Array();
const watchList = new Array();

const parseTime = (string) => {

	const lang = {
		'stycznia': 'January',
		'lutego': 'February',
		'marca': 'March',
		'kwietnia': 'April',
		'maja': 'May',
		'czerwca': 'June',
		'lipca': 'July',
		'sierpnia': 'August',
		'września': 'September',
		'października': 'October',
		'listopada': 'November',
		'grudnia': 'December'
	}

	const int = parseInt(string);
	const monthString = string.substring(string.indexOf(' ') + 1);
	const currentYear = new Date().getFullYear();

	if(string.indexOf('sekund') != -1)
		return Math.abs(new Date() - int * 1000);
	else if(string.indexOf('minut') != -1)
		return Math.abs(new Date() - int * 60 * 1000);
	else if(string.indexOf('godzin') != -1)
		return Math.abs(new Date() - int * 60 * 1000 * 60);
	else if(string.indexOf('dzień') != -1 || string.indexOf('dni') != -1)
		return Math.abs(new Date() - int * 60 * 1000 * 60 * 24);
	else 
		return Date.parse(`${lang[monthString]} ${int}, ${currentYear}`);

}

const html_unescape = html => html.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const appendPosts = data => {
  const sorted = data.sort((a,b) => b.date - a.date);

  const result = new Array();
  $.each(sorted, function (i, e) {
      const matchingItems = $.grep(result, function (item) {
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
                            <a href="${result[i].url}" target="_blank">${result[i].title}</a>
                          </p>
                          <p class="nfyTime">${result[i].when} w <span class="show-tag">${result[i].tag}</span></p>
                        </div>
                      </div>`;
    $('#nfyContainerInbox').append(template);
  }
}

String.prototype.trunc = String.prototype.trunc ||
  function(n) {
    return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
  }

const parseWhen = when => (when.indexOf('dni') != -1) || (when.indexOf('dzień') != -1 ) || (when.indexOf('godzin') != -1) || (when.indexOf('minut') != -1) ? when + ' temu' : when;

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