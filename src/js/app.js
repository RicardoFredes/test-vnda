// Navigation
let stateScroll = 0
const navigation = document.querySelector('nav.Navigation');
window.addEventListener('scroll', function() {
	const wy = window.scrollY;
	if (wy < 10) {
		navigation.classList.add('ScrollOnTop');
	} else {
		navigation.classList.remove('ScrollOnTop');
	}
	if (wy < stateScroll) {
		navigation.classList.remove('ScrollDown');
		navigation.classList.add('ScrollUp');
	} else {
		navigation.classList.add('ScrollDown');
		navigation.classList.remove('ScrollUp');
	}
	stateScroll = wy;
});

function toggleClass(element, className) {
	if (element.classList.contains(className)) {
		element.classList.remove(className);
	} else {
		element.classList.add(className);
	}
}

// Navigation SubMenu
let stateSubMenu = {
	active: false,
	id: '',
	element: null,
};
const navigationLightBox = document.querySelector('.NavigationLightBox');
function callSubmenu(id, element) {
	const target = document.querySelector(id);
	if (!stateSubMenu.active) {
		stateSubMenu.active = true;
		stateSubMenu.id = id;
		element.classList.add('Active');
		target.classList.add('Active');
		navigationLightBox.classList.add('Active');
	 	navigation.classList.add('Opened');
	} else if (stateSubMenu.id === id) {
		element.classList.remove('Active');
		target.classList.remove('Active');
	 	navigation.classList.remove('Opened');
	 	document.querySelector(stateSubMenu.id).classList.remove('Active');
		stateSubMenu.active = false;
		navigationLightBox.classList.remove('Active');
	} else {
		document.querySelector(stateSubMenu.id).classList.remove('Active');
		navigation.classList.add('Reopen');
		element.classList.add('Active');
		stateSubMenu.element.classList.remove('Active');
		setTimeout(function() {
			navigation.classList.remove('Reopen');
			target.classList.add('Active');
		}, 500);
		stateSubMenu.id = id;
	}
	stateSubMenu.element = element;
}

function disableMenuSubLayer() {
	document.querySelector(stateSubMenu.id).classList.remove('Active');
	navigationLightBox.classList.remove('Active');
	stateSubMenu.element.classList.remove('Active');
	navigation.classList.remove('Opened');
	stateSubMenu.active = false;
}

// ScrollTo
function scrollToElement(target, offset = 0) {
	const element = document.querySelector(target);
	window.scroll({
		top: element.offsetTop + offset, 
		left: 0, 
		behavior: 'smooth' 
	});
}

// LazyLoading
(function lazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  window.addEventListener("load", observerImages);
  function observerImages() {
    images.forEach(function(image){
      image.classList.add('LazyLoading', 'Loading');
      image.setAttribute('src', image.getAttribute('data-src'));
      image.setAttribute('data-status', 'loading');
      image.onload = function() {
        image.setAttribute('data-status', 'loaded');
      };
      const observer = new IntersectionObserver(handleIntersect);
      observer.observe(image);
    });
  }
  function handleIntersect(image) {
    if (!image[0].isIntersecting) { return; }
    const element = image[0].target;
    if (element.getAttribute('data-status') !== 'loaded') { return; }
    element.classList.remove('Loading');
  }
})();

// JQuery becouse use plugin mmenu
$(document).ready(function(){
	var menu = $('.MenuMobile');
	var button = $('.MenuHamburger');
	var page = $('.PageContent');

	menu.mmenu({}, {pageSelector: ".PageContent"});
	var api = menu.data('mmenu');

	api.bind( "open:start", function() {
	setTimeout(function() {
			button.addClass( "Opened" );
		}, 100);
	});

	api.bind( "close:start", function() {
	setTimeout(function() {
			button.removeClass( "Opened" );
		}, 100);
	});

	button.click(function(){
		if (menu.hasClass('mm-menu_opened')) {
			return api.close();
		}
		api.open();
	});
});
