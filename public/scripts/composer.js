$(document).ready(function() {
  // composer toggle button
  $('.nav-right button').on('click', function(event) {
    $('.container-newTweet').slideToggle('slow', function() {
      $('.container-newTweet > form > textarea').toggleClass('active');
      $('.container-newTweet > form > textarea.active').focus();
    });
  })

  // click back to the top button
  $('#back-top').on('click', function(event) {
    console.log(this);
    $('html, body').animate({scrollTop: 0}, 400);
    return false;
  });

  // scroll down -> showing back to the top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#back-top').fadeIn();
    } else {
      $('#back-top').fadeOut();
    }
  });
})