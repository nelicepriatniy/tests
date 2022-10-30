document.addEventListener('DOMContentLoaded', () => {
	//	Masked input
	 [].forEach.call(document.querySelectorAll('input[type="tel"]'), function (input) {
		var keyCode;

		function mask(event) {
			event.keyCode && (keyCode = event.keyCode);
			var pos = this.selectionStart;
			if (pos < 3) event.preventDefault();
			var matrix = "+7 (___) ___ ____",
				i = 0,
				def = matrix.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, ""),
				new_value = matrix.replace(/[_\d]/g, function (a) {
					return i < val.length ? val.charAt(i++) || def.charAt(i) : a
				});
			i = new_value.indexOf("_");
			if (i != -1) {
				i < 5 && (i = 3);
				new_value = new_value.slice(0, i)
			}
			var reg = matrix.substr(0, this.value.length).replace(/_+/g,
				function (a) {
					return "\\d{1," + a.length + "}"
				}).replace(/[+()]/g, "\\$&");
			reg = new RegExp("^" + reg + "$");
			if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
			if (event.type == "blur" && this.value.length < 5) this.value = ""
		}

		input.addEventListener("input", mask, false);
		input.addEventListener("focus", mask, false);
		input.addEventListener("blur", mask, false);
		input.addEventListener("keydown", mask, false)

	});

	//	Subscribe
	let subscribeModal = document.getElementById('subscribeModal');
	if (subscribeModal) {
		function setCookie(name, value, days) {
			let expires = "";
			if (days) {
				let date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toUTCString();
			}
			document.cookie = name + "=" + (value || "") + expires + "; path=/";
		}

		function getCookie(name) {
			let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
			return matches ? decodeURIComponent(matches[1]) : undefined;
		}

		function checkCookies() {
			let subscribeModal = document.getElementById('subscribeModal');
			let subscribeClose = document.getElementById('subscribeClose');
			let subscribeForm = document.getElementById('subscribeForm');
			let subscribeSuccess = document.getElementById('subscribeSuccess');

			if (!getCookie('cookies_policy')) {
				setTimeout(function () {
					subscribeModal.classList.add('show');
				}, 5000)
			}

			subscribeClose.addEventListener('click', function () {
				setCookie('cookies_policy', 'true', 365);
				subscribeModal.classList.remove('show');
			});

			subscribeForm.addEventListener("submit", function (e) {
				subscribeForm.hidden = true,
					subscribeSuccess.hidden = false
			});
		}

		checkCookies();
	}

	/*LazyLoad*/
	window.onload = () => {
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.src = entry.target.dataset.src
					observer.unobserve(entry.target)
				}
			})
		}, {
			threshold: 0.5
		})
		document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img))
	}

	/*Hamburger*/
	const hamburgerIcon = document.getElementById('hamburger'),
		menuIcon = document.getElementById('menu-icon'),
		mobileMenu = document.getElementById('mobile-menu'),
		menuBg = document.querySelector('html');

	window.addEventListener("scroll", function () {
		menuBg.pageYOffset < 50 && menuBg.classList.remove("scroll"), 50 <= pageYOffset && menuBg.classList.add("scroll")
	});

	if (menuIcon) {
		menuIcon.addEventListener('click', function () {
			hamburgerIcon.classList.toggle('open');
			mobileMenu.classList.toggle('active');
			menuBg.classList.toggle('locked');
		});
	}


	/*Smooth scroll to anchor*/
	const smoothLinks = document.querySelectorAll('a[href^="#"]');
	for (let smoothLink of smoothLinks) {
		smoothLink.addEventListener('click', function (e) {
			e.preventDefault();
			const id = smoothLink.getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	};

	const teamLinks = document.querySelectorAll('a[href^="#"].team-icon');
	for (let teamLink of teamLinks) {
		teamLink.hidden = true
	};


	/*Modals*/
	const modalFunc = (modal, btns) => {
		let overlay = modal.getElementsByClassName('overlay'),
			btnClose = modal.getElementsByClassName('close-btn');

		btns.forEach(btn => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				modal.classList.add('active');
			});
		});
		const closeModal = () => {
			modal.classList.remove('active');
		}
		btnClose[0].addEventListener('click', closeModal);

		overlay[0].addEventListener("click", function (e) {
			if (e.target === overlay[0]) {
				closeModal();
			} else {
				return false;
			}
		});
	}

	let modalDesktop = document.getElementById('thanks');
	let linksOpenModal = document.querySelectorAll('.call-link');

	if (modalDesktop) {
		modalFunc(modalDesktop, linksOpenModal);
	}

	const swiperOffer = new Swiper(".offer-slider", {
		slidesPerView: 1,
		loop: true,
		speed: 1500,
		watchSlidesProgress: true,
		autoplay: {
			delay: 4000
		},
		navigation: {
			nextEl: ".arrows-wrap_offer .arrow-next",
			prevEl: ".arrows-wrap_offer .arrow-prev",
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
	});

	const swiperFavorites = new Swiper(".favorites-slider", {
		loop: true,
		speed: 1000,
		slidesPerView: 2,
		grabCursor: true,
		spaceBetween: 10,
		watchSlidesProgress: true,
		navigation: {
			nextEl: ".arrows-wrap_favorites .arrow-next",
			prevEl: ".arrows-wrap_favorites .arrow-prev",
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			993: {
				spaceBetween: 50,
				slidesPerView: 'auto',
			},
		},
	});

	const cardGallery = document.getElementById('card-gallery');
	const swiperCard = new Swiper(".card-slider", {
		slidesPerView: 1,
		loop: true,
		speed: 700,
		watchSlidesProgress: true,
		navigation: {
			nextEl: ".arrows-wrap_card .arrow-next",
			prevEl: ".arrows-wrap_card .arrow-prev",
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		},
	});

	lightGallery(cardGallery);

	const swiperSimilar = new Swiper(".similar-slider", {
		loop: true,
		speed: 1000,
		slidesPerView: 2,
		grabCursor: true,
		spaceBetween: 10,
		watchSlidesProgress: true,
		navigation: {
			nextEl: ".arrows-wrap_similar .arrow-next",
			prevEl: ".arrows-wrap_similar .arrow-prev",
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			993: {
				slidesPerView: 4,
				spaceBetween: 50,
			},
			1200: {
				slidesPerView: 5,
				spaceBetween: 50,
			},
		},
	});

	//	Animation
	AOS.init();

	//	SlideDown
	const slideDown = element => element.style.height = `${element.scrollHeight}px`;
	const slideUp = element => element.style.height = `0px`;

	//	Lookbook
	const lookbookButtons = document.querySelectorAll(".lookbook-item");
	lookbookButtons.forEach(lookbookButton => lookbookButton.addEventListener("mouseover", function () {
		const lookbookContent = lookbookButton.querySelector(".lookbook-previews");
		slideDown(lookbookContent);
	}));

	lookbookButtons.forEach(lookbookButton => lookbookButton.addEventListener("mouseout", function () {
		const lookbookContent = lookbookButton.querySelector(".lookbook-previews");
		slideUp(lookbookContent);
	}));

	//	Filter
	const filterButton = document.getElementById('gallery-filter');
	const filterContent = document.getElementById('gallery-content');
	if (filterButton) {
		filterButton.addEventListener("click", function () {
			filterButton.classList.toggle('active');
			filterContent.classList.toggle('active');
			if (filterButton.classList.contains('active')) {
				slideDown(filterContent);
			} else {
				slideUp(filterContent);
			}
		});

		//Filter-links.checked
		const filterLinks = document.querySelectorAll('.filter-list li');
		for (let filterLink of filterLinks) {
			filterLink.addEventListener('click', function (e) {
				filterLink.classList.toggle('checked');
			});
		};
	}

	//	Card-desc
	const cardDescItems = document.querySelectorAll(".card-desc-item");
	cardDescItems.forEach(cardDescItem => cardDescItem.addEventListener("click", function () {
		const cardDescContent = cardDescItem.querySelector(".card-text");
		cardDescItem.classList.toggle('active');
		cardDescContent.classList.toggle('active');
		if (cardDescItem.classList.contains('active')) {
			slideDown(cardDescContent);
		} else {
			slideUp(cardDescContent);
		}
	}));

	//cardSizes.checked
	const cardSizes = document.querySelectorAll('.card-size');
	for (let cardSize of cardSizes) {
		cardSize.addEventListener('click', function (e) {
			cardSize.classList.toggle('checked');
		});
	};

	const couponButton = document.getElementById('coupon-button');
	const couponForm = document.getElementById('coupon-form');
	const couponSuccess = document.getElementById('coupon-success');
	if (couponButton) {
		couponButton.addEventListener("click", function () {
			couponForm.hidden = true,
				couponSuccess.hidden = false
		})
	};


	//	Increase-decrease	
	var value,
		quantity = document.getElementsByClassName('card-check');

	function createBindings(quantityContainer) {
		var quantityAmount = quantityContainer.getElementsByClassName('card-number')[0];
		var increase = quantityContainer.getElementsByClassName('card-tip_increase')[0];
		var decrease = quantityContainer.getElementsByClassName('card-tip_decrease')[0];
		increase.addEventListener('click', function () {
			increaseValue(quantityAmount);
		});
		decrease.addEventListener('click', function () {
			decreaseValue(quantityAmount);
		});
	}

	function init() {
		for (var i = 0; i < quantity.length; i++) {
			createBindings(quantity[i]);
		}
	};

	function increaseValue(quantityAmount) {
		value = parseInt(quantityAmount.value, 10);

		console.log(quantityAmount, quantityAmount.value);

		value = isNaN(value) ? 0 : value;
		value++;
		quantityAmount.value = value;
	}

	function decreaseValue(quantityAmount) {
		value = parseInt(quantityAmount.value, 10);

		value = isNaN(value) ? 0 : value;
		if (value > 0) value--;

		quantityAmount.value = value;
	}

	init();
});
