$(document).ready(function(){
  console.log('doc ready');


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

      $('#submit input').click(function(){
        console.log("submit button");
        submitEdit();
      })
    })
    .fail(function(error, textStatus){
      console.log(error);
    })
  });

});


function submitEdit(){
  $("#edit-form").hide();
  $('.project-and-tasks').show();
}
