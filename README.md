# Trabalho 2 - Processamento Paralelo e Distribuído

#### Requisitos

- Node.js (https://nodejs.org/en/)

#### Execução

Abra o shell na pasta raíz do trabalho e execute os seguintes comandos:
 
$ npm install
$ npm run server
$ npm run client


#### É necessário implementar algum controle de concorrência no acesso aos métodos e à tabela hash por parte dos diferentes clientes?

Não, pois o Node roda de forma assíncrona, porém dentro da mesma Thread (Mono Thread assíncrono baseado em fila de eventos).

#### Autores
- <a href="https://github.com/Pequem" target="_blank">Fernando Guerra</a>
- <a href="https://github.com/vitorchane" target="_blank">Vitor Chane</a>