# dsh-brand-free (隐藏品牌标识)

English | [简体中文](./README.zh.md)

A lightweight, reversible Client UI plugin for **DeepSeek Harness (DSH)** that hides decorative product branding across the Web and Desktop interface while enabled, and cleanly restores the original UI the moment it is disabled.

## Features

While enabled, this bundle hides:

- **Sidebar Brand Mark & Wordmark**: Overrides `sidebar.brand.mark` and `sidebar.brand.name` using lower numeric priority (`-100`) Slot occupants without disabling the official brand package.
- **Empty macOS Sidebar Brand Row**: Collapses the empty `logoRow` on macOS (where the sidebar toggle lives in `topStrip`) so the session list and workspace reclaim the vertical space; keeps `logoRow` intact on Windows/Web where it contains `[data-sidebar-toggle]`.
- **Blank-Session Hero Headline**: Hides the central brand mark, slogan ("探索未至之境" / "Into the Unknown"), and preview badge on the new-conversation Hero screen (`[data-phase="hero"]`).
- **Running Status Indicator**: Hides the branded running-status row (`[data-chat-running]`, e.g., whale icon and "深度求索中").

**Safe & Reversible**:
- Does **not** modify DSH application files or statically disable official packages.
- Does **not** alter model requests, provider/account labels, authentication dialogs, message text, or window titles.
- Toggling the plugin off in **Plugins** immediately unmounts its Slot occupants and `<style>` node via HMR, restoring the official DeepSeek branding without a restart.

## Installation

### From GitHub

```bash
# For DSH Web profile
dsh plugin --profile web add github:LaoChouPro/dsh-brand-free

# For DSH Desktop profile
dsh plugin --profile desktop add github:LaoChouPro/dsh-brand-free
```

### From Local Checkout

```bash
git clone https://github.com/LaoChouPro/dsh-brand-free.git
dsh plugin --profile web add ./dsh-brand-free
```

### Uninstall

```bash
dsh plugin --profile web remove dsh-brand-free
```

## How It Works

1. **Slot Priority Override**: In DSH's Cordis-based Slot system, Single Slots select the occupant with the lowest numeric `priority` value (official brand occupants register at `0`). This plugin registers empty React components at `priority: -100` for `sidebar.brand.mark`, `sidebar.brand.name`, and `conversation.hero.brand.mark`.
2. **Scoped Style Seat**: Because the Hero headline text and running-status indicator do not expose standalone Slots, the plugin mounts a scoped `<style>` element inside `shell.overlay` tied to the plugin's fiber lifecycle.
3. **Zero Build Step**: Shipped as plain ES modules (`index.js` and `client.js`), requiring no TypeScript build step or `allowBuilds` approval when installing directly from GitHub.

## Verification

```bash
npm run check
```

## License

[MIT](./LICENSE) © LaoChouPro
