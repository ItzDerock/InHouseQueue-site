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


// command page 
function toggleCRC(thisChevron, thisID, thisHead) {
	if ($(thisChevron).hasClass("on")) {
		$(thisChevron).removeClass("on");
		$(thisChevron).css("transform", "rotate(0deg)");
	} else {

		$(thisChevron).addClass("on");
		$(thisChevron).css("transform", "rotate(180deg)");
	}
	$("#" + thisID).slideToggle(600, "swing", function () {
	});
}

/* open accordian */
$(".single-command-card-header").click(function () {

	var expandThisID = $(this).data("section");
	var thisHead = $('.single-command-card-header[data-section=' + expandThisID + ']');
	var chevron = $('i[data-section=' + expandThisID + ']');
	// close open chevrons
	$(".crc-chevron").each(function () {
		if ($(this).hasClass("on")) {
		}
	})
	// close open accordions

	$(".acc-body").each(function () {
		if ($(this).data("section") != expandThisID && $(this).is(":visible")) {
			$("#" + $(this).data("section")).slideToggle(600, "swing", function () {
			});
			$("i[data-section=" + $(this).data("section") + ']').removeClass("on");
			$("i[data-section=" + $(this).data("section") + ']').css("transform", "rotate(0deg)");
		}
	});

	toggleCRC(chevron, expandThisID, thisHead);
});

// command page end















