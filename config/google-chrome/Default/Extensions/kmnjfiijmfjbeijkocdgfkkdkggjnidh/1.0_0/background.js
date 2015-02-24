(function(){
function go(a){
	chrome.tabs.getSelected(null,function(l){
		chrome.tabs.update(l.id,{url:a})
	})
}
chrome.omnibox.onInputChanged.addListener(function(text, suggest){
	
	var regex = new RegExp("^" + text, "i");
    if(ver = localStorage['version']){
    	// 
    }else{
        ver = 6;
    }

	if(ver == 5){
		new_array = api5.grep(regex);
	}else if(ver == 6){
		new_array = api6.grep(regex);
	}else if(ver == 7){
		new_array = api7.grep(regex);
	}else if(ver == 8){
		new_array = api8.grep(regex);
	}else{
		new_array = api6.grep(regex);
	}

	if(new_array.length > 5){
		last = 5;
	}
	else if(new_array.length > 0){
		last = new_array.length;
	}
	else{
		last = 0;
	}

	for(b=0;b<last;b++){
		suggest([
	      {content: new_array[b], description: new_array[b] },
	    ]);
	}
});

chrome.omnibox.onInputEntered.addListener(function(text){
	if(ver = localStorage['version']){
    	// 
    }else{
        ver = 6;
    }
	var url = "http://api.drupal.org/api/search/"+ ver + "/" + text;
	go(url);
});

})();
