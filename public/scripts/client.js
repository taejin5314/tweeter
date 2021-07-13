/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
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
  }
  
  // create tweet
  const createTweetElement = function(tweet) {
    let $tweet = $(`
      <article class="tweet">
        <header class="tweet-header">
          <img src="${tweet.user.avatars}" alt="face">
          <p>${tweet.user.name}</p>
          <span>${tweet.user.handle}</span>
        </header>
        <div class="tweet-content">
          <p>${tweet.content.text}</p>
        </div>
        <footer class="tweet-footer">
          <p>${timeago.format(tweet.created_at)}</p>
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
      $.post('tweets', formValue)
      // clear the form when tweet is sent successfully
      $(this).closest('form').find("input[type=text], textarea").val("");
      $.ajax('tweets', {method: 'GET'})
        .then(function(tweetData) {
          console.log(tweetData.slice(-1))
          renderTweets(tweetData.slice(-1));
        })
    } else if (textValue.length > 140) {
      alert('Your tweet should not over 140!');
    } else {
      alert('Your tweet should not be empty!');
    }
  });

  fetchTweets();
});
