(function () {
	window.onload = function () {
		window.setTimeout(fadeout, 50);
	};
	function fadeout() {
		document.querySelector(".page-loader").style.opacity = "0";
		document.querySelector(".page-loader").style.display = "none";
	}
	window.onscroll = function () {
		var header_navbar = document.querySelector(".navbar-area");
		var sticky = header_navbar.offsetTop;
		if (window.pageYOffset > sticky) {
			header_navbar.classList.add("sticky");
		} else {
			header_navbar.classList.remove("sticky");
		}
		var backToTo = document.querySelector(".scroll-top");
		if (
			document.body.scrollTop > 50 ||
			document.documentElement.scrollTop > 50
		) {
			backToTo.style.display = "flex";
		} else {
			backToTo.style.display = "none";
		}
	};




    //===== mobile-menu-btn
	let navbarToggler = document.querySelector(".navbar-toggler");
	navbarToggler.addEventListener("click", function () {
		navbarToggler.classList.toggle("active");
	});

   // WOW active
	new WOW().init();





})();
