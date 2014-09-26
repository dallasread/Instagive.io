---
---

@ig =
	fitLogos: ->
		if $(".logo_wrapper").length
			$(".logo_wrapper").each ->
				wrapper_height = $(this).height()
				img = $(this).find("img")
				img_height = img.height()
				margin_top = (wrapper_height - img_height) / 2
				img.css "margin-top", "#{margin_top - 5}px"
		
	retrieveOrgs: ->
		if $(".three_steps").length
			no_bgs = ["faith", "poq"]
			
			$(".three_steps").each ->
				list = $(this)
				url = list.data("url")
				template = list.find(".template").html()
				orgs = [{"name":"Faith Sanctuary Pentecostal Church","permalink":"faith","public_description":"Faith Sanctuary needed a system to accept one-time and recurring donations from their congregation. Being able to automatically generate tax receipts was a huge benefit in making the switch to Instagive.","logo":"https://s3.amazonaws.com/instagive.io/organizations/logos/000/000/021/original/logo-small.jpg?1398815725","header":"https://s3.amazonaws.com/instagive.io/organizations/headers/000/000/021/original/faithbg2.jpg?1398865737"},{"name":"Emmanuel Lighthouse UPC","permalink":"elupc","public_description":"Our mission by its very nature must be the mission of Christ:  to reach out to the lost, teaching them how to be converted and then how to serve God in a way that pleases Him. Read more at http://emmanuellighthouse.org.","logo":"https://s3.amazonaws.com/instagive.io/organizations/logos/000/000/022/original/logo2.png?1397601078","header":"https://s3.amazonaws.com/instagive.io/organizations/headers/000/000/022/original/bg.jpg?1397770979"},{"name":"The Pentecostals of Quinte","permalink":"poq","public_description":"We are a gospel-driven, multicultural congregation committed to demonstrating Christ’s love. Read more at http://ilovechurch.ca.","logo":"https://s3.amazonaws.com/instagive.io/organizations/logos/000/000/024/original/logo.png?1397770735","header":"https://s3.amazonaws.com/instagive.io/organizations/headers/000/000/024/original/worship.jpg?1397656258"},{"name":"Example Charity","permalink":"example","public_description":null,"logo":"https://s3.amazonaws.com/instagive.io/organizations/logos/000/000/019/original/testorglogo.png?1396883508","header":"https://s3.amazonaws.com/instagive.io/organizations/headers/000/000/019/original/bluebg.jpg?1396883435"},{"name":"Full Health Children's Charity","permalink":"fullhealth","public_description":"Full Health wanted to grow their giving avenues. By being able to accept mobile and online donations, they were able to expand their organization's reach and spread their giving page through social media.","logo":"https://s3.amazonaws.com/instagive.io/organizations/logos/000/000/026/original/logo.png?1399635770","header":"https://s3.amazonaws.com/instagive.io/organizations/headers/000/000/026/original/bg.jpg?1399637323"}]
				
				$.each orgs, (index, org) ->
					if index < 3
						org.header = false if $.inArray(org.permalink, no_bgs) > -1
						org.public_description = linkify "#{org.public_description}"
						org.public_description = "" if org.public_description == "null"
						li = Mustache.render template, org
						list.append li
				
				ig.fitLogos()
				setTimeout ig.fitLogos, 200

	setSidebarHeight: ->
		if $(".sidebar").length
			height = $(".yield").height() + 60
			$(".sidebar").css "height", height
			
	setPageDimensions: (delay = 700) ->
		ig.window_width = $(window).width()
		ig.mobile = ig.window_width < 600
		ig.topbar_height = $(".topbar").height()

		if $("#post").length
			ig.avatar_offset = $("#post .avatar").offset().top
		
		if $("#pricing").length
			$("#pricing th, #pricing td").each ->
				$(this).css "width", $(this).width()

		ig.scroll()
		setTimeout ig.setSidebarHeight, delay
	
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
		ig.setPageDimensions 500
		ig.setPricingHeader 0
		ig.retrieveOrgs()

$(document).on "click", ".show_intro_video", ->
	$("iframe").attr "src", "//www.youtube.com/embed/i6kkuq5_RtM?theme=light&showinfo=0&autoplay=1"
	$("#intro_video").show()
	false

$(document).on "click", "#intro_video", ->
	$(this).hide()
	$("iframe").attr "src", ""
	false

$(document).on
	mouseenter: ->
		index = $(this).index() + 1
		$("#pricing").find("td:nth-child(#{index}):not(.trait)").addClass("hover")
	mouseleave: ->
		$("#pricing").find(".hover").removeClass("hover")
, "#pricing th, #pricing td"

$ ->
	$(window).scroll ig.scroll
	
	$(window).resize ->
		ig.setPageDimensions(0)
		ig.fitLogos()

	ig.setPageDimensions 700

document.addEventListener "page:change", ig.load