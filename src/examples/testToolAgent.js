import { toolAgent } from "../controllers/toolAgent.js"

// const query = `What is this webpage about? 
// https://www.hindustantimes.com/lifestyle/health/avoiding-medication-overload-the-risks-of-taking-multiple-prescriptions-and-tips-for-safe-and-effective-deprescribing-101721723253692.html`

// const response = await toolAgent(query)
// console.log(response)


const fileQuery = "Can you summarize the content of this file?"
const pdfPath = "./sample.txt"
const pdfResponse = await toolAgent(fileQuery, pdfPath)

console.log(pdfResponse)