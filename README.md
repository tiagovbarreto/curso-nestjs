# curso-nestjs

To setup the environment follow the steps bellow:

1) Clone the repository in your workstation

2) Go to the project folder and run the command: docker-compose up

3) Access the containers:

4) To access the backend container run the command: docker-compose exec backend /bin/sh

- To start the application run the command: yarn start:dev

5) To access the db container run the command: docker-compose exec db /bin/sh

- To access the database run the commands:

      - su postgres;
      - psql
      - \c taskmanagement

6) To run tests, stop the application and run the command (no need to stop the container): yarn test 


PS:. You must install docker (https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-18-04-pt)  and docker-compose (https://docs.docker.com/compose/install/)
