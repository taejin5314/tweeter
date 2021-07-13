$(document).ready(function() {
  $('#tweet-text').on('change', function() {
    const $countSelector = $($(this).parent().children()[2]).children()[1];
    $($countSelector).text(140);
  })
  $('#tweet-text').on('input', function() {
    const maxLength = 140;
    const textLength = $(this).val().length;
    const count = maxLength - textLength;
    const $countSelector = $($(this).parent().children()[2]).children()[1];
    
    if (count < 0) {
      $($countSelector).css('color', '#FF0000');
    } else {
      $($countSelector).css('color', '#000000');
    }
    $($countSelector).text(count);
  });
});