const imagemElemento = document.getElementById('imagem');
const resultadoElemento = document.getElementById('resultado');
const botaoElemento = document.getElementById('botao');

botaoElemento.addEventListener('click', function() {
  const imagemSelecionada = imagemElemento.value;
  const img = document.createElement('img');
  img.src = imagemSelecionada;
  resultadoElemento.innerHTML = '';
  resultadoElemento.appendChild(img);
});

imagemElemento.addEventListener('change', function() {
  const imagemSelecionada = this.value;
  const img = document.createElement('img');
  img.src = imagemSelecionada;
  resultadoElemento.innerHTML = '';
  resultadoElemento.appendChild(img);
});
