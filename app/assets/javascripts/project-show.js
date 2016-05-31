var projectReady = function() {
  $('.claim').click(function(){
   var taskId = $(this).data().id
   var projectId = window.location.pathname.split('/').pop()
   $.ajax({
     url: '/projects/' + projectId + '/tasks/' + taskId + '/claim',
     type: 'PUT',
     dataType: 'json',
   })
   .done(function() {
     console.log("success");
   })
   .fail(function(err, message) {
     console.log(err);
     console.log(message);
   })
   .always(function() {
     console.log("complete");
   });

  })
};

$(document).on('page:load ready', projectReady);
