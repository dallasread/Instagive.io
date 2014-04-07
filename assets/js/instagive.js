(function() {
  this.ig = {
    setPageDimensions: function() {
      var height;
      ig.mobile = $(window).width() < 600;
      if ($("#post").length) {
        ig.avatar_offset = $("#post .avatar").offset().top;
        ig.topbar_height = $(".topbar").height();
      }
      if ($(".sidebar").length) {
        height = $(".yield").height() + 60;
        $(".sidebar").height(height);
      }
      return $(window).scroll();
    },
    setAvatar: function() {
      var padding, scrolled;
      if ($("#post").length) {
        scrolled = $(window).scrollTop();
        padding = 30;
        if (ig.avatar_offset < scrolled + ig.topbar_height + 30) {
          return $("#post .author").addClass("fixed").css({
            top: ig.topbar_height + 30
          });
        } else {
          return $("#post .author").removeClass("fixed").css({
            top: "auto"
          });
        }
      }
    },
    load: function() {
      return ig.setPageDimensions();
    }
  };

  $(function() {
    $(window).scroll(ig.setAvatar);
    return $(window).resize(ig.setPageDimensions);
  });

  document.addEventListener("page:change", ig.load);

}).call(this);
