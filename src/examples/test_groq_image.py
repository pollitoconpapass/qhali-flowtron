import os
import base64
from groq import Groq
from dotenv import load_dotenv

load_dotenv("../../.env")

# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

# Function to ask the Llama-3.2-11b-vision-preview
def ask_llama_vision(question: str, image_path: str) -> str:
    base64_image = encode_image(image_path)

    client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": question},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}",
                        },
                    },
                ],
            }
        ],
        model="llama-3.2-11b-vision-preview",
    )

    return chat_completion.choices[0].message.content


# === MAIN ===
image_path = "./ai-generated-stray-cat-in-danger-background-animal-background-photo.jpg"
question = "What can you identify from this image?"
response = ask_llama_vision(question, image_path)
print(response)