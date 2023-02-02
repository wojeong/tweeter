$(document).ready(function() {
  
  $("#tweet-text").on('input', function() {
    
    let countChar = $(this).val().length;
      
    console.log($(this).parent().parent());//Maybe not the most ideal way
    
    $(".counter").html(140 - countChar);
  
  })

});