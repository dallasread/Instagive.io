(function() {
  this.ig = {
    setPageDimensions: function() {
      var height;
      ig.mobile = $(window).width() < 600;
      ig.topbar_height = $(".topbar").height();
      if ($("#post").length) {
        ig.avatar_offset = $("#post .avatar").offset().top;
      }
      if ($(".sidebar").length) {
        height = $(".yield").height() + 60;
        $(".sidebar").height(height);
      }
      if ($("#pricing").length) {
        $("#pricing th").each(function() {
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
      var placeholder;
      if ($("#pricing_placeholder").length) {
        placeholder = $("#pricing").offset().top;
        if (scrolled + ig.topbar_height < placeholder - 48) {
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
      scrolled = $(window).scrollTop();
      ig.setAvatar(scrolled);
      return ig.setPricingHeader(scrolled);
    },
    load: function() {
      return ig.setPageDimensions();
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
    setTimeout(ig.setPageDimensions, 1500);
    $(window).scroll(ig.scroll);
    return $(window).resize(ig.setPageDimensions);
  });

  document.addEventListener("page:change", ig.load);

}).call(this);
