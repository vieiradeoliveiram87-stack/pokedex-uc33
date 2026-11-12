const URL_BASE = 'https://pokeapi.co/api/v2';
const TEMPO_LIMITE_MS = 5000;
const NOME_VALIDO = /^[a-z0-9-]{1,40}$/;
// Guarda os Pokémon pesquisados na memória
const cache = new Map();
// Classe utilizada para tratar erros
export class ErroDaApi extends Error {
    status;
    constructor(status, mensagem) {
        super(mensagem);
        this.status = status;
    }
}
// Valida o nome ou número pesquisado
function normalizar(termo) {
    const nome = termo.trim().toLowerCase();
    if (!NOME_VALIDO.test(nome)) {
        throw new ErroDaApi(400, `Pokémon "${termo}" inválido: use o nome (ex.: pikachu) ou o número (ex.: 25)`);
    }
    return nome;
}
// Seleciona apenas os quatro campos necessários
function resumir(dados) {
    return {
        numero: dados.id,
        nome: dados.name,
        tipos: dados.types.map((t) => t.type.name),
        imagem: dados.sprites.front_default,
    };
}
// Busca as informações do Pokémon
export async function buscarPokemon(termo) {
    const nome = normalizar(termo);
    const guardado = cache.get(nome);
    if (guardado)
        return guardado;
    let resposta;
    try {
        resposta = await fetch(`${URL_BASE}/pokemon/${nome}`, {
            signal: AbortSignal.timeout(TEMPO_LIMITE_MS)
        });
    }
    catch {
        throw new ErroDaApi(503, 'A PokéAPI não respondeu. Tente de novo em instantes.');
    }
    if (resposta.status === 404) {
        throw new ErroDaApi(404, `Pokémon ${nome} não encontrado`);
    }
    if (!resposta.ok) {
        throw new ErroDaApi(503, 'A PokéAPI está com problemas. Tente de novo em instantes.');
    }
    const pokemon = resumir((await resposta.json()));
    cache.set(nome, pokemon);
    cache.set(String(pokemon.numero), pokemon);
    return pokemon;
}
