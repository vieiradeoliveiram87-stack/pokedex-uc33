import express from 'express';
import path from 'node:path';
import { buscarPokemon, ErroDaApi } from './pokeApi.js';
const PORTA = Number(process.env.PORT ?? 3000);
const app = express();
// Entrega os arquivos da página
app.use(express.static(path.join(import.meta.dirname, '..', 'public')));
// Rota para pesquisar Pokémon
app.get('/api/pokemons/:termo', async (req, res) => {
    const pokemon = await buscarPokemon(req.params.termo);
    res.status(200).json(pokemon);
});
// Resposta para rotas inexistentes da API
app.use('/api', (req, res) => {
    res.status(404).json({
        erro: 'Rota não encontrada'
    });
});
// Tratamento dos erros
app.use((erro, req, res, next) => {
    if (erro instanceof ErroDaApi) {
        res.status(erro.status).json({
            erro: erro.message
        });
        return;
    }
    console.error(erro);
    res.status(500).json({
        erro: 'Erro interno do servidor'
    });
});
// Inicia o servidor
app.listen(PORTA, () => {
    console.log(`Pokédex em http://localhost:${PORTA}`);
});
