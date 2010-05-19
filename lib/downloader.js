function escapeForFilename(a) {
    return a.replace(/\//g, '_');
};

exports.download = function download(sourceURL, saveAs) {
    // https://dev.mozilla.jp/2009/12/downloading-files-with-download-manager/
    var ioSvc = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    var sourceURI = ioSvc.newURI(sourceURL, null, null);

    var dlMgr = Cc["@mozilla.org/download-manager;1"].getService(Ci.nsIDownloadManager);

    var targetFile = dlMgr.defaultDownloadsDirectory;
    if (!saveAs) saveAs = sourceURL.match(/[^\/]+$/);
    targetFile.appendRelativePath(escapeForFilename(saveAs));

    var targetURI = ioSvc.newFileURI(targetFile);

    var persist = Cc["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].
        createInstance(Ci.nsIWebBrowserPersist);

    persist.persistFlags = Ci.nsIWebBrowserPersist.PERSIST_FLAGS_REPLACE_EXISTING_FILES |
        Ci.nsIWebBrowserPersist.PERSIST_FLAGS_BYPASS_CACHE |
        Ci.nsIWebBrowserPersist.PERSIST_FLAGS_AUTODETECT_APPLY_CONVERSION;

    var dl = dlMgr.addDownload(
	Ci.nsIDownloadManager.DOWNLOAD_TYPE_DOWNLOAD,
	sourceURI,
	targetURI,
	null,
	null,
	Math.round(Date.now() * 1000),
	null,
	persist
    );

    persist.progressListener = dl.QueryInterface(Ci.nsIWebProgressListener);
    persist.saveURI(dl.source, null, null, null, null, dl.targetFile);
}