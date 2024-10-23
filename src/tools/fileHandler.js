import ollama from "ollama"
import { TextLoader } from "langchain/document_loaders/fs/text"
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx"


async function loadFileContent(fileUploaded) {
    const fileExtension = fileUploaded.split('.').pop().toLowerCase()

    let docs 
    if (fileExtension === 'pdf') {
        const pdfLoader = new PDFLoader(fileUploaded, { parsedItemSeparator: "" }) 
            docs = await pdfLoader.load() 
    }
    else if (fileExtension === 'docx') {
        const docxLoader = new DocxLoader(fileUploaded) 
        docs = await docxLoader.load() 
    }
    else if (fileExtension === 'txt') {
        const txtLoader = new TextLoader(fileUploaded) 
        docs = await txtLoader.load()
    } else {
        throw new Error(`Unsupported file type: ${fileExtension}
                        Supported file types: .pdf, .docx, .txt`) 
    }

    return docs.map(doc => doc.pageContent).join('\n') 
}

export async function fileHandler(query, fileUploaded){
    const combinedText = await loadFileContent(fileUploaded)

    const prompt = `You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. 
                    If you don't know the answer, just say that you don't know.
                    Question: ${query}
                    Context: ${combinedText}`

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