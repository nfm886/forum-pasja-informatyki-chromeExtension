const userPreferences = {};

chrome.storage.sync.get(['theme', 'sounds'], storage => {
    userPreferences.theme = storage.theme;
    userPreferences.sounds = storage.sounds;
});

chrome.storage.sync.get(['theme', 'sounds'], storage => {
    $(`#${storage.theme}`).attr('checked', true);
    $(`#${storage.sounds}`).attr('checked', true);
});

const closeSettings = () => window.close();
const saveSettings = () => {
    chrome.storage.sync.set({
        theme: userPreferences.theme,
        sounds: userPreferences.sounds
    });
}

function themeChanged() {
    userPreferences.theme = this.getAttribute('id');
}
function soundsChanged() {
    userPreferences.sounds = this.getAttribute('id');
}

$('input[name="theme"]').on('change', themeChanged);
$('input[name="sound"]').on('change', soundsChanged);
$('.close').on('click', closeSettings);
$('.save').on('click', saveSettings);