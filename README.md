# curso-nestjs

### First off all
You must install [docker](https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-18-04-pt)  and [docker-compose](https://docs.docker.com/compose/install/).

### After install docker and docker-compose you can setup the environment following the steps bellow:

- Clone the repository in your workstation

- Go to the project folder (curso-nestjs) and run the command:
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

### Now if you want to run tests, use the command bellow (no need to stop the container):
```sh
$ yarn test
```


