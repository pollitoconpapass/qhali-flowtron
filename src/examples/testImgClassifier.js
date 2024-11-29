import { llamaImgClassifier } from "../tools/imgClassifier.js"

const query = "What animal do you see in this image?"
const img = './ai-generated-stray-cat-in-danger-background-animal-background-photo.jpg'

const llamaResponse = await llamaImgClassifier(img, query)
console.log(llamaResponse)
