---
title: LSPServer
---
Hawa Code already supports integrated LSPServer capabilities by default. You only need to install the LSPserver for your development language to use it. Using LSPServer can improve Hawa Code's code exploration speed while also saving token usage.

Hawa Code supports the following LSPServer capabilities:

- goToDefinition: Find the location of symbol definitions
- findReferences: Find all references to symbols
- hover: Get hover information for symbols (documentation, type information)
- documentSymbol: Get all symbols within a document (functions, classes, variables)
- workspaceSymbol: Search for symbols across the entire workspace
- goToImplementation: Find implementations of interfaces or abstract methods
- prepareCallHierarchy: Get call hierarchy items at the specified location (functions/methods)
- incomingCalls: Find all functions/methods that call the function at the specified location
- outgoingCalls: Find other functions/methods called by the function at the specified location

# Supported LSPServer List

| **Language** | **LSP** | **Install** |
| --- | --- | --- |
| Go | [gopls](https://github.com/golang/tools/tree/master/gopls) | `go install golang.org/x/tools/gopls@latest` |
| TypeScript/JavaScript | [vtsls](https://github.com/yioneko/vtsls) | `npm install -g @vtsls/language-server` |
| Python | [pyright](https://github.com/microsoft/pyright) | `npm install -g pyright` |
| Java | [jdtls](https://github.com/eclipse-jdtls/eclipse.jdt.ls) | `npm install -g @redhat-developer/vscode-java` |
| C/C++ | [clangd](https://clangd.llvm.org/) | `npm install -g clangd` |
| C# | [OmniSharp](https://github.com/OmniSharp/omnisharp-roslyn) | `npm install -g omnisharp` |
| PHP | [Intelephense](https://github.com/bmewburn/intelephense-docs) | `npm install -g intelephense` |
| Kotlin | [kotlin-language-server](https://github.com/fwcd/kotlin-language-server) | `npm install -g kotlin-language-server` |
| Rust | [rust-analyzer](https://github.com/rust-lang/rust-analyzer) | `rustup component add rust-analyzer` |
| Ruby | [Solargraph](https://github.com/castwide/solargraph) | `gem install solargraph` |
| HTML/CSS | [vscode-langservers](https://github.com/hrsh7th/vscode-langservers-extracted) | `npm install -g vscode-langservers-extracted` |