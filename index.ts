// @ts-check

import ErrorUJDB from "./Utils/ErrorUJDB"
import create_database from "./Utils/create_database"
import { writeFileSync } from "fs"
import read_file from "./Utils/read_file"
import is_empty from "./Utils/is_empty"


class ultraJDB {
    name: string
    path_folder: string
    path_database: string
    databasesObj: any
    /**
     * @constructor Creates a database
     * @param {string} name The name of your database
     */
    constructor(name: string) {
        if (is_empty(name)) throw new ErrorUJDB("Missing argument", "You must provide a name to your database")
        const data = create_database(name)
        this.name = name;
        this.path_folder = data.path_folder;
        this.path_database = data.path_database;
        this.databasesObj = {}
    }

    /**
     * Sets a value into the database
     * @param {string} key JSON key to store data
     * @param {any} value The value to be stored
     * @returns {true}
     */
    set(key: string, value: any): true {
        if (is_empty(key)) throw new ErrorUJDB("Missing argument", "You must provide a key to store the value");
        if (!value && value != 0) throw new ErrorUJDB("Missing argument", "You must provide a value to be stored in the database");

        let response = read_file(this.path_database);
        this.databasesObj[this.name] = response;

        let jsonRoute: Array<string> = key.replace(/\[/g, ".").replace(/\]/g, "").split(".")
        let jsonObject: any = this.databasesObj[this.name];

        for (let i = 0; i < jsonRoute.length; i++) {
            const prop = jsonRoute[i];
            if (i === jsonRoute.length - 1) { /* Last iteration of the loop */
                jsonObject[prop] = value /* Set given value */
            } else {
                jsonObject[prop] = jsonObject[prop] || {}; /* Initialize sub-object if it doesn't exist */
            }
            jsonObject = jsonObject[prop];
        }

        try {
            writeFileSync(this.path_database, JSON.stringify(this.databasesObj[this.name], null, 2), 'utf-8')
        } catch (err) {
            throw new ErrorUJDB("Writing error", "There was an error updating your database")
        }

        return true
    }

    /**
     * Gets an existing key from the database.
     * @param {string} key JSON key to be searched
     * @returns {any} The stored value
     */
    get(key: string): any {
        if (is_empty(key)) throw new ErrorUJDB("Missing argument", "You must provide a key to be searched in the database");

        let response = read_file(this.path_database);
        this.databasesObj[this.name] = response;

        let jsonRoute: Array<string> = key.replace(/\[/g, ".").replace(/\]/g, "").split(".")
        let jsonObject: any = this.databasesObj[this.name];

        for (const prop of jsonRoute) {
            jsonObject = jsonObject[prop];
        }

        return jsonObject
    }

    /**
     * Deletes an existing key from the database.
     * @param {string} key JSON key to search and delete
     * @returns {true}
     */
    delete(key: string): boolean {
        if (is_empty(key)) throw new ErrorUJDB("Missing argument", "You must provide a key to be deleted from the database");

        let response = read_file(this.path_database);
        this.databasesObj[this.name] = response;

        let jsonRoute: Array<string> = key.replace(/\[/g, ".").replace(/\]/g, "").split(".")
        let jsonObject: any = this.databasesObj[this.name];

        for (const prop of jsonRoute) {
            if (prop == jsonRoute.slice(-1)[0]) { /* Last iteration of the loop */
                if (Object.prototype.toString.call(jsonObject) == '[object Array]') { /* Array */
                    jsonObject = jsonObject.splice(prop, 1)
                }
                else if (!jsonObject[prop] && jsonObject[prop] != 0) { /* No value */
                    return false
                }
                else { /* Value */
                    delete jsonObject[prop]
                }
            }
            jsonObject = jsonObject[prop];
        }

        try {
            writeFileSync(this.path_database, JSON.stringify(this.databasesObj[this.name], null, 2), 'utf-8')
        } catch (err) {
            throw new ErrorUJDB("Writing error", "There was an error updating your database")
        }

        return true
    }

    /**
     * Searches the given key.
     * @param {string} key The key to be searched
     * @returns {boolean} True if found, false if not
     */

    has(key: string): boolean {
        if (is_empty(key)) throw new ErrorUJDB("Missing argument", "You must provide a key to be searched in the database");

        let response = read_file(this.path_database);
        this.databasesObj[this.name] = response;

        let jsonRoute: Array<string> = key.replace(/\[/g, ".").replace(/\]/g, "").split(".")
        let jsonObject: any = this.databasesObj[this.name];
        var last: boolean = false;

        for (const prop of jsonRoute) {
            if (prop == jsonRoute.slice(-1)[0]) { /* Last iteration of the loop */
                if (!jsonObject[prop] && jsonObject[prop] != 0) {
                    last = false
                } else {
                    last = true
                }
            }
            jsonObject = jsonObject[prop];
        }
        return last
    }

    /**
     * Pushes to the given array a new value.
     * @param {string} key 
     * @param {any} value 
     * @returns The new array 
     */

    push(key: string, value: any): any {
        if (is_empty(key)) throw new ErrorUJDB("Missing argument", "You must provide a key to be searched in the database");
        if (!value && value != 0) throw new ErrorUJDB("Missing argument", "You must provide a value to be stored in the database");

        let response = read_file(this.path_database);
        this.databasesObj[this.name] = response;

        let jsonRoute: Array<string> = key.replace(/\[/g, ".").replace(/\]/g, "").split(".")
        let jsonObject: any = this.databasesObj[this.name];
        var last: Array<any> = []

        for (const prop of jsonRoute) {
            if (prop == jsonRoute.slice(-1)[0]) { /* Last iteration of the loop */
                if (!(Object.prototype.toString.call(jsonObject[prop]) == '[object Array]')) throw new ErrorUJDB("Invalid type", `Stored value: \`${jsonObject[prop]}\` is not an Array`)
                jsonObject[prop].push(value)
                last = jsonObject[prop]
            }
            jsonObject = jsonObject[prop];
        }

        try {
            writeFileSync(this.path_database, JSON.stringify(this.databasesObj[this.name], null, 2), 'utf-8')
        } catch (err) {
            throw new ErrorUJDB("Writing error", "There was an error updating your database")
        }

        return last
    }

    /**
     * Adds to the given key the quantity provided
     * @param {string} key JSON key to be searched
     * @param {number} quantity Amount to be added
     * @returns {number} Updated value
     */
    add(key: string, quantity: number): number {
        if (is_empty(key)) throw new ErrorUJDB("Missing argument", "You must provide a key to be operated in the database");
        if (!quantity) throw new ErrorUJDB("Missing argument", `You must provide a number to be added to \`${key}\``)
        if (isNaN(quantity)) throw new ErrorUJDB("Invalid value", "The `quantity` parameter must be a number")

        let response = read_file(this.path_database);
        this.databasesObj[this.name] = response;

        let jsonRoute: Array<string> = key.replace(/\[/g, ".").replace(/\]/g, "").split(".")
        let jsonObject: any = this.databasesObj[this.name];
        var last: number = 0;
        for (const prop of jsonRoute) {
            if (prop == jsonRoute.slice(-1)[0]) { /* Last iteration of the loop */
                if (isNaN(jsonObject[prop])) throw new ErrorUJDB("Invalid type", `Stored value: \`${jsonObject[prop]}\` is not a Number`)
                jsonObject[prop] = jsonObject[prop] + quantity
                last = jsonObject[prop]
            }
            jsonObject = jsonObject[prop];
        }

        try {
            writeFileSync(this.path_database, JSON.stringify(this.databasesObj[this.name], null, 2), 'utf-8')
        } catch (err) {
            throw new ErrorUJDB("Writing error", "There was an error updating your database")
        }

        return last
    }

    /**
     * Substracts from the given key the quantity provided
     * @param {string} key JSON key to be searched
     * @param {number} quantity Amount to be substracted
     * @returns {number} Updated value
     */
    substract(key: string, quantity: number): number {
        if (is_empty(key)) throw new ErrorUJDB("Missing argument", "You must provide a key to be operated in the database");
        if (!quantity) throw new ErrorUJDB("Missing argument", `You must provide a number to be substracted from \`${key}\``)
        if (isNaN(quantity)) throw new ErrorUJDB("Invalid value", "The `quantity` parameter must be a number")

        let response = read_file(this.path_database);
        this.databasesObj[this.name] = response;

        let jsonRoute: Array<string> = key.replace(/\[/g, ".").replace(/\]/g, "").split(".")
        let jsonObject: any = this.databasesObj[this.name];
        var last: number = 0;

        for (const prop of jsonRoute) {
            if (prop == jsonRoute.slice(-1)[0]) { /* Last iteration of the loop */
                if (isNaN(jsonObject[prop])) throw new ErrorUJDB("Invalid type", `Stored value: \`${jsonObject[prop]}\` is not a number`)
                jsonObject[prop] = jsonObject[prop] - quantity
                last = jsonObject[prop]
            }
            jsonObject = jsonObject[prop];
        }

        try {
            writeFileSync(this.path_database, JSON.stringify(this.databasesObj[this.name], null, 2), 'utf-8')
        } catch (err) {
            throw new ErrorUJDB("Writing error", "There was an error updating your database")
        }

        return last
    }

    /**
     * Clears **all** the data in the .json file
     * @returns {true}
     */
    drop(): true {
        try {
            writeFileSync(this.path_database, JSON.stringify({}, null, 2), 'utf-8')
        } catch (err) {
            throw new ErrorUJDB("Writing error", "There was an error updating your database")
        }
        return true
    }
}

export = ultraJDB