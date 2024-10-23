import { fileHandler } from "../tools/fileHandler.js"

const query = "Make a little summary about this file"
const file = "./sample.pdf"

const answer = await fileHandler(query, file)
console.log(answer)
