$('input[name="theme"]').on('change', themeChanged);
$('input[name="sound"]').on('change', soundsChanged);
$('.close').on('click', closeSettings);
$('.save').on('click', saveSettings);

let userPreferences = {};

chrome.storage.sync.get(['theme', 'sounds'], (options) => {
    userPreferences.theme = options.theme;
    userPreferences.sounds = options.sounds;
});

function checkPreferencesRadios() {
    chrome.storage.sync.get(['theme', 'sounds'], (options) => {
        console.log(options.theme, options.sounds)
        $(`#${options.theme}`).attr('checked', true);
        $(`#${options.sounds}`).attr('checked', true);
    });
}

function closeSettings() {
    window.close();
}

function themeChanged() {
    userPreferences.theme = this.getAttribute('id');
}

function soundsChanged() {
    userPreferences.sounds = this.getAttribute('id');
}

function saveSettings() {
    chrome.storage.sync.set({
        theme: userPreferences.theme,
        sounds: userPreferences.sounds
    });
}

checkPreferencesRadios();