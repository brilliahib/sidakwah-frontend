# Sidakwah Frontend Design System

## 1. Atmosphere & Identity

Sidakwah is a calm, practical learning dashboard. It uses a familiar shadcn surface language with a restrained green primary accent, compact navigation, and content-first pages. The signature is the green action color against quiet zinc surfaces; workflow status must remain readable without relying on color alone.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Surface / page | `--background` | `oklch(1 0 0)` | `oklch(0.141 0.005 285.823)` | Page background |
| Surface / card | `--card` | `oklch(1 0 0)` | `oklch(0.21 0.006 285.885)` | Cards and dialogs |
| Surface / muted | `--muted` | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | Quiet panels and disabled areas |
| Text / primary | `--foreground` | `oklch(0.141 0.005 285.823)` | `oklch(0.985 0 0)` | Main text |
| Text / secondary | `--muted-foreground` | `oklch(0.552 0.016 285.938)` | `oklch(0.705 0.015 286.067)` | Supporting text |
| Border | `--border` | `oklch(0.92 0.004 286.32)` | white at 10% | Dividers and card outlines |
| Accent / primary | `--primary` | `oklch(0.5885 0.1317 160.68)` | `oklch(0.92 0.004 286.32)` | Primary actions and focus context |
| Status / destructive | `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | Destructive actions and errors |

Use semantic Tailwind utilities backed by these CSS variables. Use existing Badge variants for success, warning, and informational status. Extend the theme before adding a new semantic color.

## 3. Typography

### Scale

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| Page title | 24-30px | 600-700 | Dashboard page heading |
| Section title | 18-20px | 600 | Card and section heading |
| Body | 14-16px | 400 | Forms, descriptions, table content |
| Caption | 12-14px | 400-500 | Metadata and helper text |

### Font Stack

- Primary: Rubik (`--font-rubik`)
- Display accent: Bricolage Grotesque (`--font-bricolage`), only where existing pages use it
- Mono: system monospace for code-like values

Keep body and helper text at least 14px where practical. Use the existing font variables rather than introducing another family.

## 4. Spacing & Layout

### Base Unit

Use Tailwind's 4px spacing scale (`1` = 4px). Common rhythm is 8px for inline gaps, 16px for form groups, 24px for cards, and 32px between major sections.

### Grid

- Main content maximum width: 1280px via `.pad-x`; dashboard shell follows the existing sidebar layout.
- Mobile page gutters: 16px; medium and larger gutters follow `.pad-x` or the dashboard wrapper.
- Breakpoints: Tailwind defaults (`sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px).
- Tables may scroll within their own container; page content must not gain horizontal overflow.

## 5. Components

### Button, Input, Select, Textarea
- **Structure**: Existing shadcn primitives in `components/ui`.
- **Variants**: Use existing semantic variants and sizes; primary for the main action, outline/secondary for alternatives, destructive for rejection or deletion.
- **Spacing**: Tailwind 4px scale; form fields use consistent vertical gaps.
- **States**: Preserve hover, active, visible focus, disabled, and loading states; show validation errors beside their field.
- **Accessibility**: Use associated labels, keyboard operation, and descriptive button text.
- **Motion**: Existing short transitions only; respect reduced motion.
- **Layout**: Cluster related actions, stack form fields, allow full-width controls on narrow screens.

### Card and Badge
- **Structure**: Existing shadcn Card and Badge primitives.
- **Variants**: Card for grouped content; Badge variants communicate status.
- **Spacing**: Card content uses existing padding conventions; badges sit beside the relevant title or metadata.
- **States**: Keep text labels in badges so status is not color-only; cards retain clear hover/focus only when interactive.
- **Accessibility**: Do not use a badge as the sole source of a decision or action.
- **Motion**: No added motion.
- **Layout**: Card content follows a vertical stack; status and metadata may cluster.

### Dashboard Sidebar and Data Table
- **Structure**: Existing dashboard shell, sidebar primitives, and shared DataTable.
- **Variants**: Role-specific navigation; searchable/filterable tables where the existing page pattern uses them.
- **Spacing**: Keep navigation compact and table rows readable at existing density.
- **States**: Include active navigation, loading, empty, and error states; tables need a narrow-screen scroll owner.
- **Accessibility**: Use links for navigation, buttons for actions, and semantic table headers.
- **Motion**: No added motion.
- **Layout**: Sidebar shell with a responsive main column; table scroll stays inside the table container.

## 6. Motion & Interaction

Use the existing Tailwind and shadcn transitions, typically 100-200ms for control feedback. Every interactive element has hover, active, visible focus, and disabled states. Do not add decorative animation; respect `prefers-reduced-motion`.

## 7. Depth & Surface

### Strategy

Mixed but restrained: semantic borders define cards and inputs; existing modest shadows are reserved for popovers, dialogs, and menus. Do not add decorative gradients or new elevation levels.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- Target WCAG 2.2 AA, including 4.5:1 text contrast, visible keyboard focus, keyboard reachability, and reduced-motion support.
- At 375px, primary page content reflows to one column without page-level horizontal scrolling.
- Status is communicated with text and iconography as well as color.

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
|------|----------|--------------|--------------|
| Existing dashboard pages may use legacy one-off spacing or colors | Existing dashboard components | This feature preserves established page patterns; broad consolidation is outside this feature | Address during a dashboard-wide design cleanup |
