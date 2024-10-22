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
-'ollama' (To run large language models)

## Setup Instructions

### 1. Clone the repository

Clone the repository using the following command:

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```
2. Install required packages
Use the following command to install all the dependencies listed in requirements.txt:

'''bash
pip install -r requirements.txt'''

3. Add Your PDF File
Make sure to place the PDF file that you want to process in the following directory:


```
bash
./pechack/data
```
Example:


```
bash
./pechack/data/yourfile.pdf```

4. Populate the Chroma Database
After installing the required packages and adding your PDF file, you can run the following script to establish the Chroma database and set up PDF processing:


```
bash
python3 populate_database.py
```
This will:

Parse the provided PDF file.
Automatically generate questions based on the content.
Provide citation references for answers.
Answer any user queries regarding the content.
Summarize the entire PDF when requested.
Usage
Populating Database and Generating Questions
Ensure your PDF file is placed in the ./pechack/data directory.
Run the script, and it will parse the PDF, populate the database, and generate relevant questions.
Asking Questions
Once the database is populated, you can ask questions regarding the content, and the system will provide answers based on the PDF with citation references.

Requesting a PDF Summary
You can also ask the script to provide a summary of the entire PDF. Simply run the script and ask for a summary, and it will return a concise overview of the document.

Example Usage
To process a PDF and populate the Chroma database, run the following command:
bash
```
python3 populate_database.py
```
READ ME FILL WILL BE UPDATED ANYTHING ELSE WON"T BE TOUCHED 😄
