# Project Name
> Here goes your awesome project description!

## Table of contents
* [About](#about)
* [Features](#features)
* [Technologies](#technologies)
* [Startup](#startup)
* [Tests](#tests)
* [Documentation](#documentation)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## About

This is a small and simple project that offers an API to manage tasks. The intention of doing it was to understand how to develop the backend architecture using NestJS with Typescript.

## Features
List of features ready and TODOs for future development
* Awesome feature 1
* Awesome feature 2
* Awesome feature 3

To-do list:
* Wow improvement to be done 1
* Wow improvement to be done 2

## Technologies
* Tech 1 - version 1.0
* Tech 2 - version 2.0
* Tech 3 - version 3.0

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

## Status
Project is: _finished_

## Inspiration
The knowledge was acquired in Ariel Weinberger's NestJS Course. The objective of the course was to develop and deploy back-end enterprise applications following best practices using NestJS, Node.js and TypeScript.

Thank you a lot Ariel!

## Contact
Created by tiagovalentim@gmail.com - feel free to contact me!



# Startup

## First off all
You must install [docker](https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-18-04-pt)  and [docker-compose](https://docs.docker.com/compose/install/) and [yarn](https://linuxize.com/post/how-to-install-yarn-on-ubuntu-18-04/).

## Run app:

- Clone the repository in your workstation
```sh
git clone https://github.com/tiagovbarreto/tasks-nestjs.git
```

- Go to the project folder and run the command:
```sh
$ docker-compose up
```
# Docker and docker-compose commands
## running containers
- To see running containers run the command: 
```sh
$ docker ps or docker container ls or $ docker-compose ps
```

## backend container
- To access the backend container run the command: 
```sh
$ docker exec -it <container id> /bin/sh or $ docker-compose exec backend /bin/sh
```

## db container

- To access the db container run the command:
```sh
$ docker exec -it <container id> /bin/sh or $ docker-compose exec db /bin/sh
```

- To access the database run the commands:

```sh
$ su postgres
$ psql
$ \c taskmanagement
```

## Do you want to run tests?
- Run the commands bellow:
```sh
$ docker-compose exec backend /bin/sh
$ yarn test
```

## Do you want to see swagger?
- Acesse the url below:
```sh
http://localhost:3000/api
```

