import ollama from 'ollama'

const prompt = `You will receive a query and will return a specific word based on your analysis. 
Follow these requirements strictly:

- If the user's query is related to medicine topics like symptoms of a given condition, effects of a condition, then return "MedScientist" only.
- If the user's query is related to webpage analysis, given a URL or a question about a previous analysis of a webpage, return "WebAstronaut" only.
- If the user's query is about the analysis of an image or a question related to a previous image analysis, return "ImgClassifier" only.
- If the user's query is about the analysis of a PDF or TXT document or a question related to a previous file analysis, return "FileHandler" only.

In all other cases, return "Unknown" only, without answering the query.

Examples:
- What are the symptoms of anemia? -> "MedScientist"
- What is this article about? https://flowise.ai -> "WebAstronaut"
- What can you identify from this image? -> "ImgClassifier"
- Make a little summary about this file -> "FileHandler"

Make sure to return only the specified word for each case.`

export async function toolDecider(query){
    const decision = await ollama.chat({
        model: 'llama3.2:1b',
        params: {
            prompt: prompt,
            temperature: 0.0
        },
        messages: [{role: 'assistant', content: prompt},
                    {role: 'user', content: query}]
    })

    return decision.message.content
}