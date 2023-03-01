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
        const obj = {
            [key]: value
        }
        try {
            writeFileSync(this.path_database, JSON.stringify(obj, null, 2), {
                flag: "w+",
                encoding: 'utf-8'
            })
        } catch (err) {
            throw err
        }
    }
}

export = ultraJDB