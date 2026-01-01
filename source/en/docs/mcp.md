---
title: MCP
---
Hawa Code supports MCP integration. Configuration example:

Configuration Paths
- Project path/.mcp.json
- ~/.hcode/.mcp.json

```
 { 
  "mcpServers": {
    "supabase": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--access-token",
        "<personal-access-token>"
      ]
    }
  }
}
```

In the terminal, you can manage MCP with the /mcp slash command
