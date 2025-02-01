---
page:
name: server.html
slug: /browser-mock/server.html
---

# Local Mock Server for Chrome Extension

This project provides a local Node.js server built with Express that can be installed and run using the `@wesflo/mock-server` package. The server is designed to respond to requests from a Chrome extension and return a mock JSON response.

## Installation

You can install the server via npm:

```bash
npm i @wesflo/mock-server
```

Alternatively, for easier usage, you can install the package globally:

```bash
npm install -g @wesflo/mock-server
```

## Running the Server

To start the server, use `npx`:

```bash
npx wesflo-ms
```

Alternatively, if you installed the package globally, you can start the server directly:

```bash
wesflo-ms
```

## Usage

Once the server is running, it listens for requests from your Chrome extension. The extension will send a request to the server, which then processes it and responds with a mock JSON based on the parameters.

### Request Parameters

The server expects the following query parameters:

- `status` – HTTP status code to return (e.g., 200, 404)
- `to` – Timeout duration in milliseconds
- `path` – The path to the mock JSON file
- `pDir` – The directory path where the mock file is located

### Example Request

A request from your Chrome extension might look like:

```javascript
fetch('http://localhost:3000/mock?status=200&to=1000&path=mockData.json&pDir=mock')
.then(response => response.json())
.then(data => console.log(data));
```
