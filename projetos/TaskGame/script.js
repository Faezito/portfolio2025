let skills = {
    tech: 0, //28
    comm: 0,
    pro: 0,
    inova: 0,
    con: 0,
    mkt: 0
}

let skillLevel = {
    tech: 0,
    comm: 0,
    pro: 0,
    inova: 0,
    con: 0,
    mkt: 0
}

const maxskill = 10

let cargo = 'CARGO'

function setCargo () {
    const showCargo = document.getElementById('cargo')
    showCargo.textContent = cargo
}

function loadSkills(){
    const savedSkills = localStorage.getItem('skills')
    if (savedSkills){
        skills = JSON.parse(savedSkills)
    }
    att01()
}

function savedSkills(){
    localStorage.setItem('skills', JSON.stringify(skills))
}



function addTask(){
    const localStorageKey = 'task-list'

    let title = document.getElementById('titulo')
    let spec1 = document.getElementById('areas')
    let spec2 = document.getElementById('areas2')
    let tempo = document.getElementById('tempo')

    if (!title.value || !spec1.value || !tempo.value){alert('Verifique os dados e tente novamente.')}
    else{
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            titulo: title.value,
            esp1: spec1.value,
            esp2: spec2.value,
            time: tempo.value,
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
    }
    showTasks()

}

 //função para inserir uma página HTML dentro de outra quando requerido
function addTarefa(){
    const url = 'addtask.html'

    fetch(url)
    .then(response => response.text())
    .then(data => {
        document.getElementById('newTask').innerHTML = data
    })
    .catch(error => {
        console.error('Erro ao carregar a página')
    })
}

var techxp = ''
let commxp = ''
let proxp = ''
let inovaxp = ''
let conxp = ''
let mktxp = ''

reward1 = ''
reward2 = ''

function showTasks(){
    const localStorageKey = 'task-list'
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('task-list')

    tarefa = ''
    
    for(let i = 0; i < values.length; i++){
        let esp1 = values[i]['esp1']
        let esp2 = values[i]['esp2']
        let time = values[i]['time']

        switch (esp1){
            case 'ti':
                techxp = 0.4 * time
                conxp = 0.2 * time
                inovaxp = 0.1 * time
                reward1 = 'Tecnologia: +' + techxp
                reward2 = 'Conhecimento: +' + conxp
                reward3 = 'Inovação: +' + inovaxp
                break
            case 'adm':
                conxp = 0.4 * time
                mktxp = 0.2 * time
                techxp = 0.1 * time
                reward1 = 'Marketing: +' + mktxp
                reward2 = 'Conhecimento: +' + conxp
                reward3 = 'Tecnologia: +' + techxp
                break
            case 'atendimento':
                mktxp = 0.2 * time
                commxp = 0.4 * time
                conxp = 0.1 * time
                reward1 = 'Comunicação: +' + commxp
                reward2 = 'Marketing: +' + conxp
                reward3 = 'Conhecimento: +' + conxp
                break
            case 'comercial':
                commxp = 0.2 * time
                mktmxp = 0.4 * time
                proxp = 0.1 * time
                reward1 = 'Marketing: +' + mktxp
                reward2 = 'Comunicação: +' + commxp
                reward3 = 'Proatividade: +' + proxp
                break
            default:
                esp1 = 0
                break
        }
        if (esp2 != 'none'){
        switch (esp2){
            case 'ti':
                techxp = 0.3 * time
                proxp = 0.5 * time
                reward4 = 'Tecnologia: +' + techxp
                reward5 = 'Proatividade: +' + proxp
                break              
            case 'adm':
                conxp = 0.3 * time
                proxp = 0.5 * time
                reward4 = 'Conhecimento: +' + conxp
                reward5 = 'Proatividade: +' + proxp
                break             
            case 'atendimento':
                commxp = 0.3 * time
                proxp = 0.5 * time
                reward4 = 'Comunicação: +' + commxp
                reward5 = 'Proatividade: +' + proxp
                break                
            case 'comercial':
                mktxp = 0.3 * time
                proxp = 0.5 * time
                reward4 = 'Marketing: +' + commxp
                reward5 = 'Proatividade: +' + proxp
                break
                

            default:
                esp2 = 0
                break
        }}else{
            reward4 = ''
            reward5 = ''
            reward6 = ''
        }

        tarefa += `
        <div class="task-container">
            <button class="completed" onclick='completeTask("${values[i]["titulo"]}")'>V</button>
            <div class="task">
                <h3>
                    ${values[i]['titulo']}
                </h3>
                    <br>
                    <div class="center">
                        <ul class="rewards">
                        <li>${reward1}</li>
                        <li>${reward2}</li>
                        <li>${reward3}</li>
                        </ul>
                    </div>
                    <div class="center">
                        <ul class="rewards">
                        <li>${reward4}</li>
                        <li>${reward5}</li>
                        <li>${reward6}</li>

                        </ul>
                    </div>
                </div>
            <button id="btn-del" onclick='deleteTask("${values[i]["titulo"]}")'>X</button>
        </div>`
    }

    list.innerHTML = tarefa
}

