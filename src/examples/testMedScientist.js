import { medScientist } from "../tools/medScientist.js"

const query = "Que determina un infarto pulmonar?"
const response = await medScientist(query)
console.log(response)