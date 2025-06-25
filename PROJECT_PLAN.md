# Hotel Bar Stools Website - Project Plan

## Project Overview

This project will build a modern, fully responsive hotel bar stools website using Astro as the framework, styled with custom CSS, and enhanced with vanilla JavaScript. The site will feature content management through DecapCMS and be optimized for SEO and performance.

## Technical Stack

- **Framework**: Astro (Static Site Generator)
- **Styling**: Custom CSS (No frameworks)
- **JavaScript**: Vanilla JavaScript only
- **Content Management**: DecapCMS
- **Deployment**: Cloudflare Pages
- **Performance**: Optimized for Core Web Vitals

## Project Structure

```
hotelbarstools/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Clientele.astro
│   │   ├── Collections.astro
│   │   ├── Showcase.astro
│   │   ├── Footer.astro
│   │   └── CollectionTemplate.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── CollectionLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── collections/
│   │       └── [slug].astro
│   ├── styles/
│   │   ├── global.css
│   │   ├── components/
│   │   └── utilities/
│   ├── scripts/
│   │   ├── navigation.js
│   │   ├── lazy-loading.js
│   │   └── mobile-menu.js
│   └── content/
│       ├── collections/
│       └── config.ts
├── public/
│   ├── admin/
│   │   ├── config.yml
│   │   └── index.html
│   ├── images/
│   ├── favicon.ico
│   ├── sitemap.xml
│   ├── robots.txt
│   └── _redirects
├── astro.config.mjs
├── package.json
└── README.md
```

## Implementation Phases

### Phase 1: Project Setup & Foundation (Week 1)

#### 1.1 Astro Project Initialization
- [ ] Initialize Astro project with TypeScript support
- [ ] Configure `astro.config.mjs` for SSG and SEO optimizations
- [ ] Set up development environment and build scripts
- [ ] Install necessary dependencies (minimal approach)

#### 1.2 Base Layout & CSS Architecture
- [ ] Create `BaseLayout.astro` with semantic HTML structure
- [ ] Implement CSS reset and base styles
- [ ] Set up CSS custom properties for design tokens
- [ ] Create responsive grid system using CSS Grid/Flexbox
- [ ] Implement mobile-first responsive design approach

#### 1.3 SEO Foundation
- [ ] Configure meta tags, Open Graph, and Twitter Cards
- [ ] Implement structured data (JSON-LD) schema
- [ ] Create sitemap.xml generation
- [ ] Set up robots.txt
- [ ] Implement canonical URLs

### Phase 2: Core Components Development (Week 2)

#### 2.1 Header Component
```astro
<!-- Features to implement -->
- Responsive navigation with logo positioning
- Sticky header behavior with JavaScript
- Mobile hamburger menu with slide animation
- Accessibility features (ARIA labels, keyboard navigation)
```

#### 2.2 Hero Section
```astro
<!-- Features to implement -->
- Full-screen background image with optimization
- Responsive typography scaling
- CSS overlay effects for text readability
- Lazy loading for hero background
```

#### 2.3 Navigation System
```javascript
// Vanilla JS features
- Smooth scroll to sections
- Mobile menu toggle functionality
- Active state management
- Escape key handling for mobile menu
```

### Phase 3: Content Sections (Week 3)

#### 3.1 Clientele Section
- [ ] Responsive logo grid using CSS Grid
- [ ] Lazy loading implementation for logos
- [ ] Hover effects and animations
- [ ] Accessibility considerations for logo alt text

#### 3.2 Collections Section
- [ ] 2x2 desktop grid, 1-column mobile layout
- [ ] Interactive hover states
- [ ] Image optimization and lazy loading
- [ ] Dynamic routing setup for collection pages

#### 3.3 Showcase Section
- [ ] Masonry-style or grid layout for product images
- [ ] Progressive image loading
- [ ] Lightbox functionality (vanilla JS)
- [ ] Touch/swipe gestures for mobile

### Phase 4: Collection Pages (Week 4)

#### 4.1 Dynamic Routing
- [ ] Set up `[slug].astro` for dynamic collection pages
- [ ] Implement getStaticPaths for SSG
- [ ] Create collection data structure
- [ ] URL slug generation and management

