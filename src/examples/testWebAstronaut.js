import { webAstronaut } from "../tools/webAstronaut.js"

const query = "De que trata este articulo? https://www.hindustantimes.com/lifestyle/health/avoiding-medication-overload-the-risks-of-taking-multiple-prescriptions-and-tips-for-safe-and-effective-deprescribing-101721723253692.html"
const response = await webAstronaut(query)
console.log(response)