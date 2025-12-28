---
title: Skill
---
# Skill

Through Skill, you can easily extend Hawa Code's capabilities. Users can achieve various vertical scenario functionalities without developing an Agent.

# Skill Structure

```
excel/
├── SKILL.md              # Overview and quick start
├── FORMS.md              # Form field mappings and filling instructions
├── REFERENCE.md          # Excel framework tools API details
└── scripts/
    ├── fill_form.py      # Utility to populate form fields
    └── validate.py       # Checks required fields
```

# Skill Example
```
---
name: Excel
description: Generate Excel documents
---
Generate detailed Excel descriptions, specific steps and code execution information, etc.
```

# Skill Installation
Copy the Skill to the following installation directory, restart Hawa Code to take effect:

- ~/.hcode/skill   (This directory is for user configuration, effective for all projects)
- {project directory}/.hcode/skill  (This directory is for project configuration, only effective for the current project)