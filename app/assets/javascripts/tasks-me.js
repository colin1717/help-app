var myTasksReady = function() {
  $('.complete').click(function(){
   var taskId = $(this).data().id
   var projectId = $(this).data().projectid
   console.log(projectId)
   $.ajax({
     url: '/projects/' + projectId + '/tasks/' + taskId + '/complete',
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

   $('#'+ taskId).toggleClass('strike');
  })
};


$(document).on('page:load ready', myTasksReady);
