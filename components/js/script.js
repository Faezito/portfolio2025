// IMPORTAR PROJETOS

async function carregarProjetos() {
    try {
        const resposta = await fetch('data/projetos.json');
        if (!resposta.ok) {
            throw new Error(`Erro ao carregar projetos.`);
        }
        const projetos = await resposta.json()
        let projetoIndice = 0;
        
        const container = document.getElementById('projetos')
        projetos.forEach(projeto => {
            projetoIndice++
            const elemento = document.createElement('div')
            elemento.classList.add('projeto')
            let alerta = ""
            if(projetoIndice == 1){
                alerta = "<span class='badge text-bg-primary text-uppercase'>novidade!</span>"
            }


            elemento.innerHTML = `
            <img src="${projeto.imagem}" alt="${projeto.titulo}">
            <div class="projetoDesc">
            <h3 class="d-inline">${projeto.titulo} ${alerta}</h3>
            <p>${projeto.desc}</p>   
            <p><strong>Tecnologias utilizadas: </strong>${projeto.tecnologias.join(', ')}</p>
            <a href="${projeto.git}" class="btn btn-success" target="_blank"">Código Fonte</a>
            <a href="${projeto.acessar}"  id="${projeto.titulo.includes("Cozinha") ? "kitchenapp" : ""}" class="btn btn-primary" target="_blank"">Acessar</a>
            </div>
            `;

            container.appendChild(elemento);
        });
    } catch (error) {
        console.error('Erro ao carregar projetos:', error)
    }
}


// IMPORTAR EXPERIENCIAS
async function carregarExperiencias() {
    try {
        const resposta = await fetch('data/experiencias.json');
        if (!resposta.ok) {
            throw new Error(`Erro ao carregar experiências.`);
        }
        const experiencias = await resposta.json()
        const container = document.getElementById('ti-exp')
        experiencias.forEach(experiencia => {
            const elemento = document.createElement('div')
            elemento.classList.add('experiencia')
            elemento.classList.add('mb-5')

            elemento.innerHTML = `
                <h1>${experiencia.empresa}</h1>
                <h3>${experiencia.cargo} (${experiencia.tempo})</h3>
                <p>${experiencia.desc}</p>
                <h4 class="fw-bold"> Responsabilidades </h4>
                <ul class="text-start col mx-auto">
                    ${experiencia.atribuicoes}
                </ul>

                <h4 class="fw-bold"> Realizações </h4>
                <ul class="text-start col mx-auto">
                    ${experiencia.realizacoes}
                </ul>

                <h4 class="fw-bold"> Tecnologias Utilizadas </h4>
                <p>${experiencia.tecnologias.join(', ')}</p>

                <hr class="mt-4" />
                `;

            container.appendChild(elemento);
        });
    } catch (error) {
        console.error('Erro ao carregar experiências:', error)
    }
}

// IMPORTAR HARD SKILLS
async function carregarHSkills() {
    try {
        const resposta = await fetch('data/hardskills.json');

        if (!resposta.ok) {
            throw new Error('Erro ao carregar hard skills.');
        }

        const skills = await resposta.json();
        const container = document.getElementById('hardskills');

        container.innerHTML = ''; // limpar antes de renderizar (evita duplicações)

        skills.forEach(skill => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');

            li.textContent = skill;

            container.appendChild(li);
        });

    } catch (error) {
        console.error('Erro ao carregar hard skills:', error);
    }
}


// IMPORTAR SOFT SKILLS
async function carregarSSkills() {
    try {
        const resposta = await fetch('data/softskills.json');

        if (!resposta.ok) {
            throw new Error('Erro ao carregar soft skills.');
        }

        const skills = await resposta.json();
        const container = document.getElementById('softskills');

        container.innerHTML = ''; // limpar antes de renderizar (evita duplicações)

        skills.forEach(skill => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');

            li.textContent = skill;

            container.appendChild(li);
        });

    } catch (error) {
        console.error('Erro ao carregar soft skills:', error);
    }
}

// CALCULO ATUAL
async function atual() {

    const txt = document.getElementById('atualTempo')
    const inicio = new Date("2025-09-09")
    const atual = new Date()

    let mesesTrabalhados = (atual.getFullYear() - inicio.getFullYear()) * 12 + (atual.getMonth() - inicio.getMonth())

    txt.textContent = `${mesesTrabalhados} meses`
}

async function main() {
    $('#kitchenapp').on('click', (e) => {
        e.preventDefault();

        Swal.fire({
            icon: "info",
            title: "Aviso",
            text: "Esta aplicação roda em meu servidor privado que pode ou não estar ligado no momento. Caso não consiga acessa-la, tente novamente mais tarde.",
            showCloseButton: true,
            confirmButtonText: "Acessar"
        }).then(result => {
        if (result.isConfirmed) {
            window.open("https://unnettled-carina-glossier.ngrok-free.dev", "_blank");
        }
    });
    });
}


$(document).ready(async function() {
    await carregarProjetos();        
    await carregarExperiencias();  
    await carregarHSkills();
    await carregarSSkills();
    atual();    
    main();                
});