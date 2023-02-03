$(document).ready(function() {
  
  $("#tweet-text").on('input', function() {
    
    let countChar = $(this).val().length;
    
    //Maybe not the most ideal way  
    //console.log($(this).parent().parent());
    
    $(".counter").html(140 - countChar);
    
  })

});