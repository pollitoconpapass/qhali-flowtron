import ollama from 'ollama'

const prompt = `Analyze the user's query carefully and classify it by returning ONLY the appropriate word from the following options: 

- "MedScientist": For questions related to medicine, such as symptoms, conditions, diseases, anatomy, or medical research.
- "WebAstronaut": For queries about webpage analysis, analyzing online articles, or containing an URL.
- "ImgClassifier": For questions about analyzing images or visual content, including identifying objects, body parts, or other visual elements.
- "FileHandler": For queries related to document analysis, such as summarizing, extracting data from, or interpreting content in PDF, TXT, or similar files.

If the query doesn't match any of these categories, return "Unknown".

You are **not responsible for answering the query itself** or analyzing the content; your task is to classify it. Always respond with just one word from the options above, and nothing else.

Examples:
- "What are the symptoms of anemia?" -> "MedScientist"
- "Analyze this webpage: https://flowise.ai" -> "WebAstronaut"
- "What part of the body do you identify from this image?" -> "ImgClassifier"
- "Summarize the content of this PDF." -> "FileHandler"
- "Who invented the car?" -> "Unknown"

Always return just the one word that applies. No explanations, clarifications, or additional text.

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