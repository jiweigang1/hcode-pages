---
title: Slash Commands
---

## Custom Slash Commands
| Field | Type | Description |
|------|------|--------------|
| name | string | Slash command name |
| description | string | Slash command description |
| enabled | boolean | Whether the command is enabled, when set to false the command will not be displayed in the terminal |
| progressMessage | string | Message displayed when command is executed |
| argNames | string[] | List of parameter names |

See the following example
```
---
  name: "Test"
  description: "A simple test command"
  enabled: true
  progressMessage: "Running test command..."
  argNames: [arg1, arg2]
---
  Execute shell ls command, {arg1}, {arg2} write the required prompt statement here
```

Command files are markdown files with the file path:
- ~/.hcode/commands/
- project file/commands/