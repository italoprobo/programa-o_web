document.addEventListener('DOMContentLoaded', function () {
    var botaoExibir = document.getElementById('botaoExibir');
    botaoExibir.addEventListener('click', exibirConteudo);
});

function exibirConteudo() {
    var conteudo = document.getElementById('caixaDeTexto').value;
    if (conteudo == ""){
        alert("Digite algo")
    }else{
        document.getElementById('conteudo').innerHTML = conteudo;
    }
}