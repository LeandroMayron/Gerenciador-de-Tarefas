function abrirModal() {
  overlay.classList.add("active");
  criarTarefa.classList.add("active");
}

function fecharModal() {
  overlay.classList.remove("active");
  criarTarefa.classList.remove("active");
}

function buscarTarefas() {
  fetch("http://localhost:3000/tarefas")
    .then((res) => res.json())
    .then((res) => {
      inserirTarefa(res);
    });
}
buscarTarefas();

function inserirTarefa(listaDeTarefas) {
  if (listaDeTarefas.length > 0) {
    lista.innerHTML = "";
    listaDeTarefas.map((tarefa) => {
      lista.innerHTML += `<li>
                    <h5>${tarefa.titulo}</h5>
                    <p>${tarefa.descricao}</p>
                    <div class="actions">
                        <box-icon name='trash' onclick="deletarTarefa(${tarefa.id})"></box-icon>
                    </div> `;
    });
  }
}

function novaTarefa() {
  event.preventDefault();

  let tarefa = {
    titulo: titulo.value,
    descricao: descricao.value,
  };

  fetch("http://localhost:3000/tarefas", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(tarefa),
  })
    .then((res) => res.json())
    .then((res) => {
      fecharModal();
      buscarTarefas();
    });
}

function deletarTarefa(id) {
  fetch(`http://localhost:3000/tarefas/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      alert("Tarefa deletada com sucesso!");
      buscarTarefas();
    });
}

function pesquisarTarefas() {
    let lis = document.querySelectorAll("ul li");
    if(buscar.value.length > 0) {
        lis.forEach((li) => {
            if(!li.children[0].innerText.includes(buscar.value)) {
                li.classList.add('oculto');
            } else {
                li.classList.remove('oculto');
            }
        });
    } else {
        lis.forEach((li) => {
            li.classList.remove('oculto');
        });
    }
}



