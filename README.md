# Getting Started with node server App

This is a node.js & express server

## Installation

Download or clone the project from this repo

### Download the node_modules

Enter the following command in the cmd / terminal in the root folder of this project

```
npm i
```

### Run the typescript compiler

Run the Typescript compiler using the following command in the cmd

```
tsc -w
```

### Run the server in development mode

Open another cmd / terminal in the root folder and run the server in development mode using the following command in the cmd

```
npm run dev
```

- Runs the app with nodemon
- The page will reload if you make edits
- You should see the following text in the cmd / terminal
  [nodemon] starting `node .`
  listening on port 3000
  connected to Postgres
  Data initial successfully
  connected to mongoDB

## Available Routes

Here you can find API addresses that the server will respond to as well as what should be sent to them in the body of the HTTP request and what permissions are required to receive a response from a specific API

### Users API

#### API for Register a new user

```http
  POST /api/users/signup
```

#### Request

In the request body you will need to provide an object with the following keys and values

| index    | type   | remark   |
| -------- | ------ | -------- |
| email    | string | required |
| password | string | required |

- "password" must be at least eight characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&\*-
- "email" must be a standard email

#### Response

Example of a response from this end point

```
{
    "email": "test@gmail.com",
    "password": "$2a$10$jhs6h3m8vqVUa2wVze7C1O98ZnKLWvTgzAzHgjsA/TjhjWDIZfHYe",
    "_id": "12ddd310-5005-11ee-98a5-6b460fe7b768"
}
```

#### API for Login a user

```http
  POST /api/users/signin
```

#### Request

In the request body you will need to provide an object with the following keys and values

| index    | type   | remark   |
| -------- | ------ | -------- |
| email    | string | required |
| password | string | required |

- "email" must be a standard email
- "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&\*-

#### Response

If the user is in the database and the password sent is correct, The response will be a the following string with status code 201

```
You are logged in!
```

### shop inventory API (External Api)

#### API to get product by id

```http
  POST /api/shop_inventory/:id
```

#### Response

{
id: string;
name: string;
salePrice: number;
quantity : number;
description : string;
category: string;
discountPercentage : number;
imageUrl:string;
imageAlt: string;
}

#### API to get product by search

```http
  POST /api/shop_inventory?searchText=<text to search>
```

#### Response

product that match to the search in the name, category, or description.

#### API to subtruct quantity from products

```http
  POST /api/shop_inventory/updateInventory
```

#### Request

An array of object, in each object there is the productId and the quntity to subtruct

##### Example:

[
{
"productId": "2",
"requiredQuantity": 1
},
{
"productId": "3",
"requiredQuantity": 133
}
]

#### Response

##### Success

code 200

##### Error

if one of the the id's wrong return an object with the id and the cause

if there is not enough quantity the DB will not update and the response contain an array of object with the productId, in Inventory Quantity, and the amount that requested.

##### Response Example

[
{
"productId": "3",
"requestQuantity": 133,
"inInventory": 0
}
]

#### API to add quantity to products

```http
  POST /api/shop_inventory/cancelOrder
```

#### Request

An array of object, in each object there is the productId and the quantity to add

##### Example:

[
{
"productId": "2",
"requiredQuantity": 1
},
{
"productId": "3",
"requiredQuantity": 133
}
]

#### Response

code 200

##### Error

if one of the the id's wrong return an object with the id and the cause
