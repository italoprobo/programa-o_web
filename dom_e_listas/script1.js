// selecione o botão usando o método getElementById
var botao1 = document.getElementById("botao1");
var botao2 = document.getElementById("botao2");
var botao3 = document.getElementById("botao3");

// adicione um evento de clique ao botão
botao1.addEventListener("click", function() {
    // selecione o parágrafo usando o método getElementById
    var paragrafo = document.getElementById("paragrafo");
    // altere o texto do parágrafo
    paragrafo.textContent = "O texto deste parágrafo foi alterado!";
});

botao2.addEventListener("click", function() {
    var paragrafo = document.getElementById("apagar")
    paragrafo.textContent = ""
})

botao3.addEventListener("click", function teste(){
    document.body.style.color = ("blue")
    document.body.style.background = ("black")
});