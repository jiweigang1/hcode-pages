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
      "SMALL_FAST_MODEL": "anthropic/claude-sonnet-4",
      "API_TYPE":"openai"
    }
  }
}
```
3、执行启动命令
```
hcode
```
4、Windows 使用
在 Windows 系统上使用，需配置如下环境变量，其指向 git bash , 同时确保已经安装了 git。

```
HCODE_GIT_BASH_PATH={git 安装目录}\bin\bash.exe
```
环境变量配置方式
- 直接使用 Windows 操作系统进行配置
- 上述 config.json env 属性中进行配置
- 项目路径/.hcode/.env 文件中进行配置

