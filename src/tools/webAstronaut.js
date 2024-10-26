import  ollama  from 'ollama'
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio"


async function extractURL(text) {
    const extractedURL = await ollama.chat({
        model: 'llama3.2:1b',
        messages: [{ role: 'user', content: `Extract and return the complete URL from the given text. Return only the URL, do not return any other text: ${text}` }],
        params: {
          temperature: 0.0,
          max_tokens: 1
        }
    })

    return extractedURL.message.content
}

export async function webAstronaut(query){
    const url = await extractURL(query)

    const loader = new CheerioWebBaseLoader(url,
        {
            selector: 'p',
        }
    )
    const docs = await loader.load()
    const combinedText = docs.map(doc => doc.pageContent).join('\n')

    return combinedText
}