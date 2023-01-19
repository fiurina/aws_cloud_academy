# Magenta Tribe API for PQ / IT

## Development

#### Initializing the webservice:

- Start your MySQL instance at localhost:3307
- Initialize it with /db_init/init_db_dev.sql. You can probably run `mysql -uroot < db_init/init_db_dev.sql`
- Install nodemon with `npm i nodemon -g`
- Install dependencies with `npm install`
- Run the webservice with `nodemon` (no arguments required)

##### Nodemon

Nodemon can be controlled through the config in package.json file. There is a separate part `nodemonConfig`.
Possible ways to configure nodemon can be found in the official documentation.

#### Database initialization:

No .sql files are used when running nodemon, so a change in table*inig.sql will not show table changes in the database (those .sql files are used in production).
When you run `nodemon`, you'll see the module sequelize executing CREATE TABLE instructions. If you would like to create a new table, you'll need to create its model inside the `models` folder and instance it inside a controller.
\_Caution*, if you create a model _without_ a controller, sequelize will not create the referred table!

#### Test data

If you run the webservice with `nodemon` the database is cleared on every restart and test data is inserted.
Test data is provided through db_init/test_data.json. You can include the json for as many databases objects
as you want. The webservice then runs a bulk creator which inserts all the data. Make sure the data is correct.

## Tests

No testing is currently implemented (at least it is not working so that counts ;)). It's on my To-Do list and
I will try to get it done as soon as possible. There will be different test data because it might contain
invalid to data to fully test the application.

## Production

There is currently no fully working strategy to deploy the webservice to production while remaining the state
of the databases, doing migrations on it and keep the webservice running at the same time.

## Docker

To create the container make sure a previous version of the container is remove before running build.
To create and build the docker container: `docker-compose build --no-cache --force-rm`
To start first time: `docker-compose up` will show you the output.
Once the container is created you can use `docker-compose start` and `docker-compose stop`.
To import new data from database open de container mysql Cli and type:
`mysql -u root -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE < /docker-entrypoint-initdb.d/table_init.sql`.

If fails to connect to db because of too many connections, run inside the mysql container:
`mysql -u root -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE`
`mysql> flush hosts;`

To export database data from the mysql container run:
`mysqldump -u root -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE > export.sql`
To extract files from the container run from the host machine:
`docker ps` and get the id of the container
`docker cp <continer-id>:/export.sql <path-host-machine>`

To Drop a table in database
mysql> SET foreign_key_checks = 0;
mysql> drop table ...
mysql> SET foreign_key_checks = 1;

ESTIMACIÓN - 93h
FRONT - 40h - Login jwt y auth -4h - Página carga masiva + topbar + sidebar -16h - Página tabla con edición en tabla (coger resultados paginados) -20h
API REST - 18h - Login -2h - Carga masiva ficheros a S3 -4h - DB: Preparación modelo DB -6h
GET lista de facturas procesadas -2h
UPDATE factura en concreto -2h
DELETE factura? -2h
AWS - 35h - Carga masiva a S3 -2h - Lambda que lanza Textrack -3h - Lambda procesa resultados y guarda json en bucket y lanza Comprehend -15h - Comprehend guarda en bucket y trigger Lambda que guarda resultados en Aurora -15h - SNS y SQS?
