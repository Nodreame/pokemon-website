# CommitRules v0.1

## Format

study from [技巧 - 如何写好一个 Git 提交信息及几种不同的规范](https://zhuanlan.zhihu.com/p/27501055)

modifyType(changeArea): the info of finished event

- modifyType：modify's type
  - example:
    - build: 影响构建系统或外部依赖关系的更改（示例范围：gulp，broccoli，npm）
    - ci: 更改我们的持续集成文件和脚本（示例范围：Travis，Circle，BrowserStack，SauceLabs）
    - docs: 仅文档更改
    - feat: 一个新功能
    - fix: 修复错误
    - perf: 改进性能的代码更改
    - refactor: 代码更改，既不修复错误也不添加功能
    - style: 不影响代码含义的变化（空白，格式化，缺少分号等）
    - test: 添加缺失测试或更正现有测试