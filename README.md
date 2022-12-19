# :hotel:Welcome to 'Chez Nestor API' !

- [:hotel: Welcome to 'Chez Nestor API' !](#welcome-to--chez-nestor-api---)
  - [ :thought_balloon: Context](#context)
  - [:building_construction: Stack](#-building-construction---stack)
  - [:construction_worker: Run Locally](#-construction-worker--run-locally)
    - [:floppy_disk: Database setup](#database-setup)
    - [:seat: Setup](#setup)
    - [:rocket: Local commands](#local-commands)
  - [:100:Can be improve](#-100-can-be-improve)

![image](https://user-images.githubusercontent.com/14876793/208528643-00bcfcb4-112b-49d9-bd18-f701478424b6.png)

## :thought_balloon: Context

:department_store: 'Chez Nestor' is a real estate management company. Their application makes the link between client, apartment and room inside the apartments. The goal of this project is to expose an API that:

- allows a customer to book a room
- retrieve all customer data
- recover all the data of an apartment
- retrieve all room data

:straight_ruler: A few specific rules have been put in place:

- A customer's email address is unique.
- A customer cannot book several rooms at the same time.
- When a room has been reserved by a customer, it can no longer be reserved.

## :building_construction: Stack

- :hotsprings:Node JS with the framework [Nest.js](https://nestjs.com/) - [TypeScript](https://www.typescriptlang.org/) - TypeScript is a **strongly typed programming language** that builds on JavaScript, giving you better tooling at any scale. - [TypeORM](https://typeorm.io/) - TypeORM can run in NodeJS, it's highly influenced by other ORMs, such as [Hibernate]. (http://hibernate.org/orm/). **TypeORM is known for high quality, scalable, maintainable applications the most productive way.** - [Swagger UI](https://swagger.io/) - Swagger UI is a collection of HTML, JavaScript, and CSS assets that dynamically generate beautiful documentation from a Swagger-compliant API. **Allows to visualize and interact with the API’s resources without having any of the implementation logic in place.**
  -:floppy_disk: [PostGreSQL](https://www.postgresql.org/) database (with [PGAdmin](https://www.pgadmin.org/))

## :construction_worker: Run Locally

### :floppy_disk: Database setup

1. 💻 Install **PostGreSQL** & **PGAdmin4**
2. 💾 **Create custom database** - you can import dump in PGAdmin (can be found in /dump)
   Here is a view of generated ERD.
   ![image](https://user-images.githubusercontent.com/14876793/208528888-f244c82c-6fc1-4f05-9b00-a7a6ef5b8f52.png)

```
Apartment
- `id` : Integer (120), unique ID ;
- `name` : Character varying (120), apartment name ;
- `street` : Character varying (120), apartment street ;
- `zipCode` : Character varying (120), apartment zip code ;
- `city` : Character varying (120), apartment city ;

Room
- `id` : Integer, unique ID ;
- `number` : Integer, room's number ;
- `area` : Float, room's area ;
- `price` : Integer, room's price (in euro) ;
- fkApartment : Integer, apartment reference ;
- fkClient : Integer, client reference ;

Client
- `id` : Integer, unique ID;
- `firstName` : Character varying (120),  client's first name ;
- `lastName` : Character varying (120),  client's last name ;
- `email` : Character varying (120),  client's email ;
- `phone` : Character varying (120),  client's phone number ;
- `birthDate` : Character varying (120),  client's birth date ;
- `nationality` : Character varying (120), client's nationality;
- fkRoom : Integer, room reserved by client reference
```

### :seat: Setup

1. :envelope_with_arrow: **Clone the project**
2. :heavy_plus_sign: Adding **.env** :

```
PORT=3000
BASE_URL=http://localhost:3000
DATABASE_TYPE=postgres
DATABASE_HOST=127.0.0.1
DATABASE_NAME=nestor
DATABASE_USER=postgres
DATABASE_PASSWORD=
DATABASE_PORT=5432
```

3. :signal_strength: **Connect to Swagger UI** at `localhost:3000/api`

### :rocket: Local commands

`npm start run:dev` - to start the project

## :100:Can be improve

1.  It may be interesting to separate the database layer (core) and the web layer (http) -> hexagonal architecture.
    ![image](https://user-images.githubusercontent.com/14876793/208536345-4ff96bc3-2050-4880-9a6b-f274602a22f8.png)
2.  Set up unit tests and non-regression tests
3.  Set up docker in order to be able to deploy the project more easily (including the database in particular).