#### 4.2 Collection Page Template
```astro
<!-- Template structure -->
- Full-width banner image section
- Title and description area
- Hero product image with zoom functionality
- Responsive grid for color variations (~20 images)
- Left-right content section with clickable links
```

#### 4.3 Interactive Features
```javascript
// Vanilla JS functionality
- Image gallery with thumbnail navigation
- Color variation selector
- Image zoom on hover/click
- Touch gestures for mobile gallery
```

### Phase 5: DecapCMS Integration (Week 5)

#### 5.1 CMS Configuration
```yaml
# config.yml structure
backend:
  name: git-gateway
  branch: main

media_folder: "public/images"
public_folder: "/images"

collections:
  - name: "collections"
    label: "Collections"
    folder: "src/content/collections"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Description", name: "description", widget: "text"}
      - {label: "Banner Image", name: "banner", widget: "image"}
      - {label: "Hero Image", name: "hero", widget: "image"}
      - {label: "Color Variations", name: "variations", widget: "list", field: {label: "Image", name: "image", widget: "image"}}
```

#### 5.2 Content Management Setup
- [ ] Configure DecapCMS with Astro content collections
- [ ] Set up authentication (Netlify Identity or GitHub)
- [ ] Create content schemas for collections
- [ ] Implement image optimization pipeline
- [ ] Test content creation and updates workflow

### Phase 6: Performance Optimization (Week 6)

#### 6.1 Image Optimization
- [ ] Implement responsive images with `srcset`
- [ ] Set up image format optimization (WebP, AVIF)
- [ ] Configure lazy loading for all non-critical images
- [ ] Implement progressive image loading

#### 6.2 CSS & JavaScript Optimization
- [ ] Minify and compress CSS
- [ ] Implement critical CSS extraction
- [ ] Defer non-critical JavaScript loading
- [ ] Bundle and optimize JavaScript modules

#### 6.3 Core Web Vitals Optimization
- [ ] Optimize Largest Contentful Paint (LCP)
- [ ] Minimize Cumulative Layout Shift (CLS)
- [ ] Improve First Input Delay (FID)
- [ ] Implement preloading for critical resources

### Phase 7: SEO & Accessibility (Week 7)

#### 7.1 SEO Implementation
```html
<!-- Meta tags structure -->
<meta name="description" content="Professional hotel bar stools collection">
<meta property="og:title" content="Hotel Bar Stools - Premium Collection">
<meta property="og:description" content="Discover our premium collection of hotel bar stools">
<meta property="og:image" content="/images/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
```

#### 7.2 Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Hotel Bar Stool Collection",
  "description": "Premium hotel bar stools for commercial use",
  "brand": "Hotel Bar Stools"
}
```

#### 7.3 Accessibility (WCAG 2.1 AA)
- [ ] Semantic HTML structure with proper headings
- [ ] Alt text for all images
- [ ] Keyboard navigation support
- [ ] Color contrast compliance
- [ ] Screen reader compatibility
- [ ] Focus management for interactive elements

### Phase 8: Cloudflare Pages Deployment (Week 8)

#### 8.1 Deployment Configuration
```javascript
// astro.config.mjs for Cloudflare
export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  build: {
    inlineStylesheets: 'auto'
  }
});
```

#### 8.2 CI/CD Pipeline
- [ ] Set up automatic deployment from Git repository
- [ ] Configure build commands and environment variables
- [ ] Set up custom domain and SSL
- [ ] Implement preview deployments for testing

#### 8.3 Performance Monitoring
- [ ] Set up Cloudflare Analytics
- [ ] Configure Core Web Vitals monitoring
- [ ] Implement error tracking
- [ ] Set up uptime monitoring

## Technical Specifications

### Responsive Design Breakpoints
```css
/* Mobile First Approach */
/* Mobile: 320px - 767px */
/* Tablet: 768px - 1023px */
/* Desktop: 1024px+ */
/* Large Desktop: 1440px+ */

