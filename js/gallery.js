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
	photoElement.src = mImages[mCurrentIndex].img;

	  // Create variables for location, description, and date
	let locationElement = document.getElementsByClassName('location');
	let descriptionElement = document.getElementsByClassName('description');
	let dateElement = document.getElementsByClassName('date');

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

function previousPhoto(){
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

	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();

});

window.addEventListener('load', function () {

	console.log('window loaded');

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
		if (this.readyState >= 200 && this.status < 400) {
			var mJson = JSON.parse(mRequest.responseText);
			console.log(mJson)
		} else {
			// Logs an error if it happens
			console.log("We connected to the server but an error occured")
		}
	}
	mRequest.open(GET, mUrl, true)
	mRequest.send()
}



