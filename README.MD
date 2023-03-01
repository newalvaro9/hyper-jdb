# Ultra JSON Database (UltraJDB)
![npm](https://img.shields.io/npm/v/ultrajson-db)
![license](https://img.shields.io/npm/l/ultrajson-db)
![downloads](https://img.shields.io/npm/dt/ultrajson-db)

> An amazing and simple json database

Instalation
-----------
```
npm i ultrajson-db
```

Usage
-------
```js
// Using Node.js `require()`
const ultraJDB = require('ultrajson-db');

// Using ES6 imports
import ultraJDB from 'ultrajson-db';

const database = new ultraJDB("users") // This will create the folder `databases` and the `users.json` file
```

Methods
-----
### set(key, value)

```js
database.set("language", "english")
/*
    {
        "language": "english"
    }
*/

/* You can use dots to specify a new property */
database.set("user1.name", "Álvaro")
/* 
    {
        "user1": {
            "name": "Álvaro"
        }
    }
*/
```

### get(key)

```js
/*
    {
        "user1": {
            "name": "Álvaro",
            "edad": 16
        },
        "user2": {
            "name": "Juan",
            "edad": 20
        }
    }
*/

database.get("user1.name") // "Álvaro"
database.get("user2.edad") // 20
```

### delete(key)

```js
/*
    {
        "user1": {
            "name": "Álvaro",
            "edad": 16,
            "hobbies": ["Gym", "Coding", "Cycling"]
        }
    }
*/

database.delete("user1.hobbies") // Deletes hobbies property

/*
    {
        "user1": {
            "name": "Álvaro",
            "edad": 16
        }
    }
*/
```

### add(key, quantity)

```js
/*
    {
        "user1": {
            "name": "Álvaro",
            "money": 430
        }
    }
*/

database.add("user1.money", 150) // Adds 150 to 430 money property

/*
    {
        "user1": {
            "name": "Álvaro",
            "money": 580
        }
    }
*/
```

### substract(key, quantity)

```js
/*
    {
        "user1": {
            "name": "Álvaro",
            "money": 430
        }
    }
*/

database.add("user1.money", 240) // Substracts 240 from 430 money property

/*
    {
        "user1": {
            "name": "Álvaro",
            "money": 190
        }
    }
*/
```
License
--------

[MIT](https://github.com/newalvaro9/ultrajson-db/blob/main/LICENSE)

Copyright 2023, Álvaro Poblador