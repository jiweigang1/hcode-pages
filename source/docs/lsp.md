---
title: LSPServer
---
Hawa Code 已经默认支持集成 LSPServer 能力，只需要使用安装相关开发语言的 LSPserver 即可以使用。使用 LSPServer 可以提高 Hawa Code 探索代码的速度，同时可以节省 token 数量。

Hawa Code 支持如下 LSPServer 能力:

- goToDefinition: 查找符号定义的位置
- findReferences: 查找符号的所有引用
- hover: 获取符号的悬停信息（文档、类型信息）
- documentSymbol: 获取文档内的所有符号（函数、类、变量）
- workspaceSymbol: 在整个工作区搜索符号
- goToImplementation: 查找接口或抽象方法的实现
- prepareCallHierarchy: 获取指定位置的调用层次结构项（函数/方法）
- incomingCalls: 查找调用指定位置函数的所有函数/方法
- outgoingCalls: 查找指定位置函数调用的其他函数/方法

# 支持 LSPServer 列表

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