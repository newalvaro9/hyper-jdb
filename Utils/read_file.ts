import { readFileSync } from "fs";
import ErrorUJDB from "./ErrorHJDB";

export default function read_file(db_path: string) {
    try {
        const reading = readFileSync(db_path, 'utf-8')
        return JSON.parse(reading)
    } catch (error) {
        throw new ErrorUJDB("Unknow Directory", "No such file or directory when reading file")
    }
}