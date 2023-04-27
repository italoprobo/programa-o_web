function mostrarElemento() {
    const elemento = document.getElementById("exemplo1");
    const resultado = document.getElementById("resultado1");
    resultado.innerHTML = elemento.innerHTML;
  }
  
  function mostrarTags() {
    const tags = document.getElementsByTagName("li");
    let texto = "";
    for (let i = 0; i < tags.length; i++) {
      texto += tags[i].innerHTML + "<br>";
    }
    const resultado = document.getElementById("resultado2");
    resultado.innerHTML = texto;
  }
  