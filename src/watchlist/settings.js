const activateWatchlistTab = () => {
  chrome.storage.sync.get(['followed'], storage => {
    if(storage.followed != undefined && storage.followed.length > 0) {
        location.reload();
    }
  });
}
const activateSettingsTab = () => {
  $('.lds-ripple').css('display', 'none');
  $('.watchListContainer').removeClass('activeTab');
  $('#gotoList').removeClass('active');
  $('.watchListSettings').addClass('activeTab');
  $('#gotoSettings').addClass('active');
}

const searching = tag => {
  let followed = '';
  chrome.storage.sync.get(['followed'], storage => {
    if(storage.followed != undefined) {
      followed = storage.followed
    }
  });
  $('.foundTags').empty();
  chrome.storage.local.get(['index'], storage => {
    if(storage.index != undefined) {
      if($('.searchTags').val().length >= 2) {
        for(let i = 0; i < storage.index.length; i++) {
          if(storage.index[i].name.toLowerCase().indexOf(tag.toLowerCase()) != -1) {
              if(!followed.includes(storage.index[i].name)) {
                $('.foundTags').css('display', 'block');
                $('.foundTags').append(`<li><button class="addToWatchlist" data-name="${storage.index[i].name}" data-link="${storage.index[i].href}">+</button> ${storage.index[i].popularity} ${storage.index[i].name}</a></li>`);
              }
          }
        }
      }
    }
  });
}

const hideSearchList = () => {
  if($('.searchTags').val() == '') {
    $('.foundTags').empty();
    $('.foundTags').css('display', 'none');
  }
}

const clearSearchField = () => {
  $('.searchTags').val('');
  hideSearchList();
}

const removeIndexingStatus = () => {
  $('.scanning').text('');
}

const following = () => {
  chrome.storage.sync.get(['followed'], storage => {
    if(storage.followed != undefined) {
      if(storage.followed.length > 0) {
        $('.followed').empty();
        for(let i = 0; i < storage.followed.length; i++) {
          $('.following p').text('Obserwujesz');
          $('.followed').append(`<li><button class="removeFromWatchlist" data-name="${storage.followed[i].name}"><i class="fas fa-eraser"></i></button> ${storage.followed[i].name} </li>`)
        }
      } else {
        $('.followed').empty();
        $('.following p').text('Brak obserowawanych tagów');
      }
    }
  });
}

function addToWatchList() {
  const temp = new Array();

  chrome.storage.sync.get(['followed'], storage => {
    if(storage.followed != undefined) {
      for(let i = 0; i < storage.followed.length; i++)
      temp.push({
        name: storage.followed[i].name,
        link: storage.followed[i].link
      })
    }
    temp.push({
      name: this.dataset.name,
      link: this.dataset.link
    });
    chrome.storage.sync.set({followed: temp});
    $(this).closest('li').remove();
    following();
  });
}

function removeFromWatchlist() {
  const toRemove = this.dataset.name;
  chrome.storage.sync.get(['followed'], storage => {
    let followed = storage.followed;
    followed = followed.filter((object) => {
      return object.name != toRemove;
    });
    chrome.storage.sync.set({
      followed: followed
    });
    following();
  });
}

chrome.storage.sync.get(['theme'], storage => $('head').append(`<link rel="stylesheet" href="../assets/themes/${storage.theme}.css">`));

chrome.storage.local.get(['index', 'lastScan'], storage => {
  if(storage.index != undefined) {
    $('.last span').text(storage.lastScan);
    $('.indexed span').text(storage.index.length);
  }
});

$('.searchTags').on('input', () => {
  searching($('.searchTags').val());
});
$('.searchTags').focus(removeIndexingStatus);
$('.searchTags').focusout(hideSearchList);
$('.search-field .clear').on('click', clearSearchField);
$('.foundTags').on('click', 'button.addToWatchlist', addToWatchList);
$('.foundTags').on('click', 'button.removeFromWatchlist', removeFromWatchlist);
$('.followed').on('click', 'button.removeFromWatchlist', removeFromWatchlist);
$('.switchTab').on('click', (e) => {
  const target = e.target.innerHTML;
  switch(target) {
    case 'Pokaż': activateWatchlistTab()
      break;
    case 'Ustawienia': activateSettingsTab()
      break;
  }
});

following();