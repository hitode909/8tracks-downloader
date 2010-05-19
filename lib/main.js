exports.main = function(options, callbacks) {
    var tabBrowser = require("tab-browser");
    var EightTracks = require("8tracks");
    tabBrowser.whenContentLoaded(function(window) {
        if (window.location.host == "8tracks.com") EightTracks.init(window);
    });
};
