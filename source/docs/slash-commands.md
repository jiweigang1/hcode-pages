---
title: 斜杠命令
---

## 自定义斜杠命令
| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | 斜杠命令名称 |
| description | string | 斜杠命令描述 |
| enabled | boolean | 是否启用，设置为 false 时该命令不会显示在终端 |
| progressMessage | string | 命令执行时显示的消息 |
| argNames | string[] | 参数名称列表 |

参考以下示例
```
---
  name: "Test"
  description: "A simple test command"
  enabled: true
  progressMessage: "Running test command..."
  argNames: [arg1, arg2]
---
  执行 shell ls 命令 , {arg1}，{arg2} 这里写需要的 prompt 语句
```

command 文件为 markdown 文件，文件路径为：
- ~/.hcode/commands/
- 项目文件/commands/