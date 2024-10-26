import path from "node:path"
import { TextLoader } from "langchain/document_loaders/fs/text"
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx"


export async function fileHandler(fileUploaded) {
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
