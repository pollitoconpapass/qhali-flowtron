# Qhali FlowTron API

Mirror project of the Flowise Chatflow: Qhali FlowTron built with JavaScript code instead.

## About
Qhali FlowTron is intended to be a medical assistant chatbot that contains different tools useful for healthcare practicioners. 
This whole process is built using [Flowise](https://flowiseai.com/), a Low-Code drag&drop tool useful to build LLMs easily and fast.


Now, the intention of this project is to replicate its functionality with actual code. The expected result will be an API that can be used in different chatbot programs as the backend.

## Coding Tools

### Libraries
- `ExpressJS` for bulding the API route
- `LangChain` for using LLMs, embeddings
- `Ollama` for implementing the LLM chat

### LLM and ML related tools
- `LLAMA-3.2` as the LLM
- `LLaVA: Large Language and Vision Assistant` as the vision model to analyze images
- `nomic-embed-text` as the embedding model


### Other Programs
- `Postman` to test the API
- `Ollama Desktop` to pull and use the LLMs locally
- `Pinecone` as the Vectorized DataBase to store the medical related docs and file analysis embeddings

## Source Folder Structure

    src
    |_ examples
        |_ testOllama.js
        |_ testToolAgent.js
    |_ functions
        |_ toolAgent.js
        |_ toolDecider.js
    |_ tools
        |_ fileHandler.js
        |_ imgClassifier.js
        |_ medScientist.js
        |_ webAstronaut.js
    |_app.js