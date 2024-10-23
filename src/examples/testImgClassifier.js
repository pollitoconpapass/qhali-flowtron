import { imgClassifier } from "../tools/imgClassifier.js"

const query = "What can you identify from this image?"
const img = './ai-generated-stray-cat-in-danger-background-animal-background-photo.jpg'

const response = await imgClassifier(query, img)
console.log(response)