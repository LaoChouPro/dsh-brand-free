# dsh-brand-free（隐藏品牌标识）

[English](./README.md) | 简体中文

一个轻量、可逆的 **DeepSeek Harness (DSH)** 纯前端 UI 插件。启用后隐藏 Web 与桌面端界面中的装饰性品牌标识，禁用后通过 HMR 立即恢复官方原版界面，无需重启或修改官方文件。

## 功能特性

启用插件后自动隐藏以下界面元素：

- **左上角侧栏 Logo 与品牌名称**：通过更小数值的 Slot 优先级（`priority: -100`）覆盖 `sidebar.brand.mark` 与 `sidebar.brand.name`，不静态禁用官方品牌包。
- **macOS 侧栏空白品牌行**：在 macOS 端（侧栏收起按钮位于独立 `topStrip`），自动折叠空白的 `logoRow`，释放顶部高度给会话列表与工作区；在 Windows / Web 端（收起按钮位于 `logoRow` 内）自动保留导航控制行。
- **新对话页（Hero）品牌标题行**：隐藏空白新会话页面的鲸鱼图标、“深度求索 / 探索未至之境”标题行及“预览版”角标（`[data-phase="hero"]`）。
- **运行状态品牌提示**：隐藏对话生成时的鲸鱼图标与“深度求索中”状态行（`[data-chat-running]`）。

**安全且完全可逆**：
- **不修改**任何官方安装包或手改 Profile 配置文件。
- **不影响**模型请求、API 提供商名称、账号标签、认证提示、消息正文或窗口标题。
- 在 DSH「插件」页面关闭开关即可立即卸载 Slot 占用与注入样式，官方品牌标识即刻恢复。

## 安装方式

### 从 GitHub 安装

```bash
# 安装到 Web profile
dsh plugin --profile web add github:LaoChouPro/dsh-brand-free

# 安装到 Desktop 桌面端 profile
dsh plugin --profile desktop add github:LaoChouPro/dsh-brand-free
```

### 从本地目录安装

```bash
git clone https://github.com/LaoChouPro/dsh-brand-free.git
dsh plugin --profile web add ./dsh-brand-free
```

### 卸载插件

```bash
dsh plugin --profile web remove dsh-brand-free
```

## 实现原理

1. **Slot 优先级覆盖**：DSH 的 Single Slot 采用数值更小者优先的规则（官方品牌组件优先级为 `0`）。本插件以 `priority: -100` 注册空组件占用 `sidebar.brand.mark`、`sidebar.brand.name` 与 `conversation.hero.brand.mark`。
2. **生命周期受控样式**：新对话页标题行与运行提示无独立 Slot，插件通过 `shell.overlay` 挂载一个归属自身 Fiber 生命周期的 `<style>` 节点，仅针对稳定语义属性（`data-phase="hero"`、`data-chat-running`、`data-sidebar-toggle`）做样式隐藏。
3. **零构建依赖**：仓库直接交付标准 ESM 源码（`index.js`、`client.js`），从 GitHub 直接安装时无需执行 `prepare` 构建脚本，也无需额外配置 `allowBuilds`。

## 自检测试

```bash
npm run check
```

## 开源许可

[MIT](./LICENSE) © LaoChouPro
