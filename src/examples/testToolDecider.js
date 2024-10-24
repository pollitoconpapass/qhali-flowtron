import { toolDecider } from "../controllers/toolDecider.js"

const query = "Que ves en esta imagen?"
const response = await toolDecider(query)
console.log(response)