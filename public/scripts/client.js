/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  //const timePassed = timeago.format(tweet.created_at);  
  const $tweet = `<article class="tweet">
  <div class="tweet-header">
    <div class="tweet-header-left">
      <img src=${tweet.user.avatars}/>
      <span>${tweet.user.name}</span>
    </div>
    <div class="tweet-header-right" >
      <spanD>${tweet.user.handle}</span>
    </div>
    </div>
    <div class="tweet-text">
      <p>${escape(tweet.content.text)}</p>
    </div>
    <footer>
    <div class="tweet-footer-left">
      <p>TIME</p>
    </div>
      <div class="tweet-footer-right">
        <i id="flag" class="fa-solid fa-flag"></i>
        <i id="retweet" class="fa-solid fa-retweet"></i>            
        <i id="heart" class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`;

  return $tweet;
};


$(document).ready(function() {

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const aTweet = createTweetElement(tweet);
    $('.old-tweet').prepend(aTweet);
  }
};

const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  }).then(result => renderTweets(result));
};


$(".new-tweet-box").submit(function(event) {
  event.preventDefault();
  const tweetLength = $("#tweet-text").val().length;
  /**
   * Validation Process
   * If the length of tweet user tries to submit does not meet the validation
   * It shows error message.
   *  */  
  if (tweetLength > 140) {
    $(".alert")
      .empty()
      .append("<p>Your message is too long</p>");
    $(".alert").hide().slideDown('slow');
  } else if (tweetLength === 0) {
    $(".alert")
      .empty()
      .append("<p>You did not write anything</p>");
    $(".alert").hide().slideDown('slow');
  } else {
    /**
     * If user inputs a valid tweet,
     * load tweet and clean up the tweet window to recieve new tweets.
     */
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize()
    }).then(function() {
      $(".old-tweet").empty();
      $("#tweet-text").val("");
      $(".counter").val(140);
      $(".alert").empty();
      loadTweets();
    });
  }
  
});
loadTweets();

});