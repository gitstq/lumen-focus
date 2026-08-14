# 贡献指南 | Contributing Guide

感谢你愿意为 **Lumen Focus** 贡献代码！感谢您愿意为 Lumen Focus 贡献代码！

## 开发环境 | Development

项目零依赖，只需 Node.js ≥ 18：

```bash
npm install        # 无第三方依赖，仅校验环境
npm run serve      # 本地预览 http://localhost:4173
npm run build      # 产出单文件离线版本 dist/index.html
npm test           # 运行单元 / 构建测试
```

## 代码结构 | Structure

```
lumen-focus/
├── index.html          # 入口页面
├── src/
│   ├── css/style.css   # 样式（Lumen 主题）
│   └── js/
│       ├── app.js      # 主控制器
│       ├── audio.js    # Web Audio 生成式环境音
│       └── stats.js    # 专注数据分析（localStorage）
├── build.js            # 单文件离线打包脚本
├── tools/serve.js      # 零依赖本地服务器
└── test/               # Node 原生测试
```

## 提交规范 | Commit Style

遵循 [Angular 提交规范](https://www.conventionalcommits.org/)：

- `feat:` 新功能
- `fix:` 缺陷修复（提交信息请附上问题描述）
- `docs:` 文档
- `refactor:` 重构
- `test:` 测试
- `style:` 样式/格式（不影响逻辑）

提交信息建议使用中文或英文均可，但需清晰描述改动目的。

## 开发原则 | Principles

- 保持**零依赖**：不引入任何第三方运行时库，保证可离线运行。
- 保持**可离线**：所有资源本地化，SW 缓存版本需同步更新。
- 保持**可访问**：按钮含 `aria-label`，支持键盘操作与 `prefers-reduced-motion`。
- 提交前请 `npm test` 确保通过。

## Issue 与 PR

- 请在提交前搜索是否已有相同 Issue / PR。
- 每个 PR 只解决一个问题，保持 diff 精简。
- 遵循上述提交规范，PR 描述说明改动动机与验证方式。

感谢你的支持！※ ありがとうございます！