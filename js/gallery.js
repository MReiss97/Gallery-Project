// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (/* function */ callback, /* DOMElement */ element) {
			window.setTimeout(callback, 1000 / 60);
		};
})();


// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
	requestAnimFrame(animate);
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	// Increment the current index
	mCurrentIndex++;

	// Check if the current index is greater than or equal to the length of mImages
	if (mCurrentIndex >= mImages.length) {
		// Reset the current index to 0
		mCurrentIndex = 0;
	}

	   // Access the 'photo' in the HTML document
	let photoElement = document.getElementById('photo');

	// Set the src equal to the array called mImages using the mCurrentIndex
	photoElement.src =  mImages[mCurrentIndex].img;
	// document.getElementById('photo').src = mImages[mCurrentIndex].img;

	  // Create variables for location, description, and date
	let locationElement = document.getElementsByClassName('location')[0];
	let descriptionElement = document.getElementsByClassName('description')[0];
	let dateElement = document.getElementsByClassName('date')[0];

	 // Set innerHTML for location, description, and date
	locationElement.innerHTML = "Location: " + mImages[mCurrentIndex].location;
	descriptionElement.innerHTML = "Description: " + mImages[mCurrentIndex].description;
	dateElement.innerHTML = "Date: " + mImages[mCurrentIndex].date;
	console.log('swap photo');

	// Set mLastFrameTime variable to zero
	let mLastFrameTime = 0;

	// Increase the current index number by 1 using the += operator
	mCurrentIndex += 1;
}

function previousPhoto() {
	// Decrement the current index
	mCurrentIndex--;

	// Check if the current index is less than 0
	if (mCurrentIndex < 0){
		// Set the current index to the last image in the array mImages
		mCurrentIndex = mImages.length - 1;
	}

	// Call the swapPhoto function to update the displayed photo and information
	swapPhoto();
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function (e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready(function () {
	fetchJSON();
	// This initially hides the photos' metadata information
	// $('.details').eq(0).hide();
	

});

window.addEventListener('load', function () {

	console.log('window loaded');
	fetchJSON();
}, false);

function galleryImage() {
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	let imgLocation
	//2. description of photo
	let description
	//3. the date when the photo was taken
	let date
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
	let imgPath
}


function fetchJSON() {
	mRequest.onreadystatechange = function () {
		// Sends a signal to connect to the server
		if (this.readyState == 4 && this.status == 200) {
			let mJson = JSON.parse(mRequest.responseText);
			console.log(mJson);
			iterateJSON(mJson);
		} else {
			// Logs an error if it happens
			console.log("We connected to the server but an error occured")
		}
		
	}
	
	mRequest.open('GET', mUrl, true)
	mRequest.send()
}

function iterateJSON(mJson) {
	for (let x = 0; x < mJson.images.length; x ++) {
		// Create a new GalleryImage object for each iteration
		mImages[x] = new galleryImage();
		// Access the mImages array using the variable x as the index
		
		// Set attributes using dot notation from mJson
		mImages[x].location = mJson.images[x].imgLocation;
		mImages[x].description = mJson.images[x].description;
		mImages[x].date = mJson.images[x].date;
		mImages[x].img = mJson.images[x].imgPath;
	  }

}

$(document).ready(function(){
	// Click handler for img.moreIndicator
	$('img.moreIndicator').click(function(){
	  let $indicator = $(this);
	  let $details = $('.details');
	  // Toggle rotation classes
	  if ($indicator.hasClass('rot90')) {
		$indicator.removeClass('rot90').addClass('rot270');
	  } else {
		$indicator.removeClass('rot270').addClass('rot90');
	  }
	  // Slide down/up details div
	  $details.slideToggle();
	});
  
	// Offset #nextPhoto to the right side of #nav div
	$('#nextPhoto').position({
	  my: 'right',
	  at: 'right',
	  of: '#nav'
	});
  
	// Click handler for navigating to the next photo
	$('#nextPhoto').click(function() {
	 swapPhoto();
	});
  
	// Click handler for navigating to the previous photo
	$('#prevPhoto').click(function() {
		mCurrentIndex--;
		swapPhoto();
	});
  });