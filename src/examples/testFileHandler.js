import { fileHandler } from "../tools/fileHandler.js"

const query = "What's this file about?"
const file = "./sample.txt"

const answer = await fileHandler(query, file)
console.log(answer)
