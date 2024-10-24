import ollama from 'ollama'

const prompt = `Analyze the user's query carefully and return ONLY the appropriate word from the following options: 

- "MedScientist": If the query is related to medicine topics (e.g., symptoms, conditions).
- "WebAstronaut": If the query is related to webpage analysis or mentions URLs.
- "ImgClassifier": If the query is about image analysis or references previous images.
- "FileHandler": If the query is about analyzing PDF/TXT files or previous file analysis.

If the query doesn't match any category, return "Unknown". 
Always respond with only the one word that applies. No explanations, clarifications, or additional text.

Examples:
- "What are the symptoms of anemia?" -> "MedScientist"
- "What is this article about? https://flowise.ai" or if a URL is present in the query -> "WebAstronaut"
- "What can you identify from this image? or Que ves en la imagen?" -> "ImgClassifier"
- "Make a little summary about this file. or De que trata este archivo?" -> "FileHandler"
- "Who invented the car?" -> "Unknown"

Return just the one word that applies. Just ONE word. Do not return any other text.
`

export async function toolDecider(query){
    const decision = await ollama.chat({
        model: 'llama3.2:1b',
        params: {
            temperature: 0.0,
            max_tokens: 1
        },
        messages: [{role: 'user', content: `${prompt}: ${query}`}]
    })

    return decision.message.content.trim()
}