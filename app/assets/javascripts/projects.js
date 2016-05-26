$(document).ready(function(){


  $(".edit-task").click(function(){
    var taskId = $(this).data().id;
    var projectId = window.location.pathname.split('/').pop();

    $.ajax({
      url: '/projects/' + projectId + '/tasks/' + taskId + '/edit',
      method: 'GET',
      dataType: 'HTML'
    })
    .done(function(data, textStatus){
      editTask(data);

      $('#submit input').click(function(){
        submitEdit();
      })
    })
    .fail(function(error, textStatus){
      console.log(error);
    })
  });


  $('.new-task-button').click(function(){

    var projectId = window.location.pathname.split('/').pop();

    $.ajax({
      url: '/projects/' + projectId + '/tasks/new',
      method: 'GET',
      dataType: 'HTML'
    })
    .done(function(data, textStatus){
      newTask(data);

      $('#submit input').click(function(){
        console.log('submit button');
        populateNew();
        submitNew();
      })
    })
    .fail(function(error, textStatus){
      console.log(error);
    })
  })

});



function editTask(data){
  $('#edit-form').html(data);
  $('.project-and-tasks').hide();
  $('#edit-form').show();
}

function newTask(data){
  $('#new-task').html(data);
  $('.project-and-tasks').hide();
  $('#new-task').show();
}

function submitEdit(){
  $("#edit-form").hide();
  $('.project-and-tasks').show();
}

function submitNew(){
  $('#new-task').hide();
  $('.project-and-tasks').show();
}

function populateNew(){
  var newName = $('#task_name').val();
  $('.available-tasks-list').prepend(
    "<ul><li>" + newName + '</li><div class="button-row"><button class="claim" data-id="12">Claim Task</button><br><button class="edit-task" data-id="12">Edit Task</button></div>'
    );
}
