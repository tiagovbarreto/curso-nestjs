# Tasks manager
A small and simple project that offers an API to manage tasks. 

## Table of contents
* [About](#about)
* [Features](#features)
* [Technologies](#technologies)
* [Startup](#startup)
* [Tests](#tests)
* [Documentation](#documentation)
* [Usefull Commands](#usefull)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## About
The intention of doing this project was to understand how to develop the backend architecture using NestJS, Node and Typescript.

## Features
List of features ready and TODOs for future development
* Create task
* Update task
* Delete task
* Search tasks

To-do list:
* Create the frontend web application

## Technologies
* NESTJS - https://nestjs.com/
* Node - https://nodejs.org/en/
* Typescript - https://www.typescriptlang.org/
* PostgresSQL - https://www.postgresql.org/
* Docker - https://www.docker.com/
* Docker Compose - https://docs.docker.com/compose/install/

## Startup

### Tools
You must install [docker](https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-18-04-pt)  and [docker-compose](https://docs.docker.com/compose/install/) and [yarn](https://linuxize.com/post/how-to-install-yarn-on-ubuntu-18-04/).

### Clone the repository
```sh
git clone https://github.com/tiagovbarreto/tasks-nestjs.git
```

### Start project
```sh
$ docker-compose up
```

## Tests
### Run tests
- Run the commands bellow:
```sh
$ docker-compose exec backend /bin/sh
$ yarn test
```
## Documentation
### Access swagger?
- Acesse the url below:
```sh
http://localhost:3000/api
```
## Usefull commands
### To see running containers run the command: 
```sh
$ docker ps or docker container ls or $ docker-compose ps
```

### To access the backend container run the command: 
```sh
$ docker exec -it <container id> /bin/sh or $ docker-compose exec backend /bin/sh
```

### To access the db container run the command:
```sh
$ docker exec -it <container id> /bin/sh or $ docker-compose exec db /bin/sh
```

### To access the database run the commands:

```sh
$ su postgres
$ psql
$ \c taskmanagement
```

## Status
Project is: _finished_

## Inspiration
The knowledge was acquired in Ariel Weinberger's NestJS Course. The objective of the course was to develop and deploy back-end enterprise applications following best practices using NestJS, Node.js and TypeScript.

Thank you a lot Ariel!

## Contact
Created by tiagovalentim@gmail.com - feel free to contact me!


