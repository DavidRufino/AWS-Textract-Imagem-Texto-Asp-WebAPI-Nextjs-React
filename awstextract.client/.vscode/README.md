# Configuração de Debug para Next.js no VSCode

Esse repositório contém uma configuração completa para **debugging** de uma aplicação Next.js usando o **VSCode**. Com essa configuração, você pode debugar tanto o lado do **servidor** (Node.js) quanto o lado do **cliente** (navegador Chrome) de uma vez só. Vou te mostrar como tudo isso funciona e como usar as configurações que criamos.

## O que está configurado?

1. **Debug do lado do servidor (Node.js)** - Executa o comando `npm run dev` para iniciar o servidor Next.js e permite debugar o código do lado do servidor.
2. **Debug do lado do cliente (Chrome)** - Abre uma instância do navegador **Chrome** apontando para `http://localhost:3000`, onde sua aplicação Next.js está sendo executada, para debugar o código do cliente.
3. **Debug completo (full stack)** - Combina os dois tipos de debug (servidor e cliente), permitindo uma experiência de debug mais fluida e prática.

### Como está organizado?

O VSCode usa arquivos chamados **`launch.json`** e **`tasks.json`** para configurar as tarefas e o comportamento do depurador. Aqui está o que cada um faz:

### 1. **launch.json**
O `launch.json` é onde configuramos o VSCode para **rodar o código** e conectar os depuradores (para o cliente e servidor).

```shell
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "VS 2022 Next.js: debug (Chrome)",
      "url": "http://localhost:3000",
      "webRoot": "{workspaceFolder}"
    },
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    
  ],
  "compounds": [
    {
      "name": "Next.js: debug full stack with Chrome",
      "configurations": [
        "Next.js: debug server-side",
        //"Next.js: debug full stack",
        "Next.js: debug client-side"
      ]
    }
  ]
}
```

Fonte:
https://nextjs.org/docs/app/building-your-application/configuring/debugging