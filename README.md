# Mock Server Setup for Chrome Extension, Generator, and Browser Plugin

This repository provides the setup for a local mock server, a browser plugin, and a generator to create mock data for your application. These components work together to simulate responses from a server, which your Chrome extension can consume. Below is an overview of how the system works and how to get everything up and running.

## Components

- **Mock Server**: A local server built with Node.js and Express that serves mock JSON data based on the request parameters. It can be controlled via a Chrome extension.
- **Browser Plugin**: A Chrome extension that makes requests to the mock server and handles the responses.
- **Generator**: A tool that helps you create mock data files, which the mock server will use to respond to requests.

## Setup and Usage

### 1. Mock Server

The mock server can be installed and run via the `@wesflo/mock-server` package. It listens for requests from the browser plugin and returns a mock JSON response based on the parameters passed.

#### Installation

Install the mock server locally via npm:

```bash
npm i @wesflo/mock-server
```

For easier usage, you can install the mock server globally:

```bash
npm install -g @wesflo/mock-server
```

#### Running the Server

You can start the mock server using `npx`:

```bash
npx wf-serve
```

Or if you've installed it globally, you can run it directly:

```bash
wf-serve
```

For more details on the mock server, please refer to the [Mock Server README](./packages/server/README.md).

### 2. Chrome Extension

The Chrome extension makes HTTP requests to the mock server based on the parameters set by the user. The server then returns mock JSON data that the extension can use to simulate different server responses.

#### Installing the Extension

- Install the extension from the Chrome Web Store or by loading the unpacked extension.
- The extension will send requests to the mock server running on your local machine and process the mock responses.

For more details on the browser plugin, please refer to the [Browser Plugin README](./packages/chrome/README.md).

### 3. Mock Data Generator

The generator is used to create mock JSON files that the mock server will serve in response to requests from the browser plugin. You can customize the data based on your requirements, and the generator ensures that it follows the correct structure for use by the mock server.

#### Using the Generator

- The generator helps you create mock data files which can be stored in the directory the mock server is serving from.
- The mock server will read the appropriate file and return it when the browser plugin makes a request.

For more details on the mock data generator, please refer to the [Generator README](./packages/generator/README.md).

## Interaction Flow

1. **Start the Mock Server**: Begin by starting the mock server using the instructions above. The server will listen for incoming requests from the Chrome extension.
2. **Use the Chrome Extension**: Open your Chrome extension, which will communicate with the mock server to request mock data. It sends HTTP requests with the necessary parameters (e.g., status code, timeout, path to mock data, etc.).
3. **Generate Mock Data**: Use the generator to create the mock data files. These files will be served by the mock server when requested by the extension.
4. **Receive Mock Data**: The mock server responds to the extension's request with the appropriate mock JSON data.

### Example Request Flow

1. The Chrome extension sends a request to the mock server with parameters:
    - `status=200`
    - `to=1000` (timeout of 1 second)
    - `path=mockData.json` (file path of the mock data)
    - `pDir=mock` (directory where mock files are located)

2. The mock server processes the request, reads the file `mockData.json` from the `mock` directory, and returns the contents as JSON.

3. The Chrome extension receives the mock JSON data and uses it as if it was coming from a real server.

## Further Documentation

- [Mock Server README](./packages/server/README.md)
- [Browser Plugin README](./packages/chrome/README.md)
- [Mock Data Generator README](./packages/generator/README.md)

By following these steps and using the provided tools, you can simulate various server responses and test your application as if it were communicating with a real backend.

## Feedback and Support

If you encounter any issues or have feature suggestions, feel free to open an issue on https://github.com/wesflo/browser-mock/issues or join the discussion here: https://github.com/wesflo/browser-mock/discussions.
