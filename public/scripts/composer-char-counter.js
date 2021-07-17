$(document).ready(function() {
  // reset counter when tweet button is clicked
  $('.container-tweetBtn button').on('click', function() {
    $($($(this).parent()).children()[1]).val(140);
  });
  
  // count the character every time user types
  $('#tweet-text').on('input', function() {
    const maxLength = 140;
    const textLength = $(this).val().length;
    const count = maxLength - textLength;
    const $countSelector = $($(this).parent().children()[2]).children()[1];
    
    if (count < 0) {
      $($countSelector).css('color', '#FF0000');
    } else {
      $($countSelector).css('color', '#545149');
    }
    $($countSelector).text(count);
  });
});