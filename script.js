const localStorageKey = 'to-do-list-gn'

function validateIfExistNewTask(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let taskValue = document.getElementById('task').value
    let exists = values.find(x => x.name == taskValue)
    return !exists ? false : true
}

function newTask(){
    let task = document.getElementById('task')
    task.style.border = ''
    
    //Validação
    if(!task.value){
        task.style.border = '1px solid red'
        alert('Digite algo para inserir em sua linha')
    } else if(validateIfExistNewTask()){
        alert('Já existe uma task com essa descrição')
    } else{
        //incremente no local de armazenamento
        //Estudar arrays e objetos JSON e localStorage para entender o pq do JSON
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: task.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        showValues()
    }
}

function showValues(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('list')
    list.innerHTML = ''
    for(let i = 0; i < values.length;i++){
        list.innerHTML += `<li>${values[i]['name']}<button id = "ok" onclick ='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/></svg></button></li>`
    }
}

function removeItem(data){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()
}

showValues()