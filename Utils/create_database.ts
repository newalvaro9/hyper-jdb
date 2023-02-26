// @ts-check

import { mkdirp } from 'mkdirp'
import { join, dirname } from 'path'
import { writeFile, existsSync } from 'fs'
import ErrorUJDB from '../Errors/ErrorUJDB'

export default function create_database(name: string) {
    if (!require.main?.filename) throw new ErrorUJDB("Folder creation error", "Cannot create folder \"databases\"")

    let directory = join(dirname(require.main.filename), "databases")

    mkdirp(directory).then(made => {
        if (existsSync(`${directory}/${name}.json`)) return
        writeFile(`${directory}/${name}.json`, JSON.stringify({}, null, 2), { flag: "wx" }, function (err) {
            if (err) throw err
        });
    })

    return {
        path_folder: directory,
        path_database: join(directory, `${name}.json`)
    }
}