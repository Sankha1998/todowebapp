
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
  
    let data = snapshot.val();
    document.querySelector('#inprogress').innerHTML = "";
    document.querySelector('#completed').innerHTML="";
    document.querySelector('#pending').innerHTML = "";
    
    

    for(let key in data){
      
      console.log
      if(data[key].status==="pending"){
      document.querySelector('#pending').innerHTML +=`<div class="card">
                             <div class="card-body">
                                <h5>${data[key].task}</h5>
                                <button class="btn btn-warning btn-sm edit" data-id="${key}">Edit</button>
                                <button class="btn btn-success btn-sm movetoprogress" data-id="${key}">Move To Progress</button>
                                <button class="btn btn-danger btn-sm delete" data-id="${key}">Delete</button>
                              </div>
                            </div>`


      }else if(data[key].status==="completed"){
        document.querySelector('#completed').innerHTML += `<div class="card">
                        <div class="card-body">
                          <h5>${data[key].task}</h5>
                          <button class="btn btn-success btn-sm movetoprogress" data-id="${key}">Back to Progress</button>
                          <button class="btn btn-danger btn-sm delete" data-id="${key}">Delete</button>
                        </div>
                      </div>
                    </div>`

      }else{

        document.querySelector('#inprogress').innerHTML += `<div class="card">
                        <div class="card-body">
                          <h5>${data[key].task}</h5>
                          <button class="btn btn-success btn-sm gotopending" data-id="${key}">Pending</button>
                          <button class="btn btn-danger btn-sm gotocomplete" data-id="${key}">Complete</button>
                        </div>
                      </div>
                    </div>`
        
      }


    };


  })


document.querySelector('#addone').addEventListener('click',function(){
  document.querySelector('#open').innerHTML += `<input type="text" name="" class="form-control" id="task-id"></input><br>
  <button class="btn btn-danger" id="add-task">Add Task</button>`;
})




  document.querySelector('#open').addEventListener('click',function(event){

  let target = event.target; // 
  if (target.id != 'add-task'){
    return; 
  }else{
    let task = document.querySelector('#task-id').value;
    let todoref = todo.push({
      task: task,
      status: 'pending'
    });
    document.querySelector('#task-id').value = '';
    document.querySelector('#open').innerHTML='';


  }

  })


  document.querySelector('#pending').addEventListener('click',function(event){

    let target = event.target; // 
    if (!target.classList.contains('edit')){
      return; 
    }else{

        let taskId = target.getAttribute('data-id');
        let changed_task = prompt("Edit Task");
        firebase.database().ref('todo/'+taskId).update({
          task : changed_task,
        });
    }
  
    })




document.querySelector('#pending').addEventListener('click',function(event){

  let target = event.target;
  if(!target.classList.contains('delete')){
    return;
  }else{
    let taskId =  target.getAttribute('data-id');

    console.log(taskId)

    firebase.database().ref('todo/' + taskId).remove();

  }

})




   document.querySelector('#pending').addEventListener('click',function(event){
    target = event.target;
    if(!target.classList.contains('movetoprogress')){

      return;

    }else{

      let taskId = target.getAttribute('data-id');

      firebase.database().ref('todo/'+taskId).update({
        status:'progress',
      })

    }

   })

   document.querySelector('#inprogress').addEventListener('click',function(event){

    let target = event.target;

    if(!target.classList.contains('gotopending')){
      return
    }else{
      let taskId = target.getAttribute('data-id');

      firebase.database().ref('todo/'+taskId).update({
        status:'pending',
      })
    }

   })

   
   document.querySelector('#inprogress').addEventListener('click',function(event){

    let target = event.target;

    if(!target.classList.contains('gotocomplete')){
      return
    }else{
      let taskId = target.getAttribute('data-id');

      firebase.database().ref('todo/'+taskId).update({
        status:'completed',
      })
    }

   })




   document.querySelector('#completed').addEventListener('click',function(event){

    let target = event.target;

    if(!target.classList.contains('movetoprogress')){
      return
    }else{
      let taskId = target.getAttribute('data-id');
      firebase.database().ref('todo/'+taskId).update({
        status:'progress'
      });
    }

   })


   


   document.querySelector('#completed').addEventListener('click',function(event){

    let target = event.target;

    if(!target.classList.contains('delete')){
      return
    }else{
      let taskId = target.getAttribute('data-id');

      firebase.database().ref('todo/' + taskId).remove()
    }

   })



    







