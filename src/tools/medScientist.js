import ollama from 'ollama'
import dotenv from "dotenv"
import { Pinecone } from '@pinecone-database/pinecone'

dotenv.config({ path: '/Users/jose/Documents/GitHub/qhali-flowtron/.env' }) // -> replace with your own .env file path here

const pineconeApiKey = process.env.PINECONE_API_KEY
const pineconeIndexName = process.env.PINECONE_INDEX_NAME

async function generateEmbeddings(text) {
    try {
      const response = await ollama.embed({
        model: 'nomic-embed-text',
        input: text,
      })
  
      if (!response.embeddings) {
        throw new Error('No embeddings found')
      }
      return response.embeddings
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
}

async function extractPineconeContext(query){
    const pineconeClient = new Pinecone({
        apiKey: pineconeApiKey,
    }) 
    const index = pineconeClient.Index(pineconeIndexName)  
    const queryEmbedding = await generateEmbeddings(query)
    const queryResult = await index.query({
        vector: queryEmbedding,
        topK: 5,
        includeValues: true,
        includeMetadata: true,
    }) 
    const pineconeContext = queryResult.matches.map(match => match.metadata.extracted_text)
    // console.log(pineconeContext)
    return pineconeContext
}

export async function medScientist(query){
    try {
        const pineconeContext = await extractPineconeContext(query)
        const prompt = `You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. 
                        If you don't know the answer, just say that you don't know.
                        Question: ${query}
                        Context: ${pineconeContext}`
        const finalResponse = await ollama.chat({
            model: 'llama3.2:1b',
            params: {
                prompt: prompt,
                temperature: 0.9
            },
            messages: [{role: 'system', content: prompt}, {role: 'user', content: query}]
        })

        return finalResponse.message.content
    } catch (error) {
        console.log(error)
    }
}