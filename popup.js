let taskArray=[]

// <div id="show-task" class='show-task'></div>
//     <button class='remove'>Completed</button>

function add(){
    let task=document.getElementById("input").value
    taskArray.push(task)
    console.log(taskArray)
    taskArray.map((i)=>{
        createList(i)
    })
}

function createList(t){
    return `<li> ${t} </li>`
}

document.getElementById('add').addEventListener('click',add())

