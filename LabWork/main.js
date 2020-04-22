"use strict";

var slideNumber = 1;
var changing;
var sliderElement;
var timer;

function changeSlide(delta) {
	if (!changing) {
		clearTimeout(timer);
		slideNumber = (1 + (slideNumber + 4 + delta) % 5);
		startSlideChange();
	}
}

function closeFeedbackPopup() {
	document.getElementById('popup').style.display = 'none';
}

function endSlideChange() {
	changing = false;
	timer = setTimeout(changeSlide.bind(null, 1), 3200);
}

function formSubmitHandler(event) {
	event.preventDefault();
	closeFeedbackPopup();
	alert('Повідомлення відправлено, очікуйте на відповідь.');
}

function startSlideshow() {
	sliderElement = document.getElementById('slider-image')
	timer = setTimeout(changeSlide.bind(null, 1), 3200);
}

function restartAnimation(element) {
	var newElement = element.cloneNode();
	var parent = element.parentNode;
	newElement.innerHTML = element.innerHTML;
	parent.insertBefore(newElement, element);
	parent.removeChild(element);
	return newElement;
}

function showFeedbackPopup() {
	var wrapper = document.getElementById('popup');
	wrapper = restartAnimation(wrapper);
	wrapper.style.display = 'flex';
}

function showNewSlide() {
	sliderElement.style.backgroundImage = "url('img/sl" + slideNumber + ".jpg')";
	sliderElement.className = 'fade fade-in';
	sliderElement = restartAnimation(sliderElement);
	setTimeout(endSlideChange, 400);
}

function startSlideChange() {
	changing = true;
	sliderElement.className = 'fade fade-out';
	sliderElement = restartAnimation(sliderElement);
	setTimeout(showNewSlide, 400);
}
