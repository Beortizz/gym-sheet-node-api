# Gerenciamento de Fichas de Treinamento para Academia

Este projeto é uma aplicação de gerenciamento de fichas de treinamento desenvolvida para academias. Ele permite o cadastro de alunos, exercícios e a criação e edição de fichas de treinamento para os alunos, incluindo informações sobre os exercícios e as repetições associadas.

## Tecnologias Utilizadas

- **Backend:** Node.js com Express
- **Banco de Dados:** Prisma ORM com MySQL
- **Autenticação:** JWT (JSON Web Token)

## Funcionalidades Principais

- **Cadastro de Alunos:** Registre informações detalhadas sobre os alunos, incluindo nome, idade, peso, altura, entre outros.

- **Cadastro de Exercícios:** Adicione novos exercícios à base de dados, incluindo nome, descrição e qualquer informação relevante.

- **Criação/Edição de Fichas de Treinamento:** Desenvolva fichas de treinamento personalizadas para cada aluno, adicionando exercícios específicos, número de repetições e outras configurações.

## Como Rodar o Projeto

### Pré-requisitos

- Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.
- Certifique-se de ter o [Prisma CLI](https://www.prisma.io/docs/getting-started) instalado para gerenciar o banco de dados.
- Certifique-se de ter o [MySQL](https://dev.mysql.com/downloads/mysql/) rodando em sua máquina.

### Passos para Execução

1. **Clone o Repositório:**
```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git

cd nome-do-repositorio
```
2. **Instale as Dependências**
```bash
npm install
```

3. **Configure o ambiente**
 - Crie um arquivo chamado .env
 - Atualize as seguintes variaveis 
 ```properties
DATABASE_URL="mysql://seu_usuario@sua_senha:localhost:3306/nome_do_seu_banco"
JWT_SECRET=[seu_token_super_secreto]
```

4. **Rode as migrations do prisma**
```bash
npx prisma migrate dev
```

5. **Rode o servidor**
```bash
npm run dev
```

## Tudo Pronto, agora só fazer requisições para localhost:3000
