$(document).ready(function () {
  var $header = $('.header');
  var stickyActive = false;

  $(window).on('scroll', function () {
    var scrollPosition = $(window).scrollTop();

    if (scrollPosition > 0 && !stickyActive) {
      $header.addClass('sticky-header');
      stickyActive = true;
    } else if (scrollPosition === 0 && stickyActive) {
      $header.removeClass('sticky-header');
      stickyActive = false;
    }
  });
});

$(document).ready(function () {
  let $burgerToggle = $('.burger-toggle');
  let $navPanel = $('.nav-panel');
  let $navLinks = $('.nav-link');

  function closeNavPanel() {
    $burgerToggle.removeClass('is-active');
    $navPanel.removeClass('is-open');
  }

  $burgerToggle.on('click', function () {
    $(this).toggleClass('is-active');
    $navPanel.toggleClass('is-open');
  });

  $navLinks.on('click', closeNavPanel);
});