:root {
  --breakpoint-sm: 480px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1440px;
}
```

### Color Scheme & Typography
```css
:root {
  /* Colors */
  --color-primary: #1a1a1a;
  --color-secondary: #f5f5f5;
  --color-accent: #d4a574;
  --color-text: #333333;
  --color-text-light: #666666;
  
  /* Typography */
  --font-primary: 'System UI', -apple-system, sans-serif;
  --font-secondary: Georgia, serif;
  
  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
}
```

### Performance Targets
- **Lighthouse Score**: 95+ for all categories
- **Core Web Vitals**:
  - LCP: < 2.5s
  - FID: < 100ms
  - CLS: < 0.1
- **Page Load Time**: < 3s on 3G connection
- **Image Optimization**: All images under 100KB

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari iOS 14+
- Chrome Mobile 90+

## Content Strategy

### Collections Structure
Each collection will include:
- **Title**: SEO-optimized collection name
- **Description**: Detailed product description
- **Banner Image**: Full-width hero image (1920x800px)
- **Hero Product**: Main product showcase (800x600px)
- **Color Variations**: Grid of product variants (400x300px each)
- **Additional Content**: Flexible content blocks

### Image Requirements
- **Format**: WebP with JPEG fallback
- **Optimization**: Responsive images with multiple sizes
- **Lazy Loading**: All images except above-the-fold
- **Alt Text**: Descriptive text for accessibility
- **File Naming**: SEO-friendly naming convention

## Quality Assurance Checklist

### Functionality Testing
- [ ] Navigation works across all devices
- [ ] Mobile hamburger menu functions correctly
- [ ] All links and buttons are functional
- [ ] Form submissions work (if applicable)
- [ ] Image galleries and interactions work smoothly

### Performance Testing
- [ ] Lighthouse audit scores 95+ across all categories
- [ ] Core Web Vitals meet target thresholds
- [ ] Images load efficiently with lazy loading
- [ ] CSS and JavaScript are optimized
- [ ] No console errors or warnings

### SEO Testing
- [ ] All pages have unique, descriptive titles
- [ ] Meta descriptions are present and optimized
- [ ] Structured data validates correctly
- [ ] Sitemap.xml is accurate and accessible
- [ ] Internal linking structure is logical

### Accessibility Testing
- [ ] Screen reader compatibility
- [ ] Keyboard navigation works completely
- [ ] Color contrast meets WCAG AA standards
- [ ] Images have appropriate alt text
- [ ] Focus indicators are visible

### Cross-Browser Testing
- [ ] Test on specified browser versions
- [ ] Verify responsive design on various screen sizes
- [ ] Check mobile device compatibility
- [ ] Validate touch interactions on mobile

## Risk Management

### Potential Challenges
1. **Performance with Large Image Galleries**: Implement progressive loading and image optimization
2. **Mobile Navigation Complexity**: Thorough testing and fallback options
3. **DecapCMS Integration**: Backup content management strategy
4. **SEO Competition**: Focus on technical SEO excellence and content quality

### Mitigation Strategies
- Regular performance monitoring and optimization
- Comprehensive testing across devices and browsers
- Backup deployment strategies
- Documentation for future maintenance

## Maintenance Plan

### Regular Tasks
- **Monthly**: Performance audit and optimization
- **Quarterly**: SEO review and updates
- **Bi-annually**: Security updates and dependency management
- **Annually**: Complete accessibility audit

### Content Management
- DecapCMS training for content editors
- Image optimization guidelines
- SEO best practices documentation
- Content approval workflow

## Success Metrics

### Primary KPIs
- Page load speed < 3 seconds
- Lighthouse score 95+ across all categories
- Mobile usability score 100%
- Zero accessibility violations
- First page search engine rankings

### Secondary Metrics
- User engagement (time on site, pages per session)
- Conversion rates (contact form submissions)
- Core Web Vitals scores
- Search visibility improvements

---

**Project Timeline**: 8 weeks
**Team Requirements**: 1 Full-stack Developer, 1 Designer (for assets)
**Budget Considerations**: Domain, hosting (Cloudflare Pages), CMS hosting
**Next Steps**: Begin Phase 1 implementation following this plan 