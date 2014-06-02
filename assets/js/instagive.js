(function() {
  this.ig = {
    fitLogos: function() {
      if ($(".logo_wrapper").length) {
        return $(".logo_wrapper").each(function() {
          var img, img_height, margin_top, wrapper_height;
          wrapper_height = $(this).height();
          img = $(this).find("img");
          img_height = img.height();
          margin_top = (wrapper_height - img_height) / 2;
          return img.css("margin-top", "" + (margin_top - 5) + "px");
        });
      }
    },
    retrieveOrgs: function() {
      var no_bgs;
      if ($("[data-url]").length) {
        no_bgs = ["faith", "poq"];
        return $("[data-url]").each(function() {
          var list, template, url;
          list = $(this);
          url = list.data("url");
          template = list.find(".template").html();
          return $.get(url, function(orgs) {
            $.each(orgs, function(index, org) {
              var li;
              if (index < 3) {
                if ($.inArray(org.permalink, no_bgs) > -1) {
                  org.header = false;
                }
                org.public_description = linkify("" + org.public_description);
                if (org.public_description === "null") {
                  org.public_description = "";
                }
                li = Mustache.render(template, org);
                return list.append(li);
              }
            });
            ig.fitLogos();
            return setTimeout(ig.fitLogos, 1000);
          });
        });
      }
    },
    setSidebarHeight: function() {
      var height;
      if ($(".sidebar").length) {
        height = $(".yield").height() + 60;
        return $(".sidebar").css("height", height);
      }
    },
    setPageDimensions: function(delay) {
      if (delay == null) {
        delay = 700;
      }
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
      ig.scroll();
      return setTimeout(ig.setSidebarHeight, delay);
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
      ig.setPageDimensions(500);
      ig.setPricingHeader(0);
      return ig.retrieveOrgs();
    }
  };

  $(document).on("click", ".show_intro_video", function() {
    $("iframe").attr("src", "//www.youtube.com/embed/i6kkuq5_RtM?theme=light&showinfo=0&autoplay=1");
    $("#intro_video").show();
    return false;
  });

  $(document).on("click", "#intro_video", function() {
    $(this).hide();
    $("iframe").attr("src", "");
    return false;
  });

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
    $(window).scroll(ig.scroll);
    $(window).resize(function() {
      ig.setPageDimensions(0);
      return ig.fitLogos();
    });
    return ig.setPageDimensions(700);
  });

  document.addEventListener("page:change", ig.load);

}).call(this);
