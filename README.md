# Parallax AI Landing Page

A modern, responsive landing page for Parallax AI - a multi-model AI comparison platform that allows users to query multiple AI models simultaneously and compare their responses side-by-side.

## Project Structure

```
parallax_site/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with design system implementation
├── script.js           # Interactive functionality and animations
├── context.md          # Design specifications and branding guidelines
└── README.md           # This file
```

## Key Features

### Design System Implementation
- **Color Palette**: Primary Indigo (#6366F1), Secondary Purple (#A855F7), Accent Pink (#EC4899)
- **Typography**: Lexend (headings), Inter (body), JetBrains Mono (code)
- **Visual Effects**: Glass morphism, gradients, animations, and floating effects
- **Responsive Design**: Mobile-first approach with breakpoints for all device sizes

### Interactive Elements
- Scroll animations with staggered delays
- FAQ accordion with accessibility features
- Ripple effect on button clicks
- Parallax background effects
- Hover animations on cards and buttons
- Counter animations for statistics

### Performance Optimizations
- CSS variables for consistent theming
- Efficient animations using CSS transforms and GPU acceleration
- Debounced scroll events for better performance
- Prefers-reduced-motion support
- Lazy loading for images

## Enhancements Made

### Code Organization
- Separated HTML, CSS, and JavaScript into individual files
- Removed inline styles and moved to CSS classes
- Added semantic class names following BEM methodology
- Implemented CSS custom properties for consistent theming

### Accessibility Improvements
- Proper ARIA attributes for interactive elements
- Keyboard navigation support
- Focus states for all interactive elements
- Semantic HTML structure
- Color contrast compliance

### Performance Enhancements
- Optimized animations with CSS transforms
- Debounced scroll and resize events
- Efficient DOM querying with caching
- Reduced motion support for accessibility
- CSS containment for better rendering performance

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Media queries for all device sizes
- Touch-friendly interactive elements
- Adaptive typography

## Technologies Used

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Custom properties, flexbox, grid, animations, and transitions
- **JavaScript**: ES6+ features with modern DOM APIs
- **Web Fonts**: Google Fonts for Lexend and Inter typefaces

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## Usage

Simply open `index.html` in any modern browser to view the landing page. All assets are self-contained within the project folder.

## Development

To modify the design or functionality:
1. Edit `index.html` for structural changes
2. Update `styles.css` for visual modifications
3. Modify `script.js` for interactive behavior changes

## Credits

Based on the design specifications provided in `context.md` for Parallax AI.