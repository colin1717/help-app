

var ready = function(){
  $(document).on('ajax:success', function(e, data, status, xhr){
    populateNew(data)
    taskEventSet()
    });
  taskEventSet()


};


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

function populateNew(data){
  $('.available-tasks-list').prepend(
    "<ul><li>" + data.name + '</li><div class="button-row"><button class="claim" data-id="' + data.id + '">Claim Task</button><br><button class="edit-task" data-id="'+ data.id + '">Edit Task</button></div>'

    );
    taskEventSet();
}

function taskEventSet(){
  newEventSet()
  claimEventSet()
  editEventSet()
}

function claimEventSet(){
  $('.claim').click(function(){
   var taskId = $(this).data().id
    var thisDiv = $(this).parent().parent();
   var projectId = window.location.pathname.split('/').pop()
   $.ajax({
     url: '/projects/' + projectId + '/tasks/' + taskId + '/claim',
     type: 'PUT',
     dataType: 'json',
   })
   .done(function() {

     thisDiv.hide();
     $('.claimed-tasks-list').prepend(thisDiv);
     thisDiv.show();
   })
   .fail(function(err, message) {
     console.log(err);
     console.log(message);
   })
   .always(function() {
     console.log("complete");
   });

  });
 }


function newEventSet(){
  $('.new-task-button').click(function(){

    var projectId = window.location.pathname.split('/').pop();
    $(document).on('ajax:success', function(e, data, status, xhr){
      console.log(data)
      });
    $.ajax({
      url: '/projects/' + projectId + '/tasks/new',
      method: 'GET',
      dataType: 'HTML'
    })
    .done(function(data, textStatus){
      newTask(data);

      $('#submit input').click(function(){
        submitNew();
      })
    })
    .fail(function(error, textStatus){
      console.log(error);
    })
  })
}

function editEventSet(){
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
}

$(document).on('page:load ready', ready);
