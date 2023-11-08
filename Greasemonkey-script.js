// ==UserScript==
// @name         Abundance Foodclub UNFI Code Links
// @namespace    abundancefoodclubunficodelinks
// @version      1.0
// @description  Makes all product codes into links to the respective items on myunfi.com/shopping
// @author       Guguano
// @match        https://foodclub.org/abundance/*
// @grant        none
// ==/UserScript==


(function() {
	'use strict';
  var hidePopup = false;
  const infoPopup = document.getElementById('productInfoContainer');
  if (infoPopup) {
    const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'style') {
        // Check if the display property changed
        if (infoPopup.style.display !== 'none') {
          if (hidePopup) {
            hidePopup = false;
            infoPopup.style.display = 'none'
          }
        }
      }
      });
    });

    const config = { attributes: true, attributeFilter: ['style'] };
    observer.observe(infoPopup, config);
  }
  
	var codes = document.getElementsByClassName('CodeCol');
	// Iterate over the elements and add a link
  for (var elem of codes) {
    // Create a new link element
		var link = document.createElement('a');
    
    // Set the link text
		link.textContent = elem.textContent; 
    
    // Set the link destination
    var code = elem.textContent;
    if (code.length < 7) {
      for (let i = 0; i < (7 - code.length); i++) {
    		code = '0' + code;
  		}
    }
		link.href = 'https://www.myunfi.com/shopping/items/' + code; 
    
    
    // Set target and rel attributes
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

		// Empty the td content and append the link
		elem.textContent = '';
		elem.appendChild(link);
    
    // set elem onclick
    elem.addEventListener('click', function(e) {
    	hidePopup = true;
		});
  }
  
  /*
	// Function to create the popup
  function createPopup(url) {
		var popup = document.createElement('div');
		popup.style.position = 'fixed';
		popup.style.top = '10px';
		popup.style.left = '10px';
		popup.style.width = '300px';
		popup.style.height = '200px';
		popup.style.backgroundColor = 'white';
		popup.style.border = '1px solid black';
		popup.style.zIndex = '1000';
		popup.innerHTML = '<iframe src="' + url + '" width="100%" height="100%"></iframe>';
		document.body.appendChild(popup);
		return popup;
	}
	
  
  // Add hover event to all links
  codes = document.getElementsByClassName('CodeCol');
  for (var codeLink of codes) {
		codeLink.addEventListener('mouseover', function() {
      var codeHref = codeLink.querySelector('a').href;
			var popup = createPopup(codeHref);
    
			codeLink.addEventListener('mouseout', function() {
				document.body.removeChild(popup);
			});
		});
	}
  */
})();