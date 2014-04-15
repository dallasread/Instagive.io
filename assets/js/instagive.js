(function() {
  this.ig = {
    setSidebarHeight: function() {
      var height;
      if ($(".sidebar").length) {
        height = $(".yield").height() + 60;
        return $(".sidebar").css("height", height);
      }
    },
    setPageDimensions: function() {
      ig.window_width = $(window).width();
      ig.mobile = ig.window_width < 600;
      ig.topbar_height = $(".topbar").height();
      if ($("#post").length) {
        ig.avatar_offset = $("#post .avatar").offset().top;
      }
      if ($("#pricing").length) {
        $("#pricing th, #pricing td").each(function() {
          return $(this).css("width", $(this).width());
        });
      }
      return $(window).scroll();
    },
    setAvatar: function(scrolled) {
      var content_top_border_height, padding;
      if ($("#post").length) {
        padding = 30;
        content_top_border_height = 15;
        if (ig.avatar_offset < scrolled + ig.topbar_height + content_top_border_height) {
          return $("#post .author").addClass("fixed").css({
            top: ig.topbar_height + content_top_border_height
          });
        } else {
          return $("#post .author").removeClass("fixed").css({
            top: "auto"
          });
        }
      }
    },
    setPricingHeader: function(scrolled) {
      var placeholder, pricing, thead_height;
      if ($("#pricing_placeholder").length) {
        pricing = $("#pricing");
        placeholder = pricing.offset().top;
        thead_height = 48;
        if (scrolled + ig.topbar_height > placeholder + pricing.height() - thead_height) {
          $("#pricing_placeholder").hide();
          return $("#pricing").removeClass("fixed_header");
        } else if (scrolled + ig.topbar_height < placeholder - thead_height) {
          $("#pricing_placeholder").hide();
          return $("#pricing").removeClass("fixed_header");
        } else if (scrolled + ig.topbar_height > placeholder) {
          $("#pricing_placeholder").show();
          return $("#pricing").addClass("fixed_header");
        }
      }
    },
    scroll: function() {
      var scrolled;
      if (ig.window_width > 600) {
        scrolled = $(window).scrollTop();
        ig.setAvatar(scrolled);
        return ig.setPricingHeader(scrolled);
      }
    },
    load: function() {
      ig.setPageDimensions();
      return ig.setPricingHeader(0);
    }
  };

  $(document).on({
    mouseenter: function() {
      var index;
      index = $(this).index() + 1;
      return $("#pricing").find("td:nth-child(" + index + "):not(.trait)").addClass("hover");
    },
    mouseleave: function() {
      return $("#pricing").find(".hover").removeClass("hover");
    }
  }, "#pricing th, #pricing td");

  $(function() {
    setTimeout(ig.setSidebarHeight, 700);
    $(window).scroll(ig.scroll);
    return $(window).resize(ig.setPageDimensions);
  });

  document.addEventListener("page:change", ig.load);

}).call(this);
