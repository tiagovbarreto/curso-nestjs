# The project

This is a small and simple project that offers an API to manage tasks. The intention of doing it was to understand how to develop the backend architecture using NestJS with Typescript.

The knowledge was acquired in Ariel Weinberger's NestJS Course. The objective of the course was to develop and deploy back-end enterprise applications following best practices using Node.js and TypeScript.

Thank you a lot Ariel!

# Technical setup

### First off all
You must install [docker](https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-18-04-pt)  and [docker-compose](https://docs.docker.com/compose/install/) and [yarn](https://linuxize.com/post/how-to-install-yarn-on-ubuntu-18-04/).

### After install docker and docker-compose you can setup the environment following the steps bellow:

- Clone the repository in your workstation

- Go to the project folder and run the command:
```sh
$ docker-compose up
```
### After setup the environment you can access the containers:
#### backend container
- To access the backend container run the command: 
```sh
$ docker-compose exec backend /bin/sh
```

- To start the application run the command: 
```sh
$ yarn start:dev
```
#### db container

- To access the db container run the command:
```sh
$ docker-compose exec db /bin/sh
```

- To access the database run the commands:

```sh
$ su postgres
$ psql
$ \c taskmanagement
```

### Do you want to run tests?
- Run the commands bellow:
```sh
$ docker-compose exec backend /bin/sh
$ yarn test
```


