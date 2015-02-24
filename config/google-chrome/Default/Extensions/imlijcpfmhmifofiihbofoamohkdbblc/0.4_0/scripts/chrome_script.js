/**
 * Author: Eric J. Duran
 * 
 * This is the chrome script use to send and received the message from the client.
 * This is the only way to get access to the clients DOM.
 * 
 * This script also handles the "tabs" display
 */
 

//Roundtrip to Port.postMessage() after opening a channel.
function clientConnect(item) {
  chrome.tabs.getSelected(null, function(tab) {
    var port = chrome.tabs.connect(tab.id);
    var isphpFrame = (item == '#drupalforfirebug_php') ? 1 : 0;
    port.postMessage({menu: item});
    port.onMessage.addListener(function getResp(response) {
			if(response.src){
			   
				 $('#info-section').html(response.src);
				 
				 //we have to do bind it pretty late 
				 $('.toggler a').click(function(){
				   $(this).parent().parent().parent().children('.content').slideToggle();
				 });
				
				 //Open function links in a new tab
				 $('td a').click(function(){
				   chrome.tabs.create({url: $(this).attr("href")});
				 });
				 
				 //check if it's the php frame because there's not enought space
				 if(isphpFrame){
				   $('iframe').height(200);
				 }
			}
    });
  });
}

$(function(){
	$("#toolbar a").click(function() {
		var form_item = $(this).attr("href");
		clientConnect(form_item);
		$("#toolbar a").removeClass('active');
		$(this).addClass('active');
	});
});
