# Projeto 1 FullStack

### Last.fm API

Para o desenvolvimento desse projeto, foi escolhida a API **Last.fm Music Discovery**.

A API utilizada disponibiliza informações relacionadas a artistas, músicas, álbuns, tags e artistas semelhantes. Além disso, permite que a aplicação consulte dados musicais e retrate essas informações de forma dinâmica.

### Documentação Oficial:

https://www.last.fm/api

### Formato dos dados

As respostas da API serão consumidas no formato JSON.

Exemplo de resposta JSON
```
"results": {
    "tagmatches": {
      "tag": \[{
        "name": "disco",
        "count": "55483",
        "url": "www.last.fm\\/tag\\/disco"
      },
      ...
      {
        "name": "disco pop",
        "count": "160",
        "url": "www.last.fm\\/tag\\/disco%20pop"
      }\]
    },
    "for": "disco"
  }
}
```
