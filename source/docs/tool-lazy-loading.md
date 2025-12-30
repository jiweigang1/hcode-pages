---
title: Tool懒加载
---

## Tool懒加载

Hawa Code 支持 tool 懒加载， Hawa Code 默认不会给模型提供所有的 Tool ，模型会根据需要选择需要加载的 Tool 来进行工作。 Tool 懒加载会大量减少 Token 的消耗。

- 加载的 Tool 的生命周期是到用户一次对话结束，在终端用户多次输入 prompt 语句，执行多次对话，每次对话完 Tool 会被卸载掉，再对话的时候需要模型重新加载。
- 当前支持 Tool 懒加载，MCP 懒加载后续版本会支持
- 开启 Tool 懒加载，分析的速度会变慢一些，因为模型多了加载 Tool 的步骤。

## 使用方式

在环境变量中配置以下环境变量，重启终端就会开启 Tool 懒加载模式
```
HAWA_CODE_LAZY_TOOL=true

```
环境变量配置方式:
- 直接使用操作系统进行配置
-  ~/.hcode/config.json env 属性中进行配置
- 项目路径/.hcode/.env 文件中进行配置
