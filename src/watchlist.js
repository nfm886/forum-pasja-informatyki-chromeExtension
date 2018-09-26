function setUserTheme() {
  chrome.storage.sync.get(['theme'], (options) => {
      $('head').append(`<link rel="stylesheet" href="../assets/themes/${options.theme}.css">`);
  });
}

setUserTheme();