let taskArray=[]

function add(){

    function createList(t){
        return `<li> ${t} </li>`
    }

    let task=document.getElementById("input").value
    if(task!==''){taskArray.push(task)}
   
    console.log(taskArray)

    // document.getElementById("rem").addEventListener('click',function deleteItem(){
    //     console.log('delete pressed')
    // })

    const todo_arr=taskArray.map((i)=>{
       return createList(i)
    })

    document.querySelector('#listTable').innerHTML=todo_arr.join("")
}

function del(){
    taskArray.splice(0,taskArray.length)
}


document.getElementById("add").addEventListener('click',add())
document.getElementById("remove").addEventListener('click',del())
