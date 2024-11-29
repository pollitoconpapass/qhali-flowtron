import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import  Groq  from 'groq-sdk'

dotenv.config({ path: '/Users/jose/Documents/GitHub/qhali-flowtron/.env' }) // -> replace with your own .env file path here

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

function decodeBase64(imageUploaded){
    const imageBuffer = readFileSync(imageUploaded)
    return imageBuffer.toString('base64')
}

export async function llamaImgClassifier(imageUploaded, query){
    const base64Image = decodeBase64(imageUploaded)

    const chatCompletion = await client.chat.completions.create({
        messages: [
            {
                role: 'user',
                content: [
                    { type: 'text', text: query },
                    {
                        type: 'image_url',
                        image_url: {
                            url: `data:image/jpeg;base64,${base64Image}`,
                        }
                    }
                ]
            }
        ],
        model: 'llama-3.2-11b-vision-preview'
    })

    return chatCompletion.choices[0].message.content
}