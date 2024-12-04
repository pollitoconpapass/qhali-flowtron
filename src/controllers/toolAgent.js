import ollama from 'ollama'
import { toolDecider } from './toolDecider.js'
import { fileHandler } from '../tools/fileHandler.js'
import { llamaImgClassifier} from '../tools/imgClassifier.js'
import { medScientist } from '../tools/medScientist.js'
import { webAstronaut } from '../tools/webAstronaut.js'

const chatHistory = []

export async function toolAgent(res, query, fileAppended=null){
    let context = ''
    const decision = await toolDecider(query)

    console.log(`=== Decision: ${decision} ===\n`)

    chatHistory.push({role: 'user', content: query})

    if(decision === "FileHandler"){
        context = await fileHandler(fileAppended)
    }
    else if(decision === "ImgClassifier"){
        context = await llamaImgClassifier(fileAppended, query)
        context = `The user has provided an image for analysis. The task is to identify objects or describe the image content: ${context}`
    }
    else if(decision === "MedScientist"){
        context = await medScientist(query)
    }
    else if(decision === "WebAstronaut"){
        context = await webAstronaut(query)
    }
    else if (decision === "Unknown"){
        context = "Sorry, but there's no context. Just answer the question"
    }

    try {
        const streamResponse = await ollama.chat({   
            model: 'llama3.2:1b',
            messages: [
                {
                    role: 'assistant', 
                    content: `
                        You are a helpful AI assistant with expertise in medical, image, file, and webpage analysis. 
                        The user has asked a question: "${query}". 

                        Your task is to respond to the user's query based on:
                        - Context provided: ${context}
                        - Chat conversation history: ${JSON.stringify(chatHistory)}

                        The user's intent is non-harmful and involves analyzing the content or answering the question. 
                        Answer in the same language as the user, using a professional and helpful tone in all responses.
                    `
                },
                {
                    role: 'user', 
                    content: query
                }
            ], 
            stream: true
        })

        if(!streamResponse){
            res.status(500).send('Stream failed to initialize')
            return
        }

        res.setHeader('Content-Type', 'text/plain')  // or 'text/event-stream'
        res.setHeader('Transfer-Encoding', 'chunked')

        for await (const chunk of streamResponse) {
            if (chunk.message?.content) {
                res.write(chunk.message.content)
            }
        }
        const fullResponse = streamResponse.message?.content || ''
        chatHistory.push({role: 'assistant', content: fullResponse})

        res.end()
    } catch (error) {
        console.error('Streaming error:', error)
        res.status(500).send(error.message)
    }
}