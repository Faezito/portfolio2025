// IMPORTAR PROJETOS

async function carregarProjetos() {
    try {
        const resposta = await fetch('projetos.json');
        if (!resposta.ok) {
            throw new Error(`Erro ao carregar projetos.`);
        }
        const projetos = await resposta.json()

        const container = document.getElementById('projetos')
        projetos.forEach(projeto => {
            const elemento = document.createElement('div')
            elemento.classList.add('projeto')

            elemento.innerHTML = `
            <img src="${projeto.imagem}" alt="${projeto.titulo}">
            <div class="projetoDesc">
            <h3>${projeto.titulo}</h3>
            <p>${projeto.desc}</p>   
            <p><strong>Tecnologias utilizadas: </strong>${projeto.tecnologias.join(', ')}</p>
            <a href="${projeto.git}"  target="_blank"">Código Fonte</a>
            <a href="${projeto.acessar}"  target="_blank"">Acessar</a>
            </div>
            `;

            container.appendChild(elemento);
        });
    } catch(error) {
            console.error('Erro ao carregar projetos:', error)
        }
    }

    carregarProjetos()

// CALCULO UCS
function ucs() {
        const txt = document.getElementById('ucsTempo')
        const inicio = new Date("2024-05-06")
        const atual = new Date()

        let mesesTrabalhados = (atual.getFullYear() - inicio.getFullYear()) * 12 + (atual.getMonth() - inicio.getMonth())

        txt.textContent = `${mesesTrabalhados} meses`
}

ucs()
