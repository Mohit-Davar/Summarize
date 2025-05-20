# Embeding of PDF and PDF Question Generation

This repository contains scripts to populate and establish a Chroma database and additional functionality to read PDF documents, generate questions based on their content, provide citations, and answer user queries. It can also generate a summary of the entire PDF when requested.

## Main Features

- **PDF Content Parsing**: The script reads the provided PDF file and extracts its content.
- **Question Generation**: It automatically generates questions based on the parsed PDF content.
- **User Query Handling**: The script allows the user to ask questions, and it provides answers based on the content of the PDF.
- **Citations**: Provides citation references for answers.
- **PDF Summary**: You can request a summary of the entire PDF, and the script will provide a concise document overview.

## Prerequisites

Ensure you have the following installed on your system:
- Python 3.6+
- `pip` (Python package installer)
- `ollama` (To run large language models)
- Node
- NPM (node package manager)
- ngrok (for server)

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
```bash
npm install
```
Create an env file in the root directory and add
```env
server_link = "LINK_OF_MODEL_SERVER/query/"
upload_link = "LINK_OF_MODEL_SERVER/upload"
```
```bash
npm start
```
in browser type
http://localhost:8080 to see the frontend
Due to financial constraints, it will take time time to get questions and answers.


## ScreenShots
![image](https://github.com/user-attachments/assets/5751512c-3031-4573-b252-ff12f51c331d)
![image](https://github.com/user-attachments/assets/aa327c4d-b25f-4e5e-aafc-2c7c75ee366f)
![image](https://github.com/user-attachments/assets/9daf8378-4041-46c9-8868-675aae4c5025)
![image](https://github.com/user-attachments/assets/014e5b63-6a2c-430f-9796-1dec5a7857f6)
![image](https://github.com/user-attachments/assets/2118b0cd-ceb1-4a0b-886a-b650feb171a1)