function deleteTask(data){
    const localStorageKey = 'task-list'
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.titulo == data)

    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showTasks()
    savedSkills()
    loadSkills()
}

function completeTask(data){
    const localStorageKey = 'task-list'
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.titulo == data)

    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))

    skills['tech'] += techxp
    skills['com,'] += commxp
    skills['pro'] += proxp
    skills['inova'] += inovaxp
    skills['con'] += conxp
    skills['mkt'] += mktxp

    showTasks()
    savedSkills()
    loadSkills()
    att02()
    att01()
}

function att01 (){
    document.getElementById('tech').innerHTML = skills['tech'] + "/" + maxskill
    document.getElementById('comm').innerHTML = skills['comm'] + "/" + maxskill
    document.getElementById('pro').innerHTML = skills['pro'] + "/" + maxskill
    document.getElementById('inova').innerHTML = skills['inova'] + "/" + maxskill
    document.getElementById('con').innerHTML = skills['con'] + "/" + maxskill
    document.getElementById('mkt').innerHTML = skills['mkt'] + "/" + maxskill

    document.getElementById('techlevel').innerHTML = 'Nível: ' + skillLevel['tech']
    document.getElementById('commlevel').innerHTML = 'Nível: ' + skillLevel['comm']
    document.getElementById('prolevel').innerHTML = 'Nível: ' + skillLevel['pro']
    document.getElementById('inovalevel').innerHTML = 'Nível: ' + skillLevel['inova']
    document.getElementById('conlevel').innerHTML = 'Nível: ' + skillLevel['con']
    document.getElementById('mktlevel').innerHTML = 'Nível: ' + skillLevel['mkt']
}

function att02 () {
    let leveledUp = false

    while (skills['tech'] >= maxskill){
        console.log('level up')
        skills['tech'] -= maxskill
        skillLevel['tech'] += 1
        leveledUp = true
    }
    while (skills['comm'] >= maxskill){
        console.log('level up')
        skills['comm'] -= maxskill
        skillLevel['comm'] += 1
        leveledUp = true
    }
    while (skills['pro'] >= maxskill){
        console.log('level up')
        skills['pro'] -= maxskill
        skillLevel['pro'] += 1
        leveledUp = true
    }
    while (skills['inova'] >= maxskill){
        console.log('level up')
        skills['inova'] -= maxskill
        skillLevel['inova'] += 1
        leveledUp = true
    }
    while (skills['con'] >= maxskill){
        console.log('level up')
        skills['con'] -= maxskill
        skillLevel['con'] += 1
        leveledUp = true
    }
    while (skills['mkt'] >= maxskill){
        console.log('level up')
        skills['mkt'] -= maxskill
        skillLevel['mkt'] += 1
        leveledUp = true
    }

    return leveledUp
}

showTasks()
loadSkills()
setCargo()
att02() //precisa estar acima do 01
att01()