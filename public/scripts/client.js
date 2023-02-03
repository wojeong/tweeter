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

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const createTweetElement = function(tweet) {
  //const timePassed = timeago.format(tweet.created_at);  
  const $tweet = `<article class="tweet">
  <header>
    <div class="tweet-header-left">
      <img src=${tweet.user.avatars}/>
      <span>${tweet.user.name}</span>
    </div>
    <div class="tweet-header-right" >
      <spanD>${tweet.user.handle}</span>
    </div>
    </header>
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
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
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
    
  if (tweetLength > 140) {
    $(".alert")
      .empty()
      .append("<p>Your message is too long</p>")
  } else if (tweetLength === 0) {
    return alert("You didn't write anything");
  }

  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: $(this).serialize()
  }).then(function() {
    $(".old-tweet").empty();
    $("#tweet-text").val("");
    loadTweets();
  });
});

});