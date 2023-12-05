var apipost = 'https://json-template-two.vercel.app/todo'

function render(todolist){
    console.log(todolist)
    var htmlremaining = document.querySelector('.remaining-text')
    var sophantutronglist = 0;
    var renderhtmls = document.querySelector('.list-to-do')
    var renderhtml = todolist.map(function(todo){

        sophantutronglist+=1;
        return `<div class="todo-item">
                    <div class="todo-item-content">${todo.content}</div>
                    <div class="${todo.id} todo-item-delete">
                        <button onclick="deletetask(${todo.id},render)" class="button-delete"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>`
    })
    
    htmlremaining.innerHTML = `You have ${sophantutronglist} pendding tasks`
    renderhtmls.innerHTML = renderhtml.join('')
}

function  gettodolist(render){
    fetch(apipost)
        .then(function(respond){
            return respond.json()
        })
        .then(render)
}

function posttask(todo,render){        
    var option = {
                method: 'POST',
                headers: {
                        "Content-Type": "application/json",
                      },
                body: JSON.stringify(todo)  
                 }

        fetch(apipost,option)
                        .then(function(respond){
                                return respond.json()
                        })
                        
                        .then(function(data){
                            console.log(data)
                        })

                        .then(render)
        }

function deletetask(id,render){
        var option = {
                        method: 'DELETE',
                        headers: {
                                    "Content-Type": "application/json",
                                 }
                     }

        fetch(apipost +'/'+ id,option)
                    .then(function(respond){
                            return respond.json()
                    })
                    .then(render)   
}

function clearall(render,deletetask){
    fetch(apipost)
           .then(function(respond){
            return respond.json()
            })

           .then(function(todolist){
                        todolist.forEach(function(task){
                            deletetask(task.id,render)
                        });
           })
}


function addtask(posttask,render){
        var taskinput = document.querySelector('input[name="task"]').value
        if(taskinput === '')
        {
            alert('No task!!!')
            return;
        }

        var task = {
            content:taskinput
        }

        posttask(task,render)
}

function start(){
    gettodolist(render)
}

start()