
var count = 0;
function launchWindow() {
  chrome.app.window.create('repro.html', { width: 800, height: 600 }, function(win) {
    win.contentWindow.onload = function (e) {
      var webview = win.contentWindow.document.querySelector('webview');

      webview.addEventListener('loadcommit', function(event) {
        if (count < 3) { ++count;
        win.close();
        launchWindow(); }
      });

      webview.src = 'http://www.google.com/';
    };
  });
}

chrome.app.runtime.onLaunched.addListener(function() {
  launchWindow();
});
