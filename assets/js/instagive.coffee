---
---

@ig =
	setPageDimensions: ->
		ig.window_width = $(window).width()
		ig.mobile = ig.window_width < 600
		ig.topbar_height = $(".topbar").height()

		if $("#post").length
			ig.avatar_offset = $("#post .avatar").offset().top
		
		if $(".sidebar").length
			height = $(".yield").height() + 60
			$(".sidebar").css "height", height
			
		if $("#pricing").length
			$("#pricing th, #pricing td").each ->
				$(this).css "width", $(this).width()
		
		$(window).scroll()
	
	setAvatar: (scrolled) ->
		if $("#post").length
			padding = 30
			content_top_border_height = 15
		
			if ig.avatar_offset < scrolled + ig.topbar_height + content_top_border_height
				$("#post .author").addClass("fixed").css
					top: ig.topbar_height + content_top_border_height
			else
				$("#post .author").removeClass("fixed").css
					top: "auto"
	
	setPricingHeader: (scrolled) ->
		if $("#pricing_placeholder").length
			pricing = $("#pricing")
			placeholder = pricing.offset().top
			thead_height = 48

			if scrolled + ig.topbar_height > placeholder + pricing.height() - thead_height
				$("#pricing_placeholder").hide()
				$("#pricing").removeClass "fixed_header"
			else if scrolled + ig.topbar_height < placeholder - thead_height
				$("#pricing_placeholder").hide()
				$("#pricing").removeClass "fixed_header"
			else if scrolled + ig.topbar_height > placeholder
				$("#pricing_placeholder").show()
				$("#pricing").addClass "fixed_header"
	
	scroll: ->
		if ig.window_width > 600
			scrolled = $(window).scrollTop()
			ig.setAvatar scrolled
			ig.setPricingHeader scrolled

	load: ->
		ig.setPageDimensions()
		ig.setPricingHeader 0

$(document).on
	mouseenter: ->
		index = $(this).index() + 1
		$("#pricing").find("td:nth-child(#{index}):not(.trait)").addClass("hover")
	mouseleave: ->
		$("#pricing").find(".hover").removeClass("hover")
, "#pricing th, #pricing td"

$ ->
	setTimeout ig.setPageDimensions, 700
	$(window).scroll ig.scroll
	$(window).resize ig.setPageDimensions
		

document.addEventListener "page:change", ig.load