// @ts-check

import ErrorUJDB from "./Errors/ErrorUJDB"
import create_database from "./Utils/create_database"
import { writeFileSync } from "fs"
import read_file from "./Utils/read_file"

let databasesObj: any = {}

class ultraJDB {
    path_folder: string
    path_database: string

    constructor(public name: string) {
        if (!name) throw new ErrorUJDB("Invalid Value", "You must provide a name to your database")
        const data = create_database(name)
        this.name = name;
        this.path_folder = data.path_folder;
        this.path_database = data.path_database
    }

    set(key: string, value: any) {
        if (!key) throw new ErrorUJDB("Invalid Value", "You must provide a key to store the value");
        if (!value && value != 0) throw new ErrorUJDB("Invalid Value", "You must provide a value to be stored");

        let response = read_file(this.path_database);
        databasesObj[this.name] = response;

        let jsonRoute: Array<string> = key.split(".")
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

    get(key: string) {
        if (!key) throw new ErrorUJDB("Invalid Value", "You must provide a key to be searched in the database");
        
        let response = read_file(this.path_database);
        databasesObj[this.name] = response;

        let jsonRoute: Array<string> = key.split(".")
        let jsonObject: any = databasesObj[this.name];

        for (const prop of jsonRoute) {
            jsonObject = jsonObject[prop];
        }

        return jsonObject
    }

    delete(key: string) {
        if (!key) throw new ErrorUJDB("Invalid Value", "You must provide a key to be searched in the database");

        let response = read_file(this.path_database);
        databasesObj[this.name] = response;

        let jsonRoute: Array<string> = key.split(".")
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
}

export = ultraJDB