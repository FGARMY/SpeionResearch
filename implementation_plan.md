# Optimize for All Devices

## Goal Description

Make the Speion Research website fully responsive and optimized for all device sizes (mobile, tablet, desktop). This includes improving layout, navigation, image handling, typography, and ensuring a consistent premium aesthetic across breakpoints.

## User Review Required

> [!IMPORTANT]
> Please confirm the following design decisions:
> - Do you want a mobile hamburger menu for the header navigation? (Yes/No)
> - Should the footer collapse into a single column on small screens?
> - Preferred breakpoints (e.g., Tailwind defaults `sm`, `md`, `lg`, `xl` are fine?)
> - Any specific animations or micro‑interactions for mobile?

## Proposed Changes

---
### Header Component

- Add responsive navigation: hide links on `sm` and show a hamburger icon.
- Implement a slide‑out drawer for mobile navigation.
- Ensure `ThemeToggle` is visible on all breakpoints.
- Adjust spacing and font sizes using Tailwind responsive utilities.

---
### Footer Component

- Switch to a column layout on `sm` devices.
- Center align items and reduce padding for small screens.
- Ensure social links wrap correctly.

---
### ProjectCard Component

- Use `next/image` with `sizes` attribute for responsive image loading.
- Change flex direction to column on `sm` (`flex-col`), row on `md+`.
- Adjust text wrapping and spacing.

---
### PaperCard Component

- Ensure article width is fluid (`max-w-full` with appropriate paddings).
- Stack metadata and actions vertically on small screens.
- Use `line-clamp` only on larger screens; show full abstract on mobile.

---
### Global Styles & Layout

- Verify `<meta name="viewport" content="width=device-width, initial-scale=1" />` is present in `_app.tsx` or `layout.tsx`.
- Add CSS variables for fluid typography (e.g., `clamp()` values) in `globals.css`.
- Ensure Tailwind's `container` class is used with `mx-auto` for central layout.
- Add `prefers-reduced-motion` media queries for accessibility.

---
### Image Optimization

- Ensure all `next/image` components use `layout="responsive"` or `fill` with appropriate `objectFit`.
- Add `srcSet` handling via `sizes` prop for different breakpoints.

---
### Accessibility & Performance

- Add `aria-label`s for mobile menu button.
- Ensure focus trap inside mobile drawer.
- Test with Lighthouse for mobile performance.

## Open Questions

- Mobile navigation style (drawer vs dropdown).
- Any specific color palette adjustments for mobile?
- Should we add lazy‑loading for off‑screen components?

## Verification Plan

### Automated Tests
- Run `npm run dev` and use the browser tool to capture screenshots at `sm`, `md`, `lg` breakpoints.
- Verify no console errors.

### Manual Verification
- User to test on a phone and tablet.
- Confirm navigation works and layout looks premium.
