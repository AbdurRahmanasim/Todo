const firebaseConfig = {
  apiKey: "AIzaSyAXXoUsyF86Cd3F0XE7cHbneRXxCYfCEzA",
  authDomain: "todo-app-a8358.firebaseapp.com",
  databaseURL: "https://todo-app-a8358-default-rtdb.firebaseio.com",
  projectId: "todo-app-a8358",
  storageBucket: "todo-app-a8358.appspot.com",
  messagingSenderId: "1042056978076",
  appId: "1:1042056978076:web:2d41ebb4f01e295cf0d759"
};
var app = firebase.initializeApp(firebaseConfig);

var list = document.getElementById("list") ; 



  app.database().ref('todos').on('child_added' , function(data){

    var li = document.createElement("li") ;
    var litext = document.createTextNode(data.val().value);
  
    li.appendChild(litext);

    var delBtn = document.createElement("button");
    
    var delText = document.createTextNode("DELETE") ;
    delBtn.setAttribute("id" , data.val().key ) ;
    delBtn.setAttribute("class" , "btn1") ;

     delBtn.setAttribute('onclick' , "deleteITem(this)") ;

    delBtn.appendChild(delText) ;

    var editBtn = document.createElement("button"); 
    var editText = document.createTextNode("EDIT") ;
    editBtn.appendChild(editText) ;
    editBtn.setAttribute("id" , data.val().key)
    editBtn.setAttribute("onclick" , "editItem(this)") ;
    editBtn.setAttribute("class" , "btn2") ;

    li.appendChild(delBtn);
    li.appendChild(editBtn) ;

   list.appendChild(li)


  })




function addtodo(){
    var todo_item = document.getElementById("todo-item") ;

    if(todo_item.value !== ""){
    var database = app.database().ref('/todos') ;
    var key = database.push().key
    var todo = {
      value : todo_item.value ,
      key :key
    }
    database.child(key).set(todo)
   todo_item.value = "" ;
  }
  else{
    alert('Please Write Something')
  }
}

function deleteITem(e){
  app.database().ref("todos").child(e.id).remove()
  e.parentNode.remove()
  
}

function editItem(e){
  var val = e.parentNode.firstChild.nodeValue ;
  var editValue = prompt("Enter Edit Value" , val)
  var editTodo = {
    value : editValue ,
    key : e.id
  }
  app.database().ref("todos").child(e.id).set(editTodo)
  e.parentNode.firstChild.nodeValue = editValue ;

}




function deleteAll(){
  app.database().ref("todos").remove()
  list.innerHTML = '' ;
}