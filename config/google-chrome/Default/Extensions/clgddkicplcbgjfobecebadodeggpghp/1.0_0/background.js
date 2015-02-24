chrome.app.runtime.onLaunched.addListener(function() {
  var wnd = chrome.app.window.create('window.html', {
    bounds: {
      'width':  500,
      'height': 580
    },
	minWidth: 500,
    minHeight: 580,
	maxWidth: 500,
    maxHeight: 580,
	frame : 'none',
	state : 'normal',
	resizable : false
  });
});