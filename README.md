# SonarHub

Aplicação web de página única (SPA) para pesquisar artistas e consultar
informações musicais usando a API Last.fm.

## Funcionalidades

- Pesquisa de artistas pelo nome.
- Exibição dos resultados em cards.
- Página com biografia, ouvintes e reproduções do artista.
- Estados de carregamento, erro e busca sem resultados.
- Navegação entre busca e detalhes sem recarregar a página.

## Tecnologias

- React
- Vite
- React Router
- API Last.fm, com respostas em JSON
- `fetch` para as requisições AJAX
- Hook `useMemo` para ordenar os resultados da busca

## API utilizada

A aplicação usa os métodos:

- `artist.search`: pesquisa artistas.
- `artist.getInfo`: consulta informações de um artista.

Documentação: https://www.last.fm/api

## Como executar

1. Entre na pasta do frontend:

```bash
cd frontend/vite-project
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo .env na pasta frontend/vite-project e informe sua chave:
```bash
VITE_LASTFM_API=sua_chave_da_lastfm
```

4. Inicie o servidor local:
npm run dev

## Hook e biblioteca escolhidos
O projeto usa useMemo para ordenar os resultados de artistas por número de
ouvintes.
O react-router-dom controla as rotas e permite navegar entre a busca e os
detalhes do artista dentro da SPA.

## Equipe
| Nome | RA |
| --------- | :---------: |
| Caelayne Aparecida | 2766957 |
| João Pinho | 2767074 |
| Lorena Eduarda | 2767104 |