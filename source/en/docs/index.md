---
title: Installation
---

## Installation
1. Run the installation command
```
npm install -g  @dahawa/hawa-code
```

2. Configure API Key
- Configuration file path: ~/.hcode/config.json
```
{
  "kimi-k2": {
    "enable": true,
    "env": {
      "BASE_URL": "https://api.moonshot.cn/anthropic",
      "AUTH_TOKEN": "sk-{ use your own token }",
      "MODEL": "kimi-k2-0905-preview",
      "SMALL_FAST_MODEL": "kimi-k2-0905-preview"
    }
  },
  "deepseek": {
    "enable": false,
    "env": {
      "BASE_URL": "https://api.deepseek.com/anthropic",
      "AUTH_TOKEN": "sk-{ use your own token }",
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
      "AUTH_TOKEN": "sk-or-v1-{ use your own token }",
      "MODEL": "anthropic/claude-sonnet-4",
      "SMALL_FAST_MODEL": "anthropic/claude-sonnet-4",
       "API_TYPE":"openai"
    }
  }
}
```
3. Run the startup command
```
hcode
```
4. Windows Usage
When using on Windows systems, you need to configure the following environment variable pointing to git bash, and ensure git is installed.

```
HCODE_GIT_BASH_PATH={git installation directory}\bin\bash.exe
```
Environment variable configuration methods:
- Configure directly through Windows operating system
- Configure in the env property of the config.json mentioned above
- Configure in the project path/.hcode/.env file

