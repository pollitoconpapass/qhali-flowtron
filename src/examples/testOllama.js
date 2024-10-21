import ollama from 'ollama'

const response = await ollama.chat({
    model: 'llama3.2:1b',
    messages: [{ role: 'user', content: 'Extract and return just the URL from the given text. Return only the URL, do not return any other text. Please analyze this webpage https://www.googleapi.com' }],
    params: {
      temperature: 0.0,
      prompt: '',
      max_tokens: 1
    }
  })
console.log(response.message.content)