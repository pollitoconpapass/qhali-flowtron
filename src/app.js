import express from 'express'
import { toolAgent } from './controllers/toolAgent'

export const app = express()

app.get('/', (req, res) =>{
    res.send("Hello World")
})

app.post('/flowtron', (req, res) =>{
    const query = req.query
    const fileAppended = req.fileAppended

    const answer = toolAgent(query, fileAppended)
    res.send(answer)
})


app.listen(8080)
console.log('Server listening on port 8080...')