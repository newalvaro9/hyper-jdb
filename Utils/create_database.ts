// @ts-check

import { mkdirSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import ErrorUJDB from './ErrorUJDB'

export default function create_database(name: string) {
    if (!require.main?.filename) throw new ErrorUJDB("Folder creation error", "Cannot create folder \"databases\"")

    let directory = join(dirname(require.main.filename), "databases")

    if (!existsSync(`${directory}`)) {
        try {
            mkdirSync(directory)
            if (!existsSync(`${directory}/${name}.json`)) {
                writeFileSync(`${directory}/${name}.json`, JSON.stringify({}, null, 2), { flag: "wx" })
            }
        } catch (err) {
            throw err
        }
    }

    return join(directory, `${name}.json`)
}