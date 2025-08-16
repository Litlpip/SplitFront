---
title: VibeSplit Responsive Design System
description: Complete responsive design system with breakpoints, layout adaptations, and Russian localization considerations
feature: Responsive Design System
last-updated: 2025-01-11
version: 1.0.0
related-files: 
  - style-guide.md
  - tokens/typography.md
  - ../features/screen-wireframes.md
dependencies:
  - Core design system completion
  - Screen wireframes and mockups
  - Russian cultural analysis
status: completed
---

# VibeSplit Responsive Design System

## Overview

Адаптивная система дизайна VibeSplit обеспечивает оптимальный пользовательский опыт на всех устройствах с особым вниманием к российским особенностям использования и культурным паттернам. Система учитывает длинные русские тексты, специфику мобильных платежей и социальные нормы общения о деньгах.

## Breakpoint System

### Primary Breakpoints
```css
/* Mobile-first responsive system */
:root {
  --breakpoint-mobile: 320px;    /* Minimum supported width */
  --breakpoint-mobile-large: 414px; /* Large phones */
  --breakpoint-tablet: 768px;    /* Tablet portrait */
  --breakpoint-tablet-large: 1024px; /* Tablet landscape */
  --breakpoint-desktop: 1200px;  /* Desktop */
  --breakpoint-wide: 1440px;     /* Wide desktop */
}

/* Media query mixins */
@media screen and (min-width: 768px) { /* Tablet+ */ }
@media screen and (min-width: 1024px) { /* Tablet landscape+ */ }
@media screen and (min-width: 1200px) { /* Desktop+ */ }
@media screen and (min-width: 1440px) { /* Wide+ */ }
```

### Russian Context Considerations
```css
/* Extra space for Russian text overflow */
@media screen and (max-width: 767px) {
  .russian-text {
    font-size: 16px; /* Larger base for Cyrillic readability */
    line-height: 1.6; /* Increased for Russian character height */
  }
}

/* Wider touch targets for Russian UI elements */
@media screen and (max-width: 767px) {
  .button-russian {
    min-height: 48px; /* Accommodate longer Russian button text */
    padding: 12px 20px; /* Extra horizontal padding */
  }
}
```

## Mobile Design (320px - 767px)

### Layout Specifications

#### Mobile Portrait (320px - 414px)
```css
.mobile-container {
  width: 100%;
  max-width: 414px;
  margin: 0 auto;
  padding: 0 16px;
  
  /* Safe area handling */
  padding-top: max(16px, env(safe-area-inset-top));
  padding-bottom: max(16px, env(safe-area-inset-bottom));
}

/* Russian currency display optimization */
.currency-mobile {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(18px, 5vw, 24px);
  letter-spacing: 0.5px; /* Better Russian ruble symbol spacing */
}
```

#### Dashboard Mobile Layout
```
┌─────────────────────────────────────┐ ← 320px min width
│ [16px] VibeSplit        👤 [16px]   │ ← Safe margins
├─────────────────────────────────────┤
│                                     │
│          Ваш баланс                 │ ← Single column
│ ┌─────────────────────────────────┐ │
│ │ Вам должны    │  Вы должны      │ │ ← 50/50 split
│ │ +2 450 ₽     │  -890 ₽        │ │ ← Auto-scaling text
│ └─────────────────────────────────┘ │
│                                     │
│        Активные группы              │
│ ┌─────────────────────────────────┐ │ ← Full-width cards
│ │ 🍽️ Ужин в ресторане             │ │
│ │ 4 участника • Вчера             │ │
│ │ Ваш долг: 325 ₽ [Погасить]      │ │ ← Inline actions
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Typography Scaling
```css
/* Mobile typography system for Russian text */
@media screen and (max-width: 767px) {
  .heading-1-mobile { 
    font-size: clamp(24px, 8vw, 28px);
    line-height: 1.3;
    letter-spacing: -0.01em;
  }
  
  .heading-2-mobile { 
    font-size: clamp(20px, 6vw, 22px);
    line-height: 1.4;
  }
  
  .body-mobile { 
    font-size: 16px; /* Fixed size for UI consistency */
    line-height: 1.5;
  }
  
  .currency-mobile {
    font-size: clamp(18px, 5vw, 22px);
    font-family: 'JetBrains Mono', monospace;
  }
}
```

### Mobile Russian UI Patterns

#### Touch-Optimized Button System
```css
.button-mobile {
  min-height: 48px;
  padding: 14px 20px;
  font-size: 16px;
  font-weight: 600;
  
  /* Russian text accommodation */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100vw - 32px);
}

