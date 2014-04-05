---
---

@ig =
	setPageDimensions: ->
		if $("#post").length
			ig.avatar_offset = $("#post .avatar").offset().top
			ig.topbar_height = $(".topbar").height()

	load: ->
		ig.setPageDimensions()

$ ->
	$(window).scroll ->
		if $("#post").length
			scrolled = $(window).scrollTop()
			padding = 30
		
			if ig.avatar_offset < scrolled + ig.topbar_height + 30
				$("#post .author").addClass("fixed").css
					top: ig.topbar_height + 30
			else
				$("#post .author").removeClass("fixed").css
					top: "auto"

document.addEventListener "page:change", ig.load