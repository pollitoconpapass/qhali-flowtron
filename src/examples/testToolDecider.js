import { toolDecider } from "../functions/toolDecider.js"

const query = "what is this article about? https://www.npmjs.com/package/ollama"
const response = await toolDecider(query)
console.log(response)