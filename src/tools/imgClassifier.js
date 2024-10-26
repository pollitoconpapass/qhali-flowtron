import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { HfInference } from '@huggingface/inference'

dotenv.config({ path: '/Users/jose/Documents/GitHub/qhali-flowtron/.env' }) // -> replace with your own .env file path here

const hfToken = process.env.HF_TOKEN
const hf = new HfInference(hfToken)

export async function imgClassifier(imageUploaded){
    const context = await hf.imageToText({
        data: readFileSync(imageUploaded),
        model: 'nlpconnect/vit-gpt2-image-captioning'
    })

    return context.generated_text
}