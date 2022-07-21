# Blocklist Challenge

Seja bem vindo ao Blocklist Challenge!
A aplicação web que serve para consultas de CPF/CNPJ, bloqueio e desbloqueio dos mesmos.
Ainda é possível adicionar novos usuário sejam PF ou PJ e remove-los.


### Sumário:
- [Arquitetura do projeto](https://github.com/leoncarey/blocklist-challenge#arquitetura-do-projeto)
- [Setup requerido para rodar](https://github.com/leoncarey/blocklist-challenge#setup-requerido-para-rodar)
- [Como rodar](https://github.com/leoncarey/blocklist-challenge#como-rodar)
- [Backend](https://github.com/leoncarey/blocklist-challenge#backend)
  - [Testes](https://github.com/leoncarey/blocklist-challenge#testes-backend)
- [Frontend](https://github.com/leoncarey/blocklist-challenge#frontend)
  - [Testes](https://github.com/leoncarey/blocklist-challenge#testes-frontend)
- [Conclusão](https://github.com/leoncarey/blocklist-challenge#conclusao)

---

### Arquitetura do projeto

📦 blocklist-challenge<br>
┣ 📂 api - backend<br>
┃ ┣ 📄 <img align="center" alt="NodeJS" height="20" width="30" src="https://github.com/leoncarey/devicon/blob/master/icons/nodejs/nodejs-original.svg" />NodeJS + <img align="center" alt="MongoDb" height="20" width="30" src="https://github.com/leoncarey/devicon/blob/master/icons/mongodb/mongodb-original.svg" />MongoDb<br>
┃ ┗ 📄 <img align="center" alt="Docker" height="20" width="30" src="https://github.com/leoncarey/devicon/blob/master/icons/docker/docker-plain.svg" />Dockerfile<br>
┣ 📂 client - frontend<br>
┃ ┣ 📄 <img align="center" alt="Vue 3" height="20" width="30" src="https://github.com/leoncarey/devicon/blob/master/icons/vuejs/vuejs-original.svg" />Vue 3<br>
┃ ┗ 📄 <img align="center" alt="Docker" height="20" width="30" src="https://github.com/leoncarey/devicon/blob/master/icons/docker/docker-plain.svg" />Dockerfile<br>
┗ 📄 README.md


### Setup requerido para rodar
Antes de passar algumas instruções para rodar o projeto e seus testes,
se certifique de que tenha as seguintes tecnologias instaladas na sua máquina:

- <img align="center" alt="Docker" height="20" width="30" src="https://github.com/leoncarey/devicon/blob/master/icons/docker/docker-plain.svg" /> Docker(^20.10.17)
- Se certifique que o formatador e validador de código da sua IDE seja o eslint


### Como rodar
Atendendo aos requisitos de setup, seguiremos com os passos de como rodar.<br>
Abra seu terminal na pasta do projeto e siga as instruções para:

#### BACKEND
```bash
$ make run-api
```

Esse comando irá levantar o ambiente do backend.<br>
Express e o MongoDb estarão de pé para serem acessados:
- Aplicação via browser na porta: `11000`
  - <a href="http://localhost:11000" target="_blank">http://localhost:11000</a>
- Mongo:
  - host: `127.0.0.1`
  - porta: `27017`
  - user: `<string vazia>`
  - senha: `<string vazia>`

Após rodar o backend, é possível acessar todas as rotas disponíveis pela aplicação:
- <a href="http://localhost:11000/docs" target="_blank">http://localhost:11000/docs</a>

O único endpoint que não está disponível através da documentação do Swagger é o endpoint de suporte com as metricas do Prometheus:
- <a href="http://localhost:11000/status" target="_blank">http://localhost:11000/status</a>

Ao "derrubar" a aplicação no terminal, pode ser que o container esteja ainda de pé e a aplicação continue ativa.<br>
Nesse caso, rode o seguinte comando para "matar" os containers ativos:

```
$ make clean
```

#### Testes backend
Para rodar os testes use o comando:

```
$ make test-api
```

Após rodados os testes, estará disponivel a cobertura dos testes em: `/api/coverage/index.html`

<br>


#### FRONTEND
```bash
$ make run-client
```

Esse comando irá levantar primeiro o ambiente do backend.<br>
Na sequência levantará o ambiente do frontend.<br>
A API estará disponível para a aplicação Vue consumi-la na porta `5173`.

- <a href="http://localhost:5173" target="_blank">http://localhost:5173</a>

---
#### Conclusão

Espero que tenha aproveitado o tour nessa doc e que ela tenha sido útil.<br>
Um forte abraço e até a próxima.
