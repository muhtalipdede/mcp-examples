#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, Tool} from "@modelcontextprotocol/sdk/types.js";

const ECHO_TOOL: Tool = {
    name: "echo_tool",
    description: "Echoes the input back to the user.",
    inputSchema: {
        type: "object",
        properties: {
            input: {
                type: "string",
            },
        },
        required: ["input"],
    },
}

const server = new Server(
    {
        name: "echo_tool_server",
        version: "0.0.1"
    },
    {
        capabilities: {
            tools: {},
        },
    },
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [ECHO_TOOL],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
        const { name, arguments: args } = request.params;

        if (!args) {
            throw new Error(`No arguments provided for tool: ${name}`);
        }

        switch (name) {
            case ECHO_TOOL.name: {
                const { input } = args as { input: string };
                return {
                    content: [{type: "text", text: `Echo: ${input}`}],
                    isError: false,
                };
            }
            default:
                throw new Error(`Tool ${name} not recognized.`);
        }
    } catch (error) {
        return {
            content: [{type: "text", text: "Error"}],
            isError: true,
        };
    }
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Server started. Waiting for client connection...");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});