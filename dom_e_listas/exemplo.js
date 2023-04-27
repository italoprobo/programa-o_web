function mostrarElemento() {
    var elemento = document.getElementById("exemplo1");
    var resultado = document.getElementById("resultado1");
    resultado.innerHTML = elemento.innerHTML;
}
function mostrarTags() {
    var tags = document.getElementsByTagName("li");
    var texto = "";
    for (var i = 0; i < tags.length; i++) {
        texto += tags[i].innerHTML + "<br>";
    }
    var resultado = document.getElementById("resultado2");
    resultado.innerHTML = texto;
}
