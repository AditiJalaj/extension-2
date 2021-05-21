let taskArray=[]


function add(){

    function createList(t){
        return `<li> ${t} </li>`
    }

    let task=document.getElementById("input").value
    taskArray.push(task)
    console.log(taskArray)
    const todo_arr=taskArray.map((i)=>{
       return createList(i)
    })

    document.querySelector('#listTable').innerHTML=todo_arr.join("")
}



document.getElementById("add").addEventListener('click',add())

