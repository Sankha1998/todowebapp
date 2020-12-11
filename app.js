$(document).ready(function(){


  var firebaseConfig = {
    apiKey: "AIzaSyDQIA8NkxJjoa04eps6mD57hAxcNd8vk1A",
    authDomain: "to-do-70f60.firebaseapp.com",
    databaseURL: "https://to-do-70f60-default-rtdb.firebaseio.com",
    projectId: "to-do-70f60",
    storageBucket: "to-do-70f60.appspot.com",
    messagingSenderId: "433487663109",
    appId: "1:433487663109:web:a72b7b904d90cad4588c6c"
  };


  firebase.initializeApp(firebaseConfig);

  let todo = firebase.database().ref('todo');


  todo.on('value',function(snapshot){
    console.log(snapshot.val());
    let data = snapshot.val()
    $('#pending').html('');
    $('#completed').html('');
    for(let key in data){
      

      if(data[key].status==="pending"){

      $('#pending').append(`<div class="card">
                             <div class="card-body">
                                <h5>${data[key].task}</h5>
                                <button class="btn btn-warning btn-sm edit" data-id="${key}">Edit</button>
                                <button class="btn btn-danger btn-sm delete" data-id="${key}">Delete</button>
                                <button class="btn btn-success btn-sm complete" data-id="${key}">Completed</button>
                              </div>
                            </div>`)


      }else{
        $('#completed').append(`<div class="card">
                        <div class="card-body">
                          <h5>${data[key].task}</h5>
                          <button class="btn btn-success btn-sm gotopending" data-id="${key}">Pending</button>
                          <button class="btn btn-danger btn-sm deletenow" data-id="${key}">Delete</button>
                        </div>
                      </div>
                    </div>`)

      }


    };


  })

  $('#addone').click(function(){
    $('#open').append(`<input type="text" name="" class="form-control" id="task-id"></input><br>
                    <button class="btn btn-danger" id="add-task">Add Task</button>`)
  });


  

  $('#open').on('click','#add-task',function(){
    let task = $('#task-id').val();
    let todoRef = todo.push({
      task : task,
      status : 'pending'
    });
    $('#task-id').val('');

    $('#open').html('');

  });
  



  $('#add-task').click(function(){
    let task = $('#task-id').val();

    let todoRef = todo.push({
      task : task,
      status : 'pending'
    });
    $('#task-id').val('');
  });

  $('#pending').on('click','.edit',function(){


    let taskId =   $(this).data("id");
    let changed_task = prompt("Edit Task");
    firebase.database().ref('todo/' + taskId).update({
      task : changed_task,
    });

  });



  $('#pending').on('click','.delete',function(){
     
   let taskId =   $(this).data("id");
    firebase.database().ref('todo/' + taskId).remove();
  });


  $('#pending').on('click','.complete',function(){
     
    let taskId =   $(this).data("id");
     firebase.database().ref('todo/' + taskId).update({
       status:'Completed'
     });
   });

   $('#completed').on('click','.gotopending',function(){
    let taskId =   $(this).data("id");
    firebase.database().ref('todo/' + taskId).update({
      status:'pending'
    });
   });
   $('#completed').on('click','.deletenow',function(){
    let taskId =   $(this).data("id");
    firebase.database().ref('todo/' + taskId).remove()
   });



    
  

  


})