/* Stacked button layout for Russian text */
.button-group-mobile {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.button-group-mobile .button {
  width: 100%;
  justify-content: center;
}
```

#### Mobile Navigation Patterns
```css
/* Tab bar with Russian labels */
.tab-bar-mobile {
  height: 80px; /* Including safe area */
  padding-bottom: max(16px, env(safe-area-inset-bottom));
  display: flex;
  justify-content: space-around;
}

.tab-item-mobile {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  
  font-size: 12px;
  font-weight: 500;
  text-align: center;
}

/* Russian tab labels sizing */
.tab-label-russian {
  max-width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### Mobile Expense Entry Flow
```css
/* Optimized for Russian currency input */
.currency-input-mobile {
  width: 100%;
  font-size: 28px;
  font-family: 'JetBrains Mono', monospace;
  text-align: center;
  padding: 20px 16px;
  
  /* Russian number format support */
  letter-spacing: 1px;
  background: rgba(27, 94, 32, 0.05);
  border-radius: 12px;
}

/* Participant selection for mobile */
.participant-chips-mobile {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-start;
}

.participant-chip-mobile {
  min-width: 80px;
  height: 36px;
  padding: 8px 12px;
  font-size: 14px;
  
  /* Russian name handling */
  max-width: calc(50% - 4px);
  overflow: hidden;
  text-overflow: ellipsis;
}
```

## Tablet Design (768px - 1023px)

### Tablet Portrait Layout
```
┌───────────────────────────────────────────────┐ ← 768px
│ [32px] VibeSplit           👤 [32px]          │ ← Increased margins
├───────────────────────────────────────────────┤
│                                               │
│              Ваш баланс                       │
│  ┌─────────────────┐  ┌─────────────────┐    │ ← Wider balance cards
│  │ Вам должны      │  │ Вы должны       │    │
│  │ +2 450 ₽       │  │ -890 ₽         │    │
│  │                 │  │                 │    │
│  └─────────────────┘  └─────────────────┘    │
│                                               │
│            Активные группы                    │
│  ┌─────────────────────────────────────────┐  │
│  │ 🍽️ Ужин в "Пушкине"                    │  │ ← Enhanced card layout
│  │ [А][М][Д][К] 4 участника • Вчера       │  │ ← Avatar row visible
│  │ Ваш долг: 325 ₽           [Погасить]   │  │ ← Side-by-side layout
│  └─────────────────────────────────────────┘  │
│                                               │
│  ┌─────────────────┐  ┌─────────────────┐    │ ← Two-column groups
│  │ 🎉 День рождения │  │ 🚗 Поездка      │    │
│  │ 8 участников    │  │ 6 участников    │    │
│  │ ✅ Завершено     │  │ 💰 +150 ₽       │    │
│  └─────────────────┘  └─────────────────┘    │
└───────────────────────────────────────────────┘
```

### Tablet Typography
```css
@media screen and (min-width: 768px) and (max-width: 1023px) {
  .heading-1-tablet { 
    font-size: 32px;
    line-height: 1.25;
  }
  
  .heading-2-tablet { 
    font-size: 24px;
    line-height: 1.33;
  }
  
  .body-tablet { 
    font-size: 16px;
    line-height: 1.5;
  }
  
  /* Enhanced Russian text readability */
  .russian-text-tablet {
    letter-spacing: 0.01em;
    word-spacing: 0.1em;
  }
}
```

### Tablet Interaction Patterns
```css
/* Hybrid touch/cursor interactions */
.button-tablet {
  min-height: 44px;
  padding: 12px 24px;
  font-size: 16px;
  
  transition: all 200ms ease-out;
}

.button-tablet:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(27, 94, 32, 0.2);
}

/* Two-column forms for tablet */
.form-tablet {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-tablet .form-field-full {
  grid-column: span 2;
}
```

## Desktop & Wide Design (1024px+)

### Desktop Layout (1024px - 1439px)
```
┌─────────────────────────────────────────────────────────┐ ← 1024px+
│ [Auto] VibeSplit                          👤 [Auto]    │ ← Centered content
├─────────────────────────────────────────────────────────┤
│                                                         │
│                      Ваш баланс                         │
│    ┌──────────────┐    ┌──────────────┐                 │ ← Compact cards
│    │ Вам должны   │    │ Вы должны    │                 │
│    │ +2 450 ₽    │    │ -890 ₽      │                 │
│    └──────────────┘    └──────────────┘                 │
│                                                         │
│ ┌─ Активные группы ──┐  ┌─ Последние операции ────┐    │ ← Two-column
│ │                    │  │                          │    │
│ │ 🍽️ Ужин в ресторане │  │ • Алиса добавила "Кофе"  │    │
│ │ [А][М][Д][К]       │  │   240 ₽ • 8 мин назад   │    │
│ │ 4 участника        │  │                          │    │
│ │ ⚠️ Долг: 325 ₽     │  │ • Петр погасил долг      │    │
│ │ [Погасить][Детали] │  │   200 ₽ • 15 мин назад  │    │
│ │                    │  │                          │    │
│ │ 🎉 День рождения    │  │ • Катя создала группу    │    │
│ │ ✅ Завершено        │  │   "Подарок учителю"     │    │
│ └────────────────────┘  └──────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

### Desktop Typography System
```css
@media screen and (min-width: 1024px) {
  :root {
    --base-font-size: 18px; /* Improved readability */
  }
  
  .heading-1-desktop { 
    font-size: 36px;
    line-height: 1.22;
    letter-spacing: -0.015em;
  }
  
  .heading-2-desktop { 
    font-size: 28px;
    line-height: 1.29;
    letter-spacing: -0.01em;
  }
  
  .body-desktop { 
    font-size: 18px;
    line-height: 1.56;
    letter-spacing: 0.005em;
  }
  
  /* Optimal Russian text line length */
  .text-content-desktop {
    max-width: 65ch; /* Optimal reading length for Russian */
    margin: 0 auto;
  }
}
```

### Desktop Navigation & Interactions
```css
/* Sidebar navigation for desktop */
.sidebar-desktop {
  width: 280px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  
  background: white;
  border-right: 1px solid #E0E0E0;
  padding: 24px;
}

.main-content-desktop {
  margin-left: 280px;
  padding: 32px;
  max-width: 1200px;
}

/* Enhanced hover states for desktop */
.card-desktop {
  transition: all 250ms ease-out;
  cursor: pointer;
}

.card-desktop:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
```

### Desktop Expense Management
```css
/* Multi-column expense form */
.expense-form-desktop {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;
}

.currency-section-desktop {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.currency-input-desktop {
  font-size: 48px;
  font-family: 'JetBrains Mono', monospace;
  text-align: center;
  background: transparent;
  border: none;
  color: #1B5E20;
  
  /* Russian ruble symbol positioning */
  letter-spacing: 2px;
}

/* Participant grid for desktop */
.participants-desktop {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
```

## Container System & Grid

### Fluid Container System
```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
}

@media screen and (min-width: 768px) {
  .container {
    padding: 0 32px;
  }
}

@media screen and (min-width: 1024px) {
  .container {
    max-width: 1200px;
    padding: 0 32px;
  }
}

@media screen and (min-width: 1440px) {
  .container {
    max-width: 1440px;
    padding: 0 48px;
  }
}
```

### Responsive Grid System
```css
.grid {
  display: grid;
  gap: 16px;
}

/* Mobile: 1 column */
@media screen and (max-width: 767px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  .grid-item {
    min-height: 80px; /* Accommodate Russian text */
  }
}

/* Tablet: 2 columns */
@media screen and (min-width: 768px) and (max-width: 1023px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

/* Desktop: 3+ columns */
@media screen and (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
  }
}
```

## Russian Language Responsive Considerations

### Text Overflow Handling
```css
/* Russian text overflow solutions */
.text-overflow-russian {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  /* Minimum width to show meaningful Russian text */
  min-width: 80px;
}

.text-wrap-russian {
  word-break: break-word;
  overflow-wrap: break-word;
  
  /* Prevent awkward breaks in Russian words */
  hyphens: auto;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
}
```

### Currency Display Responsiveness
```css
/* Adaptive currency display */
.currency-responsive {
  font-family: 'JetBrains Mono', monospace;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.5px;
}

@media screen and (max-width: 480px) {
  .currency-responsive {
    font-size: clamp(16px, 4vw, 20px);
  }
}

@media screen and (min-width: 481px) and (max-width: 767px) {
  .currency-responsive {
    font-size: 18px;
  }
}

@media screen and (min-width: 768px) {
  .currency-responsive {
    font-size: 20px;
  }
}
```

### Russian Date & Time Formatting
```css
/* Responsive date display */
.date-responsive {
  font-size: 14px;
  color: #616161;
}

@media screen and (max-width: 480px) {
  .date-responsive {
    /* Shorter format for mobile */
    /* "15.03" instead of "15 марта 2024" */
  }
}

@media screen and (min-width: 768px) {
  .date-responsive {
    /* Full format for larger screens */
    /* "15 марта 2024 г., 14:30" */
  }
}
```

## Performance Optimization

### Image Responsiveness
```css
/* Optimized images for different screens */
.responsive-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

/* Specific sizing for avatars */
.avatar-responsive {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

@media screen and (min-width: 768px) {
  .avatar-responsive {
    width: 40px;
    height: 40px;
  }
}

@media screen and (min-width: 1024px) {
  .avatar-responsive {
    width: 48px;
    height: 48px;
  }
}
```

### Font Loading Strategy
```css
/* Progressive font enhancement */
@font-face {
  font-family: 'Manrope';
  src: url('./fonts/Manrope-Variable.woff2') format('woff2');
  font-display: swap;
  font-weight: 300 700;
}

.text-fallback {
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

/* Russian character support check */
@supports (font-variation-settings: normal) {
  .text-variable {
    font-family: 'Manrope', sans-serif;
    font-variation-settings: 'wght' 400;
  }
}
```

## Testing Matrix

### Device Testing Requirements

| Device Category | Screen Sizes | Test Scenarios |
|----------------|--------------|----------------|
| **Small Mobile** | 320px - 375px | Russian text overflow, touch targets, currency input |
| **Large Mobile** | 375px - 414px | Full feature accessibility, tab navigation |
| **Small Tablet** | 768px - 834px | Two-column layouts, hybrid interactions |
| **Large Tablet** | 1024px - 1112px | Desktop-like features, multi-column forms |
| **Desktop** | 1200px+ | Full feature set, hover states, keyboard navigation |

### Russian Localization Testing
```javascript
// Test cases for Russian responsive behavior
const russianTestCases = {
  longButtonText: "Пригласить участников в группу",
  longGroupName: "Совместный ужин в ресторане 'Пушкин' с коллегами",
  longUserName: "Александра Владимировна Петрова-Водкина",
  largeCurrency: "125 450,75 ₽",
  longDescription: "Оплата за совместный стол, включая основные блюда, закуски, напитки и чаевые"
};

// Responsive test function
const testRussianResponsive = (testCase, breakpoint) => {
  const element = document.querySelector('.test-element');
  element.textContent = testCase;
  
  // Check for overflow, readability, touch targets
  return {
    overflow: element.scrollWidth > element.clientWidth,
    touchTarget: element.getBoundingClientRect().height >= 44,
    readability: window.getComputedStyle(element).fontSize
  };
};
```

## Accessibility Across Breakpoints

### Focus Management
```css
/* Responsive focus indicators */
.focus-indicator {
  outline: 2px solid #1976D2;
  outline-offset: 2px;
  border-radius: 4px;
}

@media screen and (max-width: 767px) {
  .focus-indicator {
    outline-width: 3px;
    outline-offset: 3px;
  }
}
```

### Screen Reader Adaptations
```html
<!-- Responsive screen reader content -->
<div aria-live="polite">
  <span class="sr-mobile">Долг 450 ₽</span>
  <span class="sr-desktop">Ваш долг Алисе Петровой составляет 450 рублей за ужин в ресторане</span>
</div>
```

```css
.sr-mobile {
  display: block;
}

.sr-desktop {
  display: none;
}

@media screen and (min-width: 768px) {
  .sr-mobile {
    display: none;
  }
  
  .sr-desktop {
    display: block;
  }
}
```

## Implementation Guidelines

### CSS Architecture
```scss
// Mobile-first SCSS structure
.component {
  // Mobile styles (320px+)
  property: mobile-value;
  
  @media screen and (min-width: 768px) {
    // Tablet styles
    property: tablet-value;
  }
  
  @media screen and (min-width: 1024px) {
    // Desktop styles
    property: desktop-value;
  }
  
  // Russian-specific adjustments
  &.russian {
    letter-spacing: 0.01em;
    
    @media screen and (max-width: 767px) {
      font-size: 16px; // Minimum for Cyrillic readability
    }
  }
}
```

### JavaScript Responsive Helpers
```javascript
// Responsive utilities for Russian content
class ResponsiveHelper {
  static getCurrentBreakpoint() {
    const width = window.innerWidth;
    
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    if (width < 1200) return 'desktop';
    return 'wide';
  }
  
  static formatCurrencyForBreakpoint(amount) {
    const breakpoint = this.getCurrentBreakpoint();
    const formatter = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    });
    
    if (breakpoint === 'mobile' && amount > 9999) {
      // Shorter format for mobile
      return formatter.format(amount).replace(' ₽', '₽');
    }
    
    return formatter.format(amount);
  }
  
  static truncateTextForBreakpoint(text, element) {
    const breakpoint = this.getCurrentBreakpoint();
    const maxLengths = {
      mobile: 25,
      tablet: 40,
      desktop: 60,
      wide: 80
    };
    
    const maxLength = maxLengths[breakpoint];
    
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    
    return text;
  }
}
```

## Related Documentation

- [Design System Style Guide](./style-guide.md)
- [Typography System](./tokens/typography.md)
- [Screen Wireframes](../features/screen-wireframes.md)
- [High-Fidelity Mockups](../features/high-fidelity-mockups.md)
- [Accessibility Guidelines](../accessibility/guidelines.md)

## Version History

**Version 1.0.0** - Initial comprehensive responsive system
- Mobile-first breakpoint system with Russian considerations
- Adaptive typography for Cyrillic text
- Responsive currency and date formatting
- Cross-device interaction patterns
- Accessibility adaptations for all screen sizes
- Performance optimization guidelines

## Next Steps

1. **Device Testing** - Test on real devices across all breakpoints
2. **Performance Validation** - Measure loading times and responsiveness
3. **User Testing** - Validate Russian user experience across devices
4. **Developer Implementation** - Create responsive component library
5. **Accessibility Audit** - Test screen readers across all breakpoints

## Last Updated
**Date**: 2025-01-11
**Next Review**: 2025-01-18
**Reviewer**: UX/UI Design Lead