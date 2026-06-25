# Lista de Tarefas com Next.js 15 e Testes

Aplicação simples de listagem e adição de tarefas criada para praticar testes unitários com Next.js 15, TypeScript, Jest e React Testing Library.

## Tecnologias

- Next.js 15 com App Router
- React 19
- TypeScript
- Jest
- React Testing Library
- Testing Library User Event

## Estrutura

```txt
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    ListaDeTarefas.tsx
    NovaTarefa.tsx
  data/
    tarefas.ts
  hooks/
    useContadorDeTarefas.ts
  types/
    tarefa.ts
  pages/
    .gitkeep
  tests/
    NovaTarefa.test.tsx
    page.test.tsx
    useContadorDeTarefas.test.ts
```


## Funcionalidades

- A página principal é um Server Component que carrega uma lista inicial simulada de tarefas a partir de `src/data/tarefas.ts`.
- O componente `ListaDeTarefas` é um Client Component que mantém a lista em estado local.
- O componente `NovaTarefa` é um Client Component com formulário controlado.
- Cada tarefa pode ser removida individualmente.
- O formulário impede o envio de tarefas vazias.
- O hook `useContadorDeTarefas` retorna a quantidade atual de tarefas.

## Como Rodar

Instale as dependências:

```bash
npm install
```

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

## Testes

Execute todos os testes:

```bash
npm test
```

Execute os testes em modo watch:

```bash
npm run test:watch
```

## Cobertura dos Testes

Os testes cobrem:

- Renderização do input e botão do componente `NovaTarefa`.
- Digitação no input e submissão correta do formulário.
- Bloqueio de envio quando o campo está vazio.
- Contagem de tarefas pelo hook `useContadorDeTarefas`.
- Renderização da página principal e da lista inicial de tarefas.
- Adição de uma nova tarefa pela página principal e atualização do contador.
- Remoção de uma tarefa pela página principal e atualização do contador.

## Configuração do Jest no Next.js

A configuração usa `next/jest`, que integra o Jest ao pipeline do Next.js:

```js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(config);
```

O arquivo `jest.setup.ts` importa os matchers extras do Testing Library:

```ts
import '@testing-library/jest-dom';
```

Para componentes React testados no navegador simulado, o ambiente `jsdom` é necessário.
