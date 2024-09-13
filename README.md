

# smartnotes.ai

**smartnotes.ai** is an AI-powered note-taking application that utilizes deep learning models to transcribe and translate audio recordings into text. Whether you're a student or a professional, this web app provides an efficient and accessible solution for converting speech into text across multiple languages. 

Try it out at: https://smartnotes-ai.netlify.app/. 

**NOTE: If not working properly, please clear your browser's cache and cookies to remove corrupted data!**

## Features

- **Transcription**: Leverages the OpenAI Whisper model, a robust automatic speech recognition (ASR) model, to convert speech to text with high accuracy.
- **Translation**: Utilizes the `Xenova/nllb-200-distilled-600M` model for translating transcribed text into a wide range of languages, offering high-quality translation capabilities.
- **Web Workers**: Uses Web Workers to handle transcription and translation tasks asynchronously, ensuring a smooth and responsive user experience.
- **Local Processing**: All processing is conducted on the client side, ensuring privacy and security as no audio data is sent to external servers.
- **React Framework**: Built with React, providing a modern, component-based architecture that is highly responsive and easy to maintain.

## How It Works

### The Whisper Model for Transcription

Built on the **Whisper model** from OpenAI, an ASR model designed to handle a variety of speech tasks with high accuracy. Whisper's architecture is based on the Transformer model, which is known for its capability in natural language understanding and generation tasks.

- **Model Size**: The default model used is `openai/whisper-tiny.en`, a lightweight version ideal for running directly in the browser using Web Workers.
- **Languages**: The model supports multiple languages for transcription.
- **Real-Time Processing**: The model processes audio in real-time, chunking the audio data into smaller segments (configured by `chunk_length_s` and `stride_length_s`) to manage memory and computation efficiently.
  

### Web Workers for Asynchronous Processing

To maintain a responsive UI, **Web Workers** are employed. These allow for heavy computational tasks, such as transcription and translation, to run in the background without blocking the main thread. 

- **Pipeline Setup**: The transcription and translation processes are managed by a pipeline set up within a Web Worker, which handles all necessary steps, including model loading, audio chunk processing, and text generation.
- **Chunking Mechanism**: Audio files are divided into chunks to be processed incrementally. The `chunk_length_s` parameter controls the size of each audio chunk, while `stride_length_s` controls the overlap between chunks, helping to maintain context between segments.


### Xenova/nllb-200-distilled-600M for Translation

Part of the No Language Left Behind (NLLB) project. This model is designed to translate text across a broad range of languages with high accuracy and fluency.

- **Model Efficiency**: The `nllb-200-distilled-600M` model is optimized for performance, making it suitable for real-time translation tasks in a web environment.





