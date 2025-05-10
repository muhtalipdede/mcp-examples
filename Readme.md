# MCP Examples

This repository contains examples and implementations for the Model Context Protocol (MCP). The examples are designed to demonstrate how to build and use MCP servers and tools effectively.

## Repository Structure

The repository is organized as follows:

```
mcp-node-examples/
  echo/
    index.ts
    package.json
    tsconfig.json
```

### `mcp-node-examples/echo`

This folder contains an example implementation of an MCP server using Node.js. The server includes a simple tool called `echo_tool` that echoes back the input provided by the client.

#### Files:
- **`index.ts`**: The main entry point for the echo server implementation.
- **`package.json`**: Contains the dependencies and scripts for the Node.js project.
- **`tsconfig.json`**: TypeScript configuration file.

## Getting Started

To run the examples in this repository, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/muhtalipdede/mcp-examples.git
   cd mcp-examples/mcp-node-examples/echo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the server:
   ```bash
   npm start
   ```

## Usage

The echo server listens for client connections and provides the following functionality:

- **`echo_tool`**: Accepts a string input and returns the same string as output.

### Example Request

```json
{
  "method": "callTool",
  "params": {
    "name": "echo_tool",
    "arguments": {
      "input": "Hello, MCP!"
    }
  },
  "jsonrpc": "2.0",
  "id": 1
}
```

### Example Response

```json
{
  "result": {
    "content": {
      "type": "text",
      "text": "Echo: Hello, MCP!"
    },
    "isError": false
  },
  "jsonrpc": "2.0",
  "id": 1
}
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the examples or add new ones.

## License

This repository is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.