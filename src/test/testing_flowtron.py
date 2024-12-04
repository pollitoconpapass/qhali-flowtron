import requests
import json

URL = "http://localhost:8080/flowtron"

def ask_qhali(query):
    payload_json = json.dumps({
        "query": query
    })

    try:
        response = requests.post(
            URL, 
            data=payload_json,  # JSON payload
            stream=True,
            headers={
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            }
        )
        
        if response.status_code != 200:
            print(f"Error: {response.text}")
            return
        
        for chunk in response.iter_content(chunk_size=None, decode_unicode=True):
            if chunk:
                print(chunk, end='', flush=True)

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")


if __name__ == "__main__":
    ask_qhali("Cuales son los sintomas de la tuberculosis")