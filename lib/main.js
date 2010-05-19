// The `main` function is called by the host application that enables
// this module. In this example, `options` and `callbacks` are not
// used.
exports.main = function(options, callbacks) {

    var tabBrowser = require("tab-browser");
    var downloader = require("downloader");
    tabBrowser.whenContentLoaded(function(window) {
        if (window.location.host == "8tracks.com") require("8tracks").init(window);
    });
};
