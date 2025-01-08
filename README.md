# Transcrição de Imagens em Texto com AWS Textract

Este projeto extrai texto de imagens, utilizando a API AWS Textract. O projeto foi desenvolvido com uma arquitetura limpa (Clean Architecture) utilizando **C# ASP.NET Web API** para o backend e **Next.js/React** para o frontend.

## Funcionalidades

- **Processamento de Imagens**: Através da AWS Textract, o sistema pode extrair texto de imagens enviadas.
- **Upload de Arquivos**: Interface de frontend em Next.js/React para upload de imagens.
- **Exibição de Resultados**: O texto extraído é exibido ao usuário de forma clara.
- **API REST**: Implementação de uma Web API em C# ASP.NET para interação com o AWS Textract e gerenciamento de requisições.

## Tecnologias Utilizadas

- **Backend**: 
  - C# ASP.NET Web API
  - AWS Textract
  - Clean Architecture

- **Frontend**: 
  - Next.js
  - React
  - JavaScript

- **Outros**:
  - Docker (não necessario)
  - AWS SDK (para interagir com o AWS Textract)
  - Jest/Testing Library (se aplicável para testes de frontend)

## Estrutura do Projeto

### Backend (ASP.NET Web API)
- Project.API
    - Controllers           // Contém os controladores para expor a API
    - Program.cs            // Ponto de entrada do aplicativo, configuração do app

- Project.Core
    - Common                // Lógica compartilhada (ex: exceções customizadas, utilitários)
    - Entities              // Entidades de domínio (objetos de valor ou entidades)
    - Interfaces            // Interfaces (ex: IProdutoRepository, IProdutoService)

- Project.Infrastructure
    - Migrations            // Arquivos de migração (caso use um ORM como Entity Framework)
    - Persistence           // Implementações de acesso a dados (repositórios, DbContext)
    - Services              // Implementações de serviços externos (ex: envio de e-mails, integrações externas)
    - DependencyInjection.cs // Configuração de injeção de dependência (registro de serviços)

### Frontend (Next.js/React)
- Project.Cliente
    
## Como Rodar o Projeto

### Pré-Requisitos

- .NET 8
- Node.js
- AWS Account (com permissões para utilizar o AWS Textract)
- Editor de código como Visual Studio ou VSCode

### Passos para Execução

1. **Backend (C# ASP.NET Web API)**

Configure o ``AWSTextract.API`` para "Set as Startup Project", e de F5;

2. **Frontend (Next.js/React)**

Configurado tanto no VS2022 quanto no VSCode

### VSCode:

Abra o projeto ``awstextract.client`` no VSCode e pressione F5;

### VS2022

Configure o ``awstextract.client`` para "Set as Startup Project", e de F5;
OU
Com o ``AWSTextract.API`` para "Set as Startup Project", mude o deply para "http (with Client)";

3. **Configuração do AWS Textract**

   - Configure as permissões necessárias para usar o AWS Textract em sua conta.

Editar o arquivo ``appsettings.json`` adicionando o acesso da AWS Account e.g:
``
"AWS": {
  "Profile": "default",
  "Region": "region-aqui e.g us-west-1", // Your desired AWS region
  "AccessKey": "access-key-aqui", // Optional if you're using environment variables
  "SecretKey": "secret-key-aqui" // Optional if you're using environment variables
},
``

4. **Arquivo `.env` para Configuração do Cliente AWS Textract**

   No diretório do **frontend** (ou no diretório onde o cliente `awstextract.client` está localizado), crie um arquivo `.env` com as seguintes variáveis de ambiente:

   API_URL=http://localhost:5051
   API_TEXTRACT_ENDPOINT=/Textract/extract-text-from-file

5. **Testando o Sistema**

   - Acesse a interface no frontend em `http://localhost:3000`.
   - Faça o upload de uma imagem com texto.
   - O sistema enviará a imagem para o backend, que por sua vez processará a imagem utilizando o AWS Textract e retornará o texto extraído.