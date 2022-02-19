## NOTE : Implementation for mongodb is very different from mysql.

> Many-to-Many relationship implementation in an sql databse is different from a nosql database.
> References to be stored as array of ids, instead of having a table in the middle between the two entities for storing their primary keys.
> Due to different reason, TypeORM doesn't support QueryBuilding.

- master branch : configured with a mysql driver : docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 -v mysqlNest:/var/lib/mysql mysql:debian
- feature/mongo : configured with a mongodb drive : docker container run -d -p 27017:27017 -v nest-data:/data/db --name mongodb mongo
