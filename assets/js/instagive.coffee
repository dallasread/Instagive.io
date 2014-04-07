---
---

@ig =
	setPageDimensions: ->
		ig.mobile = $(window).width() < 600

		if $("#post").length
			ig.avatar_offset = $("#post .avatar").offset().top
			ig.topbar_height = $(".topbar").height()
		
		if $(".sidebar").length
			height = $(".yield").height() + 60
			$(".sidebar").height height
		
		$(window).scroll()
	
	setAvatar: ->
		if $("#post").length
			scrolled = $(window).scrollTop()
			padding = 30
		
			if ig.avatar_offset < scrolled + ig.topbar_height + 30
				$("#post .author").addClass("fixed").css
					top: ig.topbar_height + 30
			else
				$("#post .author").removeClass("fixed").css
					top: "auto"

	load: ->
		ig.setPageDimensions()

$ ->
	$(window).scroll ig.setAvatar
	$(window).resize ig.setPageDimensions
		

document.addEventListener "page:change", ig.load