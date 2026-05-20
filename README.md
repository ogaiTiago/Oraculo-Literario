# Oráculo Astrológico Literário

Site estático e responsivo que revela um conto a partir da data e da hora de nascimento.

O projeto cruza o signo solar com dois períodos do dia para chegar a um dos 24 contos cadastrados. A proposta é simples: uma página leve, sem backend e pronta para publicação no GitHub Pages.

## Como funciona

1. A pessoa informa data e hora de nascimento.
2. O site calcula o signo solar.
3. A hora define o período:
   - Dia: 00:00 a 11:59
   - Noite: 12:00 a 23:59
4. O resultado exibe signo, período, título, livro, justificativa e o texto do conto.
5. A consulta acontece na própria tela, sem envio de formulário e sem alterar a URL.

## Stack

- HTML estático
- JavaScript sem dependências externas
- CSS próprio em `assets/styles.css`

## Estrutura

```text
.
├── index.html
├── assets
│   ├── app.js
│   ├── stories.js
│   └── styles.css
├── Contos e Signos.md
├── .gitignore
└── README.md
```

## Como executar localmente

Abra o arquivo `index.html` no navegador. Como o projeto é totalmente estático, não há etapa de build nem servidor obrigatório para desenvolvimento.

Para publicar no GitHub Pages, basta servir a raiz do repositório.

## Conteúdo dos contos

Os 24 registros ficam em `assets/stories.js`, com o texto principal de cada conto em `storyHtml`. A formatação usa HTML simples para preservar parágrafos e divisões internas da narrativa.

Cada conto é um objeto com propriedades nomeadas:

```js
{
  sign: "Áries",
  symbol: "♈",
  period: "day",
  title: "Os sobreviventes",
  book: "Morangos Mofados",
  why: "Justificativa do conto.",
  storyHtml: `
    <p>Primeiro parágrafo do conto.</p>
    <p>Um trecho com <em>ênfase</em> e <strong>destaque</strong>.</p>
  `
}
```

Divisões internas podem ser marcadas assim:

```js
storyHtml: `
  <h3 class="conto-section">I</h3>
  <p>Primeiro parágrafo da seção.</p>
`
```
