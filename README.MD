# Hyper JSON Database (HyperJDB)
![version](https://img.shields.io/npm/v/hyper-jdb)
![license](https://img.shields.io/npm/l/hyper-jdb)
![downloads](https://img.shields.io/npm/dt/hyper-jdb)

> An amazing and simple json database

Instalation
-----------
```
npm i hyper-jdb
```

Table of contents
------------------
* [Usage](#usage)
* [Methods](#methods)
    * [set](#setkey-value)
    * [get](#getkey)
    * [has](#haskey)
    * [delete](#deletekey)
    * [push](#pushkey-value)
    * [add](#addkey-quantity)
    * [substract](#substractkey-quantity)
    * [drop](#drop)
* [Help](#help)
* [License](#license)

Usage
-------
```js
// Using Node.js `require()`
const hyperJDB = require('hyper-jdb');

// Using ES6 imports
import hyperJDB from 'hyper-jdb';

const database = new hyperJDB("users") // This will create the folder `databases` and the `users.json` file
```

Methods
-----
### set(key, value)
Sets a value into the database.

```js
database.set("language", "english")
/*
    {
        "language": "english"
    }
*/

// You can use dots to specify a new property 
database.set("user1.name", "Álvaro")

/* 
    {
        "language": "english",
        "user1": {
            "name": "Álvaro"
        }
    }
*/
```

### get(key)
Gets an existing key from the database. <br>
Returns the `value` of the given `key`.

```js
/*
    {
        "user1": {
            "name": "Álvaro",
            "age": 16
        },
        "user2": {
            "name": "Juan",
            "age": 20
        }
    }
*/

database.get("user1.name") // "Álvaro"
database.get("user2.age") // 20
```

### has(key)
Searches the given key. <br>
Returns `true` if it exists or `false` if not.

```js
/*
    {
        "user1": {
            "name": "newalvaro9",
            "hobbies": ["Gym", "Coding]
        }
    }
*/

database.has("user1.hobbies") // true
database.has("user1.age") // false
```

### delete(key)
Deletes an existing key from the database.

```js
/*
    {
        "user1": {
            "name": "Álvaro",
            "age": 16,
            "hobbies": ["Gym", "Coding", "Cycling"]
        }
    }
*/

database.delete("user1.hobbies[1]") // Deletes Coding property as it is hobbies[1]

/*
    {
        "user1": {
            "name": "Álvaro",
            "age": 16,
            "hobbies": ["Gym", "Cycling"]
        }
    }
*/
```

### push(key, value)
Pushes to the given array a new value. <br>
Returns the updated `array`.

```js
/*
    {
        "user1": {
            "name": "Álvaro",
            "age": 16,
            "hobbies": ["Gym", "Coding", "Cycling"]
        }
    }
*/

database.push("user1.hobbies", "Climbing")

/*
    {
        "user1": {
            "name": "Álvaro",
            "age": 16,
            "hobbies": ["Gym", "Coding", "Cycling", "Climbing"]
        }
    }
*/
```

### add(key, quantity)
Adds to the given key the quantity provided (must be a `Number`). <br>
Returns the updated `key` value.
```js
/*
    {
        "user1": {
            "name": "Álvaro",
            "money": 430
        }
    }
*/

// Adds 150 to 430 money property
database.add("user1.money", 150) // 580

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
Substracts from the given key the quantity provided (must be a `Number`). <br>
Returns the updated `key` value.

```js
/*
    {
        "user1": {
            "name": "Álvaro",
            "money": 430
        }
    }
*/
// Substracts 240 from 430 money 
database.add("user1.money", 240) // 190

/*
    {
        "user1": {
            "name": "Álvaro",
            "money": 190
        }
    }
*/
```

### drop()
Clears **all** the data in the .json file
```js
database.drop() // Clears the database 
```

Help
------
Have any doubts or suggestions?<br>
Send me a private message on Discord: **@newalvaro9**

License
--------

[MIT](https://github.com/newalvaro9/hyper-jdb/blob/main/LICENSE)

Copyright 2023, Álvaro Poblador
