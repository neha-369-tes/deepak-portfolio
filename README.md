# Deepak's Portfolio Website @ https://works-peach-theta.vercel.app/

A modern, animated portfolio website built with React, Framer Motion, and featuring a live dynamic background with red and white theme.

## Features

✨ **Modern Design** - Clean and professional portfolio layout with red and white theme
🎨 **Smooth Animations** - Beautiful animations using Framer Motion
🌌 **Dynamic Background** - Live animated particle background with connections
📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
⚡ **High Performance** - Built with Vite for optimal performance
🎯 **Sections**
  - Hero section with CTA buttons
  - About section with stats
  - Skills & proficiency showcase
  - Featured projects gallery
  - Contact form
  - Smooth scroll progress bar

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd works
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The website will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx         - Navigation bar with smooth animations
│   ├── Hero.jsx           - Hero section with intro and CTA
│   ├── About.jsx          - About section with stats
│   ├── Skills.jsx         - Skills showcase with proficiency bars
│   ├── Projects.jsx       - Featured projects gallery
│   ├── Contact.jsx        - Contact form and information
│   ├── AnimatedBg.jsx     - Live dynamic background
│   └── [styles].css       - Component-specific styles
├── App.jsx                - Main app component
├── App.css                - Global app styles
├── main.jsx               - React entry point
└── index.css              - Global styles and CSS variables
```

## Customization

### Colors
Edit the CSS variables in `src/index.css`:
```css
:root {
  --primary-red: #ff0000;
  --dark-red: #cc0000;
  --light-red: #ff4444;
  --white: #ffffff;
  --light-gray: #f5f5f5;
  --dark-gray: #333333;
}
```

### Content
- Update text and information in each component
- Replace placeholder project information in `Projects.jsx`
- Customize contact information in `Contact.jsx`

### Background
The dynamic background is created in `AnimatedBg.jsx`. You can customize:
- Particle count
- Colors
- Speed
- Grid pattern

## Technologies Used

- **React** - UI library
- **Vite** - Build tool
- **Framer Motion** - Animation library
- **CSS3** - Styling and layout

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Performance Tips

1. Images should be optimized before adding to the portfolio
2. Use lazy loading for heavy components
3. Regular performance audits with Lighthouse
4. Monitor bundle size with `npm run build`

## License

This project is open source and available under the MIT License.

## Author

Created for Deepak's Portfolio - 2024
