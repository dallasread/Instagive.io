(function() {
  this.ig = {
    setPageDimensions: function() {
      if ($("#post").length) {
        ig.avatar_offset = $("#post .avatar").offset().top;
        return ig.topbar_height = $(".topbar").height();
      }
    },
    load: function() {
      return ig.setPageDimensions();
    }
  };

  $(function() {
    return $(window).scroll(function() {
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
    });
  });

  document.addEventListener("page:change", ig.load);

}).call(this);
