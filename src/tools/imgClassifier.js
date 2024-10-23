import dotenv from 'dotenv'
import ollama from 'ollama'
import { readFileSync } from 'fs'
import { HfInference } from '@huggingface/inference'

dotenv.config({ path: '../../.env' })

const hfToken = process.env.HF_TOKEN
const hf = new HfInference(hfToken)

export async function imgClassifier(query, imageUploaded){
    const context = await hf.imageToText({
        data: readFileSync(imageUploaded),
        model: 'nlpconnect/vit-gpt2-image-captioning'
    })

    const prompt = `You are an assistant for question-answering tasks. Use the following pieces of context to answer the user's question about images. 
                    The context is a previous analysis of the image. You can guide from there to generate a more complete answer.
                    Question: ${query}
                    Context: ${context.generated_text}`

    const response = await ollama.chat({
        model: 'llama3.2:1b',
        params: {
            prompt: prompt,
            temperature: 0.9
        },
        messages: [{role: 'system', content: prompt}, {role: 'user', content: query}]
    })

    return response.message.content
}