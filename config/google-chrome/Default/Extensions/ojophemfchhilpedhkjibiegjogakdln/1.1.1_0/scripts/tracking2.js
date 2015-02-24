// for button tracking
$(document).ready(function(){
    $('.tracked').click(function(){
      _gaq.push(['_trackEvent', $(this).text(), 'clicked']);
    });
});