import express from 'express'
import multer from 'multer'
import dotenv from 'dotenv'
import path from 'node:path'
import { toolAgent } from './controllers/toolAgent.js'

dotenv.config({ path: '/Users/jose/Documents/GitHub/qhali-flowtron/.env' })  // -> replace with your own .env file path here

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const name = path.basename(file.originalname, ext)
        cb(null, `${name}-${Date.now()}${ext}`)
    }
})

const upload = multer( { storage } )
const app = express()

app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) =>{
    res.send("Hello World")
})

app.post('/flowtron', upload.single('file'), async (req, res) =>{
    try {
        const query = req.body.query
        const fileAppended = req.file ? req.file.path : null

        if(!query){
            return res.status(400).send( { error: 'Query is required'})
        }

        const answer = await toolAgent(query, fileAppended)
        res.status(200).send({ answer })
    } catch (error) {
        console.error('Error in /flowtron:', error)
        res.status(500).send({ error: 'Internal Server Error' })
    }
})


const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})