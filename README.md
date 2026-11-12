
# Pokédex - UC33

## Sobre o projeto

Este projeto é uma Pokédex desenvolvida com HTML, CSS,
JavaScript, Node.js, Express e TypeScript.

O objetivo é permitir que o usuário pesquise Pokémon
pelo nome ou número e visualize suas informações.

A aplicação utiliza uma API própria que consulta a
PokéAPI e devolve somente os dados necessários.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- TypeScript
- Node.js
- Express
- PokéAPI
- Git e GitHub

## Funcionalidades

- Pesquisa de Pokémon pelo nome ou número.
- Exibição do número, nome, imagem e tipos.
- Navegação entre Pokémon.
- Tradução dos tipos para português.
- Botão para pesquisar um Pokémon aleatório.
- Validação de pesquisas inválidas.
- Tratamento de erros HTTP.
- Cache em memória para evitar consultas repetidas.
- Tempo limite de 5 segundos nas consultas à PokéAPI.

## Como executar

1. Instale o Node.js 22.
2. Abra a pasta do projeto no VS Code.
3. Abra o terminal.
4. Instale as dependências:

npm install

5. Inicie o servidor:

npm run dev

6. Abra o navegador e acesse:

http://localhost:3000

## Rota da API

GET /api/pokemons/:termo

Exemplo:

http://localhost:3000/api/pokemons/pikachu

Resposta:

{
  "numero": 25,
  "nome": "pikachu",
  "tipos": ["electric"],
  "imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
}

## Tratamento de erros

400 - Nome ou número inválido.

404 - Pokémon não encontrado.

503 - PokéAPI indisponível ou tempo limite excedido.

As mensagens de erro são devolvidas em JSON.

## Diferenciais do projeto

Diferentemente da Pokédex apresentada na videoaula,
nossa aplicação utiliza um servidor Node.js e Express
para consultar a PokéAPI.

Isso permite validar as pesquisas, tratar erros e
guardar os Pokémon já pesquisados na memória.

Também foram adicionados dois desafios:

1. Tradução dos tipos dos Pokémon para português.
2. Botão que sorteia um Pokémon entre os 151 primeiros.

## Disciplina

UC33 - Desenvolvimento de Serviços Web
