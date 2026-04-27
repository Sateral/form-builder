# Noto Forms

A focused form builder for creating forms from clean document blocks.

## Routes

- `/` - marketing landing page with the real block model.
- `/editor` - block-based form editor with preview mode.

## Form Builder Structure

- `lib/form-builder` contains the typed block model, block registry, immutable update helpers, and keyboard navigation.
- `components/form-builder` contains the editor shell, block editor, slash menu, and preview renderer.

## Commands

```bash
bun install
bun run dev
bun run test
bun run lint
bun run build
```
