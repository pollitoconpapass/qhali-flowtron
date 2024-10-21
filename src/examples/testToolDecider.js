import { toolDecider } from "../controllers/toolDecider.js"

const query = "What are the symptoms of anemia?"
const response = await toolDecider(query)
console.log(response)