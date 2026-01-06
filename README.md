# Aqua | Process Accordion Component

**A sophisticated, multi-step process visualization component** that transforms traditional accordion interfaces into an immersive user experience. Aqua presents sequential workflow stages through animated expandable panels, each revealing detailed content and contextual imagery, creating an interactive journey through complex processes.

<img width="1920" height="1190" alt="aqua" src="https://github.com/user-attachments/assets/c43638e1-9153-455d-9f30-3b9eceec75e2" />


## Live Deployment

[Preview Live Demo](https://lefajmofokeng.github.io/Aqua)

## Technical Architecture Overview

Aqua implements an **advanced accordion pattern** that combines visual storytelling with functional interactivity. Unlike conventional accordions, this component features a structured content layout where each expanded panel reveals both descriptive text and supporting imagery, creating a balanced, informative interface for process documentation.

### Core Architecture Pattern

```javascript
// State Management Pattern
class AccordionStateManager {
    constructor() {
        this.activeIndex = 0;
        this.items = []; // DOM references
        this.config = {
            singleExpand: true,
            animationDuration: 400,
            easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
        };
    }
    
    // Controlled expansion/contraction
    expandItem(index) {
        this.closeAllItems();
        this.items[index].expand();
        this.activeIndex = index;
    }
}
```

## Component Features

### 1. **Animated Visual Transitions**
- Smooth height-based animations using CSS `max-height`
- Custom easing functions for natural motion
- Icon transformation (plus/minus) with color transitions
- Background color transitions for active states

### 2. **Structured Content Layout**
Each accordion panel implements a two-column grid system:

```css
.sd2-panel-content {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Text | Image */
    gap: 40px;
    align-items: center;
}
```

### 3. **Responsive Design System**
- Mobile-first breakpoints
- Stacked layout on smaller screens
- Fluid typography scaling
- Touch-optimized trigger areas

## Technical Implementation Details

### CSS Architecture

```css
:root {
    /* Design Token System */
    --sd2-font: 'Inter Tight', sans-serif;
    --sd2-color-dark: #111111;
    --sd2-color-gray-text: #666666;
    --sd2-color-light-bg: #F6F6F6;
    --sd2-color-white: #FFFFFF;
    --sd2-radius: 24px;
    --sd2-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
```

### Animation System

```javascript
// JavaScript-controlled animations
function openItem(item) {
    item.classList.add('sd2-active');
    const panel = item.querySelector('.sd2-acc-panel');
    panel.style.maxHeight = panel.scrollHeight + "px";
}

function closeAllItems() {
    items.forEach(item => {
        item.classList.remove('sd2-active');
        item.querySelector('.sd2-acc-panel').style.maxHeight = null;
    });
}
```

### Icon Transformation Logic

```css
/* Plus to minus transformation */
.sd2-acc-item.sd2-active .sd2-acc-icon::after {
    transform: rotate(90deg);
    background-color: var(--sd2-color-white);
}

.sd2-acc-item.sd2-active .sd2-acc-icon::before {
    background-color: var(--sd2-color-white);
}
```

## Integration Examples

### React Implementation

```jsx
const AquaAccordion = ({ steps }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    return (
        <div className="sd2-accordion">
            {steps.map((step, index) => (
                <div 
                    key={index}
                    className={`sd2-acc-item ${index === activeIndex ? 'sd2-active' : ''}`}
                >
                    <div 
                        className="sd2-acc-trigger"
                        onClick={() => setActiveIndex(index)}
                    >
                        <h2 className="sd2-acc-title">{step.title}</h2>
                        <div className="sd2-acc-icon"></div>
                    </div>
                    <div className="sd2-acc-panel">
                        {/* Panel content */}
                    </div>
                </div>
            ))}
        </div>
    );
};
```

### Vue.js Implementation

```vue
<template>
  <div class="sd2-accordion">
    <div 
      v-for="(step, index) in steps" 
      :key="index"
      :class="['sd2-acc-item', { 'sd2-active': activeIndex === index }]"
    >
      <div class="sd2-acc-trigger" @click="toggleStep(index)">
        <h2 class="sd2-acc-title">{{ step.title }}</h2>
        <div class="sd2-acc-icon"></div>
      </div>
      <div class="sd2-acc-panel">
        <div class="sd2-panel-content">
          <div class="sd2-panel-text-col">
            <p class="sd2-panel-desc">{{ step.description }}</p>
            <span class="sd2-step-indicator">Step {{ String(index + 1).padStart(2, '0') }}</span>
          </div>
          <div class="sd2-panel-image-col">
            <img :src="step.image" :alt="step.title" class="sd2-internal-image">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

### Vanilla JavaScript Extension

```javascript
// Extended functionality with custom events
class AquaComponent {
    constructor(container, options = {}) {
        this.container = container;
        this.options = { ...defaultOptions, ...options };
        this.init();
        
        // Custom events for integration
        this.onStepChange = new Event('aqua:step-change');
        this.onComplete = new Event('aqua:process-complete');
    }
    
    nextStep() {
        if (this.activeIndex < this.steps.length - 1) {
            this.setActiveStep(this.activeIndex + 1);
        } else {
            this.container.dispatchEvent(this.onComplete);
        }
    }
}
```

## Performance Optimizations

### 1. **Efficient DOM Operations**
```javascript
// Batch DOM updates
function updateAccordionState(newIndex) {
    requestAnimationFrame(() => {
        closeAllItems();
        openItem(items[newIndex]);
    });
}
```

### 2. **CSS Containment**
```css
.sd2-acc-item {
    contain: layout style paint; /* Isolation for performance */
    will-change: transform, height; /* Hint for browsers */
}
```

### 3. **Image Optimization**
```html
<img 
    src="image.jpg" 
    alt="Process illustration"
    loading="lazy"
    decoding="async"
    class="sd2-internal-image"
>
```

## Accessibility Features

### ARIA Implementation
```html
<div class="sd2-acc-item" 
     role="region" 
     aria-expanded="false"
     aria-labelledby="step1-title"
     aria-controls="step1-content">
    
    <div class="sd2-acc-trigger" 
         role="button" 
         tabindex="0"
         id="step1-title">
        <h2 class="sd2-acc-title">Let's talk</h2>
    </div>
    
    <div class="sd2-acc-panel" 
         role="region" 
         id="step1-content"
         aria-labelledby="step1-title">
        <!-- Content -->
    </div>
</div>
```

### Keyboard Navigation
```javascript
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        const newIndex = (activeIndex + direction + items.length) % items.length;
        setActiveStep(newIndex);
    }
    
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleStep(activeIndex);
    }
});
```

## Use Cases

### 1. **Service Process Documentation**
```javascript
const serviceProcess = [
    {
        title: "Discovery & Consultation",
        description: "Initial meetings to understand project requirements...",
        image: "discovery.jpg"
    },
    {
        title: "Design & Prototyping",
        description: "Creating wireframes and interactive prototypes...",
        image: "design.jpg"
    },
    // Additional steps...
];
```

### 2. **Product Development Workflow**
```javascript
const developmentSteps = [
    {
        title: "Planning",
        description: "Requirements gathering and technical specification...",
        image: "planning.jpg",
        duration: "2-3 weeks"
    },
    // Additional development phases...
];
```

### 3. **Client Onboarding Process**
```javascript
const onboardingFlow = [
    {
        title: "Initial Setup",
        description: "Account creation and platform configuration...",
        image: "setup.jpg",
        checklist: ["Account setup", "Team invitation", "Access configuration"]
    },
    // Additional onboarding steps...
];
```

## Customization Options

### Theme Configuration
```javascript
const customTheme = {
    colors: {
        dark: '#1a1a1a',
        lightBg: '#f8f9fa',
        accent: '#007bff'
    },
    typography: {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        titleSize: 'clamp(2rem, 5vw, 3.5rem)'
    },
    animations: {
        duration: 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
};
```

### Layout Variants
```css
/* Alternative layout: Image on left */
.sd2-panel-content.image-left {
    grid-template-columns: 1fr 1fr;
    direction: rtl;
}

.sd2-panel-content.image-left .sd2-panel-text-col {
    direction: ltr;
}
```

## Testing Strategy

### Unit Tests
```javascript
describe('Aqua Accordion', () => {
    test('only one item can be active at a time', () => {
        const accordion = new AquaAccordion();
        accordion.openItem(0);
        accordion.openItem(1);
        expect(accordion.items[0].isActive).toBe(false);
        expect(accordion.items[1].isActive).toBe(true);
    });
    
    test('animations complete within expected time', async () => {
        const start = performance.now();
        await accordion.openItem(0);
        const duration = performance.now() - start;
        expect(duration).toBeLessThan(500);
    });
});
```

### Integration Tests
- Cross-browser compatibility
- Mobile touch interaction testing
- Screen reader compatibility
- Performance benchmarking

## Deployment & Integration

### CDN Deployment
```html
<!-- Production version -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lefajmofokeng/Aqua@latest/dist/aqua.min.css">
<script src="https://cdn.jsdelivr.net/gh/lefajmofokeng/Aqua@latest/dist/aqua.min.js"></script>

<!-- Initialize component -->
<script>
    Aqua.initialize('#process-container', {
        steps: customSteps,
        theme: 'custom',
        autoplay: false
    });
</script>
```

### Build Integration
```json
{
  "scripts": {
    "build": "npm run build:css && npm run build:js",
    "build:css": "postcss src/styles.css -o dist/aqua.min.css",
    "build:js": "terser src/script.js -o dist/aqua.min.js",
    "dev": "live-server --watch=src"
  }
}
```

---

*Aqua transforms traditional accordion components into immersive process visualization tools. With its balanced content layout, smooth animations, and comprehensive accessibility features, it serves as both a functional UI component and an educational resource for modern web interaction patterns.*
