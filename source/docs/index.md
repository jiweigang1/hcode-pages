---
title: 安装
---

## 安装
1、执行安装命令
```
npm install -g  @dahawa/hawa-code
```

2、配置 API Key
- 配置文件路径：~/.hcode/config.json
```
{
  "kimi-k2": {
    "enable": true,
    "env": {
      "BASE_URL": "https://api.moonshot.cn/anthropic",
      "AUTH_TOKEN": "sk-{ 使用自己的 token }",
      "MODEL": "kimi-k2-0905-preview",
      "SMALL_FAST_MODEL": "kimi-k2-0905-preview"
    }
  },
  "deepseek": {
    "enable": false,
    "env": {
      "BASE_URL": "https://api.deepseek.com/anthropic",
      "AUTH_TOKEN": "sk-{ 使用自己的 token }",
      "API_TIMEOUT_MS": "600000",
      "MODEL": "deepseek-chat",
      "SMALL_FAST_MODEL": "deepseek-chat",
      "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"
    }
  },
  "openrouter": {
    "enable": false,
    "env": {
      "BASE_URL": "https://openrouter.ai/api/v1",
      "AUTH_TOKEN": "sk-or-v1-{ 使用自己的 token }",
      "MODEL": "anthropic/claude-sonnet-4",
      "SMALL_FAST_MODEL": "anthropic/claude-sonnet-4"
    }
  }
}
```
3、执行启动命令
```
hcode
```

