---
title: Skill
---
# Skill
通过 SKill 可以轻松扩展 Hawa Code 的能力，用户不需要开发 Agent ，就可以实现各种垂直场景的能力。
# Skill 结构

```
excel/
├── SKILL.md              # 概述和快速开始
├── FORMS.md              # 表单字段映射和填充说明
├── REFERENCE.md          # excel 框架工具的 API 详情
└── scripts/
    ├── fill_form.py      # 填充表单字段的工具
    └── validate.py       # 检查必填字段
```

# Skill 示例
```
---
name: Excel
description: 生成 Excel 文档 
---
生成 Excel 详细描述，具体的步骤和执行的代码等信息信息
```

# Skill 安装
复制 Skill 到以下安装目录，重启 Hawa Code 就可以生效

- ~/.hcode/skill   (此目录为用户配置，所有项目都会生效)
- {项目目录}/.hcode/skill  (此目录为项目配置，只会针对当前项目生效)

