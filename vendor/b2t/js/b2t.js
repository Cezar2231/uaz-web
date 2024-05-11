// get our button by class
var b2t = document.querySelector('.b2t_btn');


// very simple function to move document to "pos" position.
function moveTo(pos) {
	document.documentElement.scrollTop = pos;
}

// our page scroll event function, this is called on any scroll event
function pageScrollEvent() {
	// get our current scoll offset
	var currentScroll = document.documentElement.scrollTop;
	
	// only show our b2t button if scroll offset is above 10
	if (currentScroll > 10) {
		b2t.style.display = "flex";
	} else {
		b2t.style.display = "none";
	}
	
	// get the relative height
	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	
	// convert scoll offset into a percentage
	var scrolled = (currentScroll / height) * 100;
	
	// update our custom progress property/variable
	b2t.style.setProperty('--b2t_progress', scrolled + '%');
}


// set the scroll event which calls our scroll event function.
window.onscroll = function() { pageScrollEvent() };