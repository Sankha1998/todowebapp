
if(localStorage.getItem('name')=== null){
  window.location.href = 'index.html';
}

let userid = localStorage.getItem('userid');


document.querySelector('#user_img').setAttribute('src',localStorage.getItem('profilepic'));

document.querySelector('#user_name').textContent = localStorage.getItem('name');


document.addEventListener("DOMContentLoaded", function(event) {


let todo = firebase.database().ref('users/'+ userid);



document.querySelector('#addone').addEventListener('click',function(){
    document.querySelector('#open').innerHTML = `<input type="text" name="" class="form-control" id="task-id"></input><br>
    <button class="btn btn-danger" id="add-task">Add Task</button>`;
    })

    
document.querySelector('#open').addEventListener('click',function(event){

    let target = event.target; 
    if (target.id != 'add-task'){
        return; 
    }else{
        let task = document.querySelector('#task-id').value;
        
        if(task.length>0){
          todo.push({
          task: task,
          status: 'pending'
          });
          document.querySelector('#task-id').value = '';
          document.querySelector('#open').innerHTML='';
        }else{

          alert("can't add null task");

        }
    
    
    }
    
    })
    

    document.querySelector('#logout').addEventListener('click',function(){
   
      firebase.auth().signOut().then(function() {
  
          localStorage.removeItem('name');
          localStorage.removeItem('profilepic');
          localStorage.removeItem('userid');
          window.location.href='index.html';
  
  
      }).catch(function(error) {
  
          alert("error occured");
  
      });
  
  
  });
  


    todo.on('value',function(snapshot){


        let data = snapshot.val()

        
        for(let id in data){


        var total_task = 0
        var pending_task = 0
        var completed_task = 0
        var inprogress_task = 0
        
  
  
        let data = snapshot.val();
        document.querySelector('#inprogress').innerHTML = "";
        document.querySelector('#completed').innerHTML="";
        document.querySelector('#pending').innerHTML = "";
    
    
    for(let key in data){
      total_task += 1
      
      if(data[key].status==="pending"){
      
      document.querySelector('#pending').innerHTML +=`<div class="card">
                              <div class="card-body">
                                <h5>${data[key].task}</h5>
                                <button class="btn btn-warning btn-sm edit" data-id="${key}">Edit</button>
                                <button class="btn btn-success btn-sm movetoprogress" data-id="${key}">In Progress</button>
                                <button class="btn btn-danger btn-sm delete" data-id="${key}">Delete</button>
                              </div>
                            </div>`;
      pending_task += 1
  
  
      }else if(data[key].status==="completed"){
        
        document.querySelector('#completed').innerHTML += `<div class="card">
                        <div class="card-body">
                          <h5>${data[key].task}</h5>
                          <button class="btn btn-success btn-sm movetoprogress" data-id="${key}">In Progress</button>
                          <button class="btn btn-danger btn-sm delete" data-id="${key}">Delete</button>
                        </div>
                      </div>
                    </div>`;
        completed_task += 1
      }else{
        
        document.querySelector('#inprogress').innerHTML += `<div class="card">
                        <div class="card-body">
                          <h5>${data[key].task}</h5>
                          <button class="btn btn-secondary btn-sm gotopending" data-id="${key}">Pending</button>
                          <button class="btn btn-warning btn-sm gotocomplete" data-id="${key}">Complete</button>
                        </div>
                      </div>
                    </div>`;
      inprogress_task += 1
      }
      
  
    }
    
  document.querySelector('#totaltask').innerHTML = total_task;
  document.querySelector('#totalpending').innerHTML = pending_task;
  document.querySelector('#totalinprogress').innerHTML = inprogress_task;
  document.querySelector('#totalcompleted').innerHTML = completed_task;

  
  
        }
    })

  });

  document.querySelector('#pending').addEventListener('click',function(event){
  
    let target = event.target;
    if (!target.classList.contains('edit')){
      return; 
    }else{


      let taskId = target.getAttribute('data-id');
      let changed_task = prompt("Edit Task");

      

      if(changed_task.length>0){
  
             
              firebase.database().ref('users/'+userid+'/'+taskId).update({
                task : changed_task,
              })
      }else{
        alert("can't add null task");
        let changed_task = prompt("Edit Task");

      }
       
    }
  
    })
  
  
  
  document.querySelector('#pending').addEventListener('click',function(event){
  
  let target = event.target;
  if(!target.classList.contains('delete')){
    return;
  }else{
    let taskId =  target.getAttribute('data-id');
  
   
  
    firebase.database().ref('users/'+userid+'/'+taskId).remove()
    window.location.href = 'dashboard.html';
   
  
  }
  
  })
  
  
  
  
    document.querySelector('#pending').addEventListener('click',function(event){
    target = event.target;
    if(!target.classList.contains('movetoprogress')){
  
      return;
  
    }else{
  
      let taskId = target.getAttribute('data-id');
  
      firebase.database().ref('users/'+userid+'/'+taskId).update({
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
  
      firebase.database().ref('users/'+userid+'/'+taskId).update({
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
  
      firebase.database().ref('users/'+userid+'/'+taskId).update({
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
      firebase.database().ref('users/'+userid+'/'+taskId).update({
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
  
      firebase.database().ref('users/'+userid+'/'+taskId).remove();
      window.location.href = 'dashboard.html';

    }


    
  
    })


    function validation(task_name){

      if(task_name !== null){
        return 1
      }else{
        return 0
      }



    }
  
          
    


   