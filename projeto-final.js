const prompt = require('prompt-sync')();
let idSave = 1, id;
const tarefas = new Map();
tarefas.set(0, {descricao: "Teste", data:"ddsa"});
menu();
let opcao = lerOpcao();

while (opcao !== 0){
    switch(opcao){
        case 1:
            console.log("=========== ADICIONAR ==========")
            console.log("");
            adicionar();
            break;

        case 2:
            console.log("============ EDITAR ============");
            console.log("");
            listarTarefas();
            id = lerId();
            verificarTarefa(id)?editarTarefa(id):console.log("Id não encontrado");
            console.log("");
            break;

        case 3:
            console.log("=========== REMOVER ============");
            console.log("");
            id = lerId();
            listarTarefas();
            verificarTarefa(id)?removerTarefa(id):console.log("Id não encontrado");
            break;

        case 4:
            console.log("============ LISTAR ============");
            console.log("");
            listarTarefas();
            break;

        case 5:
            console.log("============ BUSCAR ============");
            console.log("");
            id = lerId();
            if(verificarTarefa(id)){
                listarTarefas(buscarTerefa(id));
            }else{
                console.log("Id não encontrado");
            }
            break;
    }
    menu();
    opcao = lerOpcao();
}

function buscarTerefa(id){
    const newMap = new Map()
    newMap.set(id,  tarefas.get(id))
    console.log(newMap)

    return newMap;
}

function removerTarefa(id){
    if(tarefas.delete(id)){
        console.log("Tarefa removida com sucesso!");
    }else{
        console.log("Erro ao remover tarefa");
    }

}

function verificarTarefa(id){
    return tarefas.has(id);
}

function listarTarefas(map){
    if(tarefas.size > 0){
        for (const [key, value] of map?map:tarefas) {
            console.log(`Id: ${key}  |  ${value.descricao}  |  ${value.data}`);
        }
    }else{
        console.log("Nenhum resultado encontrado.")
    }
    
    console.log("")
}

function lerId(){
    return Number(prompt("Informe o id da tarefa: "));
}

function editarTarefa(id) {
    const edit = tarefas.get(id);
    edit.descricao = prompt("Informe uma nova tarefa a ser realizada: ");
    edit.data = prompt("Informe uma nova data para essa tarefa: ");
    if(edit.descricao && edit.data){
        tarefas.set(id, edit);
        console.log("Tarefa editada com sucesso!");
        console.log("");
    }else{
        console.log("Erro ao editar tarefa!");
        console.log("");
    }
}

function adicionar(){
    let descricao = prompt("Informe a tarefa a ser realizada: ");
    let data = prompt("Informe uma data para essa tarefa: ");
    const tarefa = {descricao, data};
    if(descricao && data){
        tarefas.set(idSave, tarefa);
        console.log("Tarefa adicionada com sucesso!");
        console.log("");
        idSave++;
    }else{
        console.log("Erro ao adicionar tarefa!");
        console.log("");
    }
    console.log(tarefas)
}


function menu(){
    console.log("============= MENU =============")
    console.log("1 - Adicionar tarefa");
    console.log("2 - Editar tarefa");
    console.log("3 - Remover tarefa");
    console.log("4 - Listar tarefas");
    console.log("5 - Buscar tarefa");
    console.log("0 - Sair");
    console.log("");
}

function lerOpcao(){
    let opcao = Number(prompt("Escolha uma opcao (apenas numeros): "));
    while(opcao < 0 || opcao > 5){
        opcao = prompt("Informe uma opcao válida(apenas numeros): ");
    }
    return opcao;
    
}


