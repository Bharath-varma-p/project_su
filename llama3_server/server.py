from flask import Flask, request, jsonify
from llama3 import LlamaModel 

app = Flask(__name__)
model = LlamaModel(api_key='AAAAC3NzaC1lZDI1NTE5AAAAIBhJYv64sy51a2aIRuVaJrK6X8n/UFSdMUHUh0lq2lC0')

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    prompt = data.get('prompt')
    response = model.generate(prompt)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
