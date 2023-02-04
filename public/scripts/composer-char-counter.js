$(document).ready(function() {
  
  /**
   * Function that counts the user input from tweet-text
   * renders the length of total character.
   * It changes to red if it goes over maximum legnth, 140
   */
  $("#tweet-text").on('input', function() {
    const maxLength = 140;
    let countChar = $(this).val().length;
    
    /**
     * Using .counter isn't the best way.  
     * I found that $(this).parent().parent() leads to parent div
     * I was not able to figure out how to find .counter after that.
    **/
    
    $(".counter").html(maxLength - countChar);
    
    if (maxLength - countChar < 0) {
      $(".counter").css("color", "#FF0000");
    } else {
      $(".counter").css("color", "#000000");
    }
  })

});