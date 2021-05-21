
const todoForm = document.querySelector('.todo-form')
const todoInput=document.querySelector(".todo-input")
const todoItemList=document.querySelector(".todo-items")



// array which stores every todos - objects id,name,completed
let todos = [];
todoForm.addEventListener('submit', function(e){
    e.preventDefault();
   
    //calling addTodo function with input box current value
    addTodo(todoInput.value);
})


//addTodo function
const addTodo=(item)=>{
    if(item!==''){
        // make a todo object, which has id, name, and completed properties
        const todo={
            id:Date.now(),
            name:item,
            completed:false

        }

        //then add it to todos array
        todos.push(todo);

        // we need to update our localStorage whenever we add some new todo items and then we render after adding to local storage.
        addToLocalStorage(todos);  // then renders them between <ul>

        //clear the input box value
        todoInput.value='';
     }
}

const renderTodos=(todos)=>{
    // // clear everything inside <ul> with class=todo-items  -- if you dont do you'll get full array
    todoItemList.innerHTML='';

    //run through each item inside todos
    todos.map((item)=>{
        //check if item completed
        const checked=item.completed?'checked':null

        //make a <li> element and fill it
        const li=document.createElement('li');
        
        //<li class='item'></li>
        li.setAttribute('class','item');

        //<li class='item' data-key='20210521'></li>
        li.setAttribute('data-key',item.id)

        //if item is completed,then add a class to <li> called 'checked', which will add line-through style
        if(item.completed===true){
            li.classList.add('checked');
        }

        li.innerHTML=`<input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <button class='delete-button'>X</button>`;

        //now add the <li> to <ul>
        todoItemList.append(li);
    })
}

// function to add todos to local storage
const addToLocalStorage=(t)=>{
    localStorage.setItem('todos',JSON.stringify(todos))
   
   //Whenever we added something to localStorage, we will render that changes to the screen. 
    renderTodos(t);
}


//uptil now todo items will be added to localStorage but to avoid localStorage from clearing at refresh we use below function
const getFromLocalStorage=()=>{
    const reference=localStorage.getItem('todos');

    //if ref exists
    if (reference){
        //convert back to array and store in todos array
        todos=JSON.parse(reference);
        renderTodos(todos);
    }
}

//toggle the value to completed and not completed
const toggle=(id)=>{
    todos.map((itm)=>{
       // use == not ===, because here types are different. One is number and other is string
       if(itm.id==id){
           //toggle the value
           item.completed=!item.completed;
       }
    })
    addToLocalStorage(todos)
}

//deletes a todo from todo array then updates localstorage and renders updated list to screen
const deleteTodo=(id)=>{
   // filters out the <li> with the id and updates the todos array

   todos=todos.filter((itm)=>{
       // use != not !==, because here types are different. One is number and other is string
       return itm.id!=id;
   })

   //update the localStorage
   addToLocalStorage(todos)

}

//INITIally get everything from localStorage
getFromLocalStorage();

//after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox

todoItemList.addEventListener('click',(e)=>{
    //check if the event is on checkbox
    if(e.target.type==='checkbox'){
        //toggle the state
        toggle(e.target.parentElement.getAttribute('data-key'));
    }

    //check if that is a delete-button
    if(e.target.classList.contains('delete-button')){
       // get id from data-key attribute's value of parent <li> where the delete-button is present
       deleteTodo(e.target.parentElement.getAttribute('data-key'));
    }
})