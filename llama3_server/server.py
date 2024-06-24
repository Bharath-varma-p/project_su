import requests
import os

# Set the API key for Ollama
os.environ["OLLAMA_API_KEY"] = "AAAAC3NzaC1lZDI1NTE5AAAAIBhJYv64sy51a2aIRuVaJrK6X8n/UFSdMUHUh0lq2lC0"

# Base URL for the Ollama server
base_url = "http://localhost:11434"

# Function to print raw response
def print_raw_response(response):
    print(f"Status Code: {response.status_code}")
    print("Headers:", response.headers)
    print("Content:", response.text)

# Generate endpoint
generate_endpoint = base_url + "/api/generate"

# Data to send in the request (prompt)
data = {
    "model": "llama3",
    "prompt": "Hello, can you respond?",
    "stream": False
}

headers = {
    "Authorization": f"Bearer {os.getenv('OLLAMA_API_KEY')}",
    "Content-Type": "application/json"
}

try:
    # Make the API call
    response = requests.post(generate_endpoint, json=data, headers=headers)
    print("Generate response raw response:")
    print_raw_response(response)

    # Check if the request was successful
    if response.status_code == 200:
        # Print the response from the model
        print(response.json())
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")
