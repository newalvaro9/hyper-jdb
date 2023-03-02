// @ts-check

import ErrorUJDB from "./Errors/ErrorUJDB"
import create_database from "./Utils/create_database"
import { writeFileSync } from "fs"
import read_file from "./Utils/read_file"

let databasesObj: any = {}

class ultraJDB {
    path_folder: string
    path_database: string
    /**
     * @constructor Creates a database
     * @param {string} name The name of your database
     */
    constructor(public name: string) {
        if (!name) throw new ErrorUJDB("Missing argument", "You must provide a name to your database")
        const data = create_database(name)
        this.name = name;
        this.path_folder = data.path_folder;
        this.path_database = data.path_database
    }

    /**
     * 
     * @param {string} key JSON key to store data
     * @param {any} value The value to be stored
     * @returns {true}
     */
    set(key: string, value: any): true {
        if (!key) throw new ErrorUJDB("Missing argument", "You must provide a key to store the value");
        if (!value && value != 0) throw new ErrorUJDB("Missing argument", "You must provide a value to be stored in the database");

        let response = read_file(this.path_database);
        databasesObj[this.name] = response;

        let jsonRoute: Array<string> = key.replace(/\[/g, ".").replace(/\]/g, "").split(".")
        let jsonObject: any = databasesObj[this.name];

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
            writeFileSync(this.path_database, JSON.stringify(databasesObj[this.name], null, 2), 'utf-8')
        } catch (err) {
            throw new ErrorUJDB("Writing error", "There was an error updating your database")
        }

        return true
    }

    /**
     * 
     * @param {string} key JSON key to be searched
     * @returns {any} The stored value
     */
    get(key: string): any {
        if (!key) throw new ErrorUJDB("Missing argument", "You must provide a key to be searched in the database");

        let response = read_file(this.path_database);
        databasesObj[this.name] = response;

        let jsonRoute: Array<string> = key.replace(/\[/g, ".").replace(/\]/g, "").split(".")
        let jsonObject: any = databasesObj[this.name];

        for (const prop of jsonRoute) {
            jsonObject = jsonObject[prop];
        }

        return jsonObject
    }

    /**
     * 
     * @param {string} key JSON key to search and delete
     * @returns {true}
     */
    delete(key: string): true {
        if (!key) throw new ErrorUJDB("Missing argument", "You must provide a key to be deleted from the database");

        let response = read_file(this.path_database);
        databasesObj[this.name] = response;

        let jsonRoute: Array<string> = key.replace(/\[/g, ".").replace(/\]/g, "").split(".")
        let jsonObject: any = databasesObj[this.name];

        for (const prop of jsonRoute) {
            if (prop == jsonRoute.slice(-1)[0]) { /* Last iteration of the loop */
                delete jsonObject[prop]
            }
            jsonObject = jsonObject[prop];
        }

        try {
            writeFileSync(this.path_database, JSON.stringify(databasesObj[this.name], null, 2), 'utf-8')
        } catch (err) {
            throw new ErrorUJDB("Writing error", "There was an error updating your database")
        }

        return true
    }

    /**
     * 
     * @param {string} key JSON key to be searched
     * @param {number} quantity Amount to be added
     * @returns {number} Updated value
     */
    add(key: string, quantity: number): number {
        if (!key) throw new ErrorUJDB("Missing argument", "You must provide a key to be operated in the database");
        if (!quantity) throw new ErrorUJDB("Missing argument", `You must provide a number to be added to \`${key}\``)
        if (isNaN(quantity)) throw new ErrorUJDB("Invalid value", "The `quantity` parameter must be a number")

        let response = read_file(this.path_database);
        databasesObj[this.name] = response;

        let jsonRoute: Array<string> = key.replace(/\[/g, ".").replace(/\]/g, "").split(".")
        let jsonObject: any = databasesObj[this.name];
        var last: number = 0;
        for (const prop of jsonRoute) {
            if (prop == jsonRoute.slice(-1)[0]) { /* Last iteration of the loop */
                if (isNaN(jsonObject[prop])) throw new ErrorUJDB("Invalid type", `Stored value: \`${jsonObject[prop]}\` is not a number`)
                jsonObject[prop] = jsonObject[prop] + quantity
                last = jsonObject[prop]
            }
            jsonObject = jsonObject[prop];
        }

        try {
            writeFileSync(this.path_database, JSON.stringify(databasesObj[this.name], null, 2), 'utf-8')
        } catch (err) {
            throw new ErrorUJDB("Writing error", "There was an error updating your database")
        }

        return last
    }

    /**
     * 
     * @param {string} key JSON key to be searched
     * @param {number} quantity Amount to be substracted
     * @returns {number} Updated value
     */
    substract(key: string, quantity: number): number {
        if (!key) throw new ErrorUJDB("Missing argument", "You must provide a key to be operated in the database");
        if (!quantity) throw new ErrorUJDB("Missing argument", `You must provide a number to be substracted from \`${key}\``)
        if (isNaN(quantity)) throw new ErrorUJDB("Invalid value", "The `quantity` parameter must be a number")

        let response = read_file(this.path_database);
        databasesObj[this.name] = response;

        let jsonRoute: Array<string> = key.replace(/\[/g, ".").replace(/\]/g, "").split(".")
        let jsonObject: any = databasesObj[this.name];
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
            writeFileSync(this.path_database, JSON.stringify(databasesObj[this.name], null, 2), 'utf-8')
        } catch (err) {
            throw new ErrorUJDB("Writing error", "There was an error updating your database")
        }

        return last
    }

    /**
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