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

export async function medScientist(query){
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

    return pineconeContext
}
