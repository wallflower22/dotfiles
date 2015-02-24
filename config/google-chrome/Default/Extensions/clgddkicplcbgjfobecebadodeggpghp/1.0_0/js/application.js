// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalScoreManager);
});
// Close button handler
window.document.getElementById('closeButton').onclick = function() {
	chrome.app.window.current().close();
}