---
title: MCP
---
Hawa Code 支持 MCP 调用配置如下配置示例：

配置路径
- 项目路径/.mcp.json
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

在终端可以通过 /mcp 斜杠命令进行 mcp 管理