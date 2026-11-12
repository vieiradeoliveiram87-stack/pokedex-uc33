
const $ = (id) => document.getElementById(id);

let numeroAtual = 0;

// Busca os dados no nosso servidor
async function pedirPokemon(termo) {
  let resposta;

  try {
    resposta = await fetch(
      `/api/pokemons/${encodeURIComponent(termo)}`
    );
  } catch {
    throw new Error(
      'Sem conexão com o servidor. Ele está rodando?'
    );
  }

  const corpo = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    throw new Error(corpo.erro ?? `Erro ${resposta.status}`);
  }

  return corpo;
}

// Mostra mensagens de erro ou carregamento
function mostrarAviso(texto, tipo = 'erro') {
  $('aviso').textContent = texto;
  $('aviso').className = `aviso ${tipo}`;
  $('aviso').hidden = false;
}

// Mostra os dados do Pokémon na tela
function mostrarPokemon(p) {
  numeroAtual = p.numero;

  $('aviso').hidden = true;

  $('numero').textContent =
    `#${String(p.numero).padStart(3, '0')}`;

  $('nome').textContent = p.nome;

  $('tipos').replaceChildren(
    ...p.tipos.map((tipo) => {
      const li = document.createElement('li');

      li.textContent = tipo;
      li.className = `tipo tipo-${tipo}`;

      return li;
    })
  );

  const img = $('imagem');
  img.hidden = !p.imagem;

  if (p.imagem) {
    img.src = p.imagem;
    img.alt = p.nome;
  }
}

// Desativa botões durante a pesquisa
function travarBotoes(travar) {
  for (const b of document.querySelectorAll('button')) {
    b.disabled = travar;
  }

  if (!travar) {
    $('anterior').disabled = numeroAtual <= 1;
  }
}

// Realiza a busca
async function buscar(termo) {
  mostrarAviso('Buscando...', 'info');
  travarBotoes(true);

  try {
    mostrarPokemon(await pedirPokemon(termo));
  } catch (erro) {
    mostrarAviso(erro.message);
  } finally {
    travarBotoes(false);
  }
}

// Esconde imagens que não carregarem
$('imagem').addEventListener('error', () => {
  $('imagem').hidden = true;
});

// Pesquisa ao clicar em Buscar
$('busca').addEventListener('submit', (e) => {
  e.preventDefault();
  buscar(e.target.termo.value.trim());
});

// Botão Anterior
$('anterior').addEventListener('click', () => {
  buscar(String(numeroAtual - 1));
});

// Botão Próximo
$('proximo').addEventListener('click', () => {
  buscar(String(numeroAtual + 1));
});

// Mostra o primeiro Pokémon ao abrir
buscar('1');
