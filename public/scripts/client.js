/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // render the each tweet
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweet.insertAfter($('#tweets-container').children()[0]);
    }
  };

  // fetch the tweet data from tweets endpoint
  const fetchTweets = function() {
    $.ajax('tweets', {method: 'GET'})
      .then(function(tweetData) {
        renderTweets(tweetData);
      });
  };
  
  // create tweet
  const createTweetElement = function(tweet) {
    const {avatars, name, handle} = tweet.user;
    const {created_at, content} = tweet;

    let $tweet = $(`
      <article class="tweet">
        <header class="tweet-header">
          <img src="${avatars}" alt="face">
          <p>${name}</p>
          <span>${handle}</span>
        </header>
        <div class="tweet-content">
          <p>${content.text}</p>
        </div>
        <footer class="tweet-footer">
          <p>${timeago.format(created_at)}</p>
          <div class="tweet-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
      `);
  
    return $tweet;
  };

  // when new tweet submitted
  $('.container-form').submit(function(event) {
    event.preventDefault();

    const formValue = $(this).serialize();
    const textValue = formValue.split('=')[1];

    if (textValue && textValue.length <= 140) {
      $('#error-message').slideUp('slow');
      $('#tweet-text').val('');
      $.post('tweets', formValue, function() {
        ($.ajax('tweets', {method: 'GET'})
          .then((data) => {
            renderTweets(data.slice(-1));
          }));
      });
      // clear the form when tweet is sent successfully
    } else if (textValue.length > 140) {
      $('#error-message span').text('Too long. Plz respect our arbitrary limit of 140 characters!');
      $('#error-message').slideDown('slow');
    } else {
      $('#error-message span').text('Empty! Plz fill it with something!');
      $('#error-message').slideDown('slow');
    }
    $('#tweet-text').val('');
    $('.counter').css('color', '#545149');
  });

  fetchTweets();
});
