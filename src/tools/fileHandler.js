import ollama from "ollama"
import path from "node:path"
import { TextLoader } from "langchain/document_loaders/fs/text"
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx"


async function loadFileContent(fileUploaded) {
    const fileExtension = path.extname(fileUploaded).toLowerCase().slice(1) //fileUploaded.split('.').pop().toLowerCase()
    // console.log(fileExtension)

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

    const prompt = `Eres un asistente que analiza archivos. Se te brindara el texto contenido dentro de un archivo para que puedas responder 
                    la consulta del usuario. Evita responder con no puedo ver el contendio porque siempre se te brinda el archivo.
                    Consulta: ${query}
                    Contenido: ${combinedText}`

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