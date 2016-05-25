$(document).ready(function(){


$(".edit-task").click(function(){
    var taskId = $(this).data().id;
    console.log(taskId);
    var projectId = window.location.pathname.split('/').pop();
    console.log(projectId);

    $.ajax({
      url: '/projects/' + projectId + '/tasks/' + taskId + '/edit',
      method: 'GET',
      dataType: 'HTML'
    })
    .done(function(data, textStatus){
      console.log(data);
      $('#edit-form').html(data);
      $('.project-and-tasks').hide();
      $('#edit-form').show();
    })
    .fail(function(error, textStatus){
      console.log(error);
    })

  });

});
