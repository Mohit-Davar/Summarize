# Embeding of PDF and PDF Question Generation

This repository contains scripts to populate and establish a Chroma database, and an additional functionality to read PDF documents, generate questions based on the content, provide citations, and answer user queries. It can also generate a summary of the entire PDF when requested.

## Main Features

- **PDF Content Parsing**: The script reads the provided PDF file and extracts its content.
- **Question Generation**: It automatically generates questions based on the parsed PDF content.
- **User Query Handling**: The script allows the user to ask questions, and it provides answers based on the content of the PDF.
- **Citations**: Provides citation references for answers directly in the terminal.
- **PDF Summary**: You can request a summary of the entire PDF, and the script will provide a concise overview of the document.

## Prerequisites

Ensure you have the following installed on your system:
- Python 3.6+
- `pip` (Python package installer)
- `ollama` (To run large language models)

## Setup Instructions

### 1. Clone the repository

Clone the repository using the following command:

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```
### 2. Install required packages
Use the following command to install all the dependencies listed in requirements.txt:

```bash
pip install -r requirements.txt
```

### 3. Setup the models
Use the following command to install the multiple models
``` bash
ollama pull llama2
ollama pull mistral
ollama pull nomic
ollama serve (to run the server)
```
### 4.Run the Flask API server 
./models/

```bash
python3 main.py
```
you can use services like ngrok to deploy services like flask api as a server
### 5. Setting up of webserver to be added
<to-be -added
## ScreenShots
<to-be-added>
