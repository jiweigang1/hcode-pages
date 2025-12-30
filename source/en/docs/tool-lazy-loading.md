---
title: Tool Lazy Loading
---

## Tool Lazy Loading

Hawa Code supports tool lazy loading. By default, Hawa Code does not provide all tools to the model. The model will select which tools need to be loaded based on requirements. Tool lazy loading significantly reduces token consumption.

- The lifecycle of loaded tools lasts until the end of a user conversation. When the end user inputs multiple prompt statements and executes multiple conversations, tools are unloaded after each conversation ends. When starting a new conversation, the model needs to reload the tools.
- Currently supports tool lazy loading, MCP lazy loading will be supported in future versions
- With tool lazy loading enabled, analysis speed will be slightly slower because the model has an additional step of loading tools

## Usage

Configure the following environment variable to enable tool lazy loading mode, restart the terminal to take effect:
```
HAWA_CODE_LAZY_TOOL=true

```
Environment variable configuration methods:
- Configure directly through the operating system
- Configure in the `env` property of `~/.hcode/config.json`
- Configure in the `.hcode/.env` file in the project path