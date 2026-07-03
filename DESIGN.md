# Design System

## Direction
Obsidiana cinética: una sala técnica oscura donde una malla digital responde al visitante. Composición asimétrica, bordes tensos y tipografía monumental.

## Color
- Canvas: `#0A0A0C`
- Surface: `#121216`
- Ink: `#F2F2ED`
- Muted: `#A4A49D`
- Titanium: `#B7FF3C`
- Signal: `#FF5C35`

## Typography
- Display/body: Archivo Variable
- Data labels: Geist Mono
- Display max: `clamp(3.75rem, 10vw, 6rem)`
- Body measure: 68ch

## Layout
12-column desktop grid, asymmetric project rows, fluid section spacing, single-column mobile composition.

## Motion
WebGL pointer parallax + scroll-driven camera drift. DOM reveals use transform/opacity only. Reduced motion freezes the scene and exposes all content immediately.
