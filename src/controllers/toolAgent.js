import ollama from 'ollama'
import { toolDecider } from './toolDecider.js'
import { fileHandler } from '../tools/fileHandler.js'
import { llamaImgClassifier} from '../tools/imgClassifier.js'
import { medScientist } from '../tools/medScientist.js'
import { webAstronaut } from '../tools/webAstronaut.js'

const chatHistory = []

export async function toolAgent(query, fileAppended=null){
    let context = ''
    const decision = await toolDecider(query)

    console.log(`=== Decision: ${decision} ===\n`)

    chatHistory.push({role: 'user', content: query})

    if(decision === "FileHandler"){
        context = await fileHandler(fileAppended)
    }
    else if(decision === "ImgClassifier"){
        // context = await imgClassifier(fileAppended)
        context = await llamaImgClassifier(fileAppended, query)
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

    const finalResponse = await ollama.chat({   
        model: 'llama3.2:1b',
        messages: [{role: 'assistant', content: `You are a helpful AI medical multilingual assistant that 
            will answer the user's query ${query} based on the context provided: ${context} and the chat 
            conversation history: ${chatHistory}. 
            Answer in the same language of the user and use a professional tone in all of your answers`},
                    {role: 'user', content: query}]
    })

    chatHistory.push({role: 'assistant', content: finalResponse})
    return finalResponse.message.content
}