// @ts-check

import ErrorUJDB from "./Errors/ErrorUJDB"
import create_database from "./Utils/create_database"
import { writeFile, writeFileSync } from "fs"


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
}

export = ultraJDB