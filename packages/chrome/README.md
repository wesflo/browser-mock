---
page:
   name: chrome.html
   slug: /browser-mock/chrome.html
---


# MockProxy - A Developer's HTTP Request Interception Tool
![Chrome Store Icon](./static/icon/icon128.png)

MockProxy is a lightweight browser extension designed to simplify API testing and local development. Effortlessly intercept HTTP requests, redirect them to your local Node.js server, and respond with pre-configured mock data.

## Features

### **Core Features**
- **Request Interception**: Capture and redirect HTTP requests to your local Node.js (Express) server.
- **Customizable Responses**: Configure responses with JSON files for different HTTP status codes (e.g., `200`, `400`, `404`).
- **Project Management**: Enable or disable specific requests, entire projects, or the plugin itself.
- **Dynamic Status Simulation**: Select desired HTTP response codes and simulate various API scenarios.
- **Timeout Handling**: Introduce custom response delays to test edge cases like slow networks.

### **Other Features**
- **Manifest-Based Configuration**: Manage projects, domains, and request rules through a single `manifest.json` file.
- **Pattern Matching for URLs**: Use regex patterns to target complex endpoint structures (e.g., `/api/v1/resource/[\\d]{5}`).
- **Real-Time Controls**: Enable or disable the plugin, individual requests, or entire projects directly from the popup UI.
- **Intuitive Interface**: User-friendly popup menu for managing requests, selecting statuses, and configuring timeouts.
- **Lightweight & Secure**: Operates locally, ensuring your data stays on your machine.

---

1. Load the Extension in Chrome:
    - Open Chrome and navigate to `chrome://extensions/`.
    - Enable "Developer mode" (toggle in the top right).
    - Click "Load unpacked" and select the mockproxy directory.
    - 
2. Configure the Plugin:
    - Update the `manifest.json` file in the extension directory with your project settings (see Configuration).

## Usage

1. Open the popup menu by clicking on the MockProxy icon in the browser toolbar.
2. Select a project or individual requests to activate.
3. Set desired response status codes and timeouts.
4. Start testing your APIs with local mock responses.

## Configuration

The plugin uses a  file to define projects, domains, and requests. Here's an example configuration:

```json
{
  "domains": [
    "https://api.dev.example.com",
    "https://api.preprod.example.com",
    "https://api.example.com"
  ],
  "requests": [
    {
      "name": "Get Dummy Data",
      "url": "/api/v1/health",
      "method": "GET",
      "response": {
        "200": "./health.json",
        "204": "",
        "400": "./badRequest.json"
      }
    },
    {
      "name": "Post Dummy Data",
      "url": "/api/v2/foo/[\\d]{5,10}",
      "method": "POST",
      "response": {
        "200": "../mock/health-post.json",
        "400": "./badRequest.json"
      }
    },
    {
      "name": "Put Dummy Data",
      "url": "/api/v1/return/[\\d]{4,10}/[\\d]{2,10}",
      "method": "PUT",
      "response": {
        "200": "../mock/health-put.json",
        "400": "./badRequest.json"
      }
    }
  ]
}
```
- `domains`: List of domains where the plugin will intercept requests.
- `requests`: Define individual endpoints with URL patterns, HTTP methods, and corresponding response files.

## Permissions

MockProxy requires the following permissions to function:

- `activeTab`: Access the current tab to determine the domain and apply rules contextually.
- `storage`: Store user preferences, such as active projects and selected statuses.
- `declarativeNetRequest`: Intercept and redirect HTTP requests to the local Node.js server.

## Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## Roadmap

- Add support for dynamic rule creation via UI.
- Integrate syntax highlighting for JSON configuration in the popup.
- Provide pre-built templates for common API testing scenarios.

## License

This project is licensed under the MIT License.

## Feedback and Support

If you encounter any issues or have feature suggestions, feel free to open an issue or join the discussion here: https://github.com/wesflo/browser-mock/discussions.

## Acknowledgments

Special thanks to the open-source community for providing tools and inspiration for this project.

