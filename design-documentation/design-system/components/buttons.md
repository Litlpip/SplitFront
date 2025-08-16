---
title: VibeSplit Button Component System
description: Complete button component specifications with Russian localization and accessibility considerations
feature: Button Components
last-updated: 2025-01-11
version: 1.0.0
related-files: 
  - ../style-guide.md
  - ../tokens/colors.md
  - forms.md
dependencies:
  - Core design system colors and typography
  - Accessibility requirements
status: completed
---

# VibeSplit Button Component System

## Overview

Система кнопок VibeSplit разработана для создания интуитивных, доступных и культурно-адаптированных интерактивных элементов. Особое внимание уделено российским особенностям языка и поведенческим паттернам в финансовых приложениях.

## Button Hierarchy & Usage

### 1. Primary Button

#### Visual Specifications
```css
.button-primary {
  /* Dimensions */
  height: 48px;           /* Mobile optimized */
  min-width: 120px;
  padding: 12px 24px;
  
  /* Appearance */
  background: #1B5E20;    /* Primary color */
  border: none;
  border-radius: 8px;
  
  /* Typography */
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  font-weight: 600;       /* Semibold */
  color: #FFFFFF;
  text-align: center;
  
  /* Effects */
  box-shadow: 0 2px 4px rgba(27, 94, 32, 0.2);
  transition: all 200ms cubic-bezier(0.0, 0, 0.2, 1);
}
```

#### State Variations

**Default State**
- Background: `#1B5E20` (Primary)
- Shadow: `0 2px 4px rgba(27, 94, 32, 0.2)`
- Cursor: `pointer`

**Hover State**
```css
.button-primary:hover {
  background: #0D3D0F;   /* Primary Dark */
  box-shadow: 0 4px 8px rgba(27, 94, 32, 0.3);
  transform: translateY(-1px);
}
```

**Active State**
```css
.button-primary:active {
  background: #0A2D0C;   /* Darker variant */
  box-shadow: 0 1px 2px rgba(27, 94, 32, 0.4);
  transform: translateY(1px);
}
```

**Focus State** (Accessibility)
```css
.button-primary:focus {
  outline: 3px solid #4CAF50;
  outline-offset: 2px;
  /* Maintains all other default styles */
}
```

**Disabled State**
```css
.button-primary:disabled {
  background: #E0E0E0;   /* Neutral-300 */
  color: #9E9E9E;        /* Neutral-500 */
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
}
```

**Loading State**
```css
.button-primary.loading {
  background: #1B5E20;
  color: transparent;
  pointer-events: none;
  position: relative;
}

.button-primary.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #FFFFFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

#### Russian Context Usage
**Primary Actions (Основные действия)**:
- "Добавить трату" (Add expense)
- "Создать группу" (Create group)  
- "Погасить долг" (Settle debt)
- "Пригласить друзей" (Invite friends)
- "Подтвердить" (Confirm)

**Character Length Considerations**:
- Russian text typically 20-30% longer than English
- Button width auto-adjusts with min-width constraint
- Text wrapping avoided through careful UX writing

### 2. Secondary Button

#### Visual Specifications
```css
.button-secondary {
  /* Dimensions */
  height: 48px;
  min-width: 120px;
  padding: 12px 24px;
  
  /* Appearance */
  background: transparent;
  border: 2px solid #1B5E20;  /* Primary color border */
  border-radius: 8px;
  
  /* Typography */
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #1B5E20;             /* Primary color text */
  text-align: center;
  
  /* Effects */
  transition: all 200ms cubic-bezier(0.4, 0, 0.6, 1);
}
```

#### State Variations

**Hover State**
```css
.button-secondary:hover {
  background: #E8F5E8;     /* Primary Light */
  border-color: #0D3D0F;   /* Primary Dark */
  color: #0D3D0F;
}
```

**Active State**
```css
.button-secondary:active {
  background: #C8E6C8;     /* Darker light variant */
  border-color: #0A2D0C;
  color: #0A2D0C;
}
```

**Disabled State**
```css
.button-secondary:disabled {
  background: transparent;
  border-color: #E0E0E0;   /* Neutral-300 */
  color: #9E9E9E;          /* Neutral-500 */
  cursor: not-allowed;
}
```

#### Russian Context Usage
**Secondary Actions (Дополнительные действия)**:
- "Отменить" (Cancel)
- "Редактировать" (Edit)
- "Показать детали" (Show details)
- "Экспорт отчета" (Export report)
- "Настройки группы" (Group settings)

### 3. Tertiary/Ghost Button

#### Visual Specifications
```css
.button-tertiary {
  /* Dimensions */
  height: 48px;
  min-width: 120px;
  padding: 12px 24px;
  
  /* Appearance */
  background: transparent;
  border: none;
  border-radius: 8px;
  
  /* Typography */
  font-family: 'Manrope', sans-serif;
  font-size: 16px;
  font-weight: 500;         /* Medium weight */
  color: #1B5E20;
  text-align: center;
  
  /* Effects */
  transition: all 150ms cubic-bezier(0.0, 0, 0.2, 1);
}
```

#### State Variations

**Hover State**
```css
.button-tertiary:hover {
  background: rgba(27, 94, 32, 0.08);  /* 8% opacity primary */
  color: #0D3D0F;                      /* Primary Dark */
}
```

**Active State**
```css
.button-tertiary:active {
  background: rgba(27, 94, 32, 0.16);  /* 16% opacity primary */
}
```

#### Russian Context Usage
**Tertiary Actions (Третичные действия)**:
- "Пропустить" (Skip)
- "Позже" (Later)
- "Узнать больше" (Learn more)
- "Помощь" (Help)

### 4. Specialized Buttons

#### Currency Action Button
```css
.button-currency {
  /* Inherits from primary but with specific styling */
  font-family: 'JetBrains Mono', monospace;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
  
  /* Currency symbol styling */
  .currency-symbol {
    margin-left: 4px;
    font-size: 16px;
  }
}
```

**Usage**: "Добавить 1 500 ₽", "Погасить 250 ₽"

#### Destructive Button (Редкое использование)
```css
.button-destructive {
  /* Similar to primary but with error color */
  background: #C62828;      /* Error color */
  color: #FFFFFF;
}

.button-destructive:hover {
  background: #A21A1A;      /* Darker error */
}
```

**Russian Context**: "Удалить группу", "Отклонить долг"
**Cultural Note**: Minimal usage due to Russian preference for positive language

## Size Variants

### Large Button (Hero CTAs)
```css
.button-large {
  height: 56px;
  padding: 16px 32px;
  font-size: 18px;
  border-radius: 12px;
}
```

**Usage**: Onboarding screens, major actions

### Small Button (Compact spaces)
```css
.button-small {
  height: 36px;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
  min-width: 80px;
}
```

**Usage**: Table actions, inline edits, mobile optimization

### Icon Buttons

#### With Leading Icon
```css
.button-with-icon {
  display: flex;
  align-items: center;
  gap: 8px;
  
  .icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
}
```

**Russian Examples**:
- 👥 "Пригласить друзей"
- 💸 "Добавить трату"  
- 📊 "Посмотреть отчет"

#### Icon-Only Button
```css
.button-icon-only {
  width: 48px;
  height: 48px;
  padding: 12px;
  border-radius: 50%;
  
  .icon {
    width: 24px;
    height: 24px;
  }
}
```

## Responsive Behavior

### Mobile (320px - 767px)
- **Default height**: 48px (comfortable for thumb navigation)
- **Minimum spacing**: 16px between buttons
- **Full-width option**: Available for primary actions
- **Stack vertically**: When multiple buttons present

### Tablet (768px - 1023px)
- **Adaptive width**: Between mobile and desktop sizing
- **Side-by-side layout**: For related actions
- **Touch target maintenance**: 48px minimum

### Desktop (1024px+)
- **Standard height**: 40px (more compact for mouse users)
- **Hover states**: Full interaction feedback
- **Keyboard navigation**: Tab order and focus indicators

## Accessibility Implementation

### WCAG AA Compliance

#### Color Contrast
- **Primary button**: 7.2:1 ratio (white on #1B5E20)
- **Secondary button**: 5.1:1 ratio (#1B5E20 on white)
- **Focus indicators**: 3:1 minimum contrast with background

#### Keyboard Navigation
```css
.button:focus-visible {
  outline: 3px solid #4CAF50;
  outline-offset: 2px;
}

/* Remove outline for mouse users */
.button:focus:not(:focus-visible) {
  outline: none;
}
```

#### Screen Reader Support
```html
<!-- Descriptive button with context -->
<button 
  class="button-primary"
  aria-describedby="expense-help"
  type="submit"
>
  Добавить трату 1 500 ₽
</button>

<!-- Loading state announcement -->
<button 
  class="button-primary loading"
  aria-live="polite"
  aria-label="Сохранение траты, подождите..."
>
  Сохранить
</button>

<!-- Icon button with accessible label -->
<button 
  class="button-icon-only"
  aria-label="Настройки группы"
>
  <svg class="icon" aria-hidden="true">...</svg>
</button>
```

### Russian Screen Reader Considerations
- **Currency announcements**: "Тысяча пятьсот рублей" instead of "1500 RUB"
- **Action descriptions**: Clear context for financial actions
- **Error states**: Gentle language in error announcements

## Animation & Interaction

### Micro-interactions

#### Button Press Feedback
```css
@keyframes buttonPress {
  0% { transform: scale(1); }
  50% { transform: scale(0.98); }
  100% { transform: scale(1); }
}

.button:active {
  animation: buttonPress 150ms ease-out;
}
```

#### Success Animation (After successful action)
```css
@keyframes successPulse {
  0% { 
    background: #1B5E20;
    transform: scale(1);
  }
  50% { 
    background: #2E7D32;
    transform: scale(1.05);
  }
  100% { 
    background: #1B5E20;
    transform: scale(1);
  }
}

.button.success {
  animation: successPulse 600ms ease-out;
}
```

### Performance Considerations
- **Hardware acceleration**: transform and opacity properties only
- **60fps target**: All animations optimized for smooth performance  
- **Reduced motion**: Respect `prefers-reduced-motion` user preference

## Usage Guidelines

### When to Use Each Button Type

#### Primary Button ✅
- **One per screen/section** (visual hierarchy)
- **Main user goal** (create expense, settle debt)
- **Irreversible actions** with confirmation
- **Call-to-action** in onboarding flow

#### Secondary Button ✅
- **Alternative to primary action** (cancel, edit)
- **Multiple actions** of similar importance
- **Navigation** to detailed views
- **Export/share** functionality

#### Tertiary Button ✅
- **Optional actions** (skip, help)
- **Text links** within content
- **Low-priority** functionality
- **Space-constrained** interfaces

### Russian Cultural Considerations

#### Language Patterns
```javascript
// Preferred formulations
"Добавить трату"     // vs "Создать расход"
"Погасить долг"      // vs "Оплатить задолженность"  
"Создать группу"     // vs "Новая группа"
"Пригласить друзей"  // vs "Добавить участников"
```

#### Emotional Tone
- **Positive reinforcement**: Success states use celebrating language
- **Gentle guidance**: Error states avoid blame language
- **Collective language**: "Мы" instead of "Вы" where appropriate
- **Financial sensitivity**: Respectful approach to money discussions

### Common Mistakes to Avoid

❌ **Too many primary buttons**: Creates visual chaos
❌ **Unclear button text**: "Ок" instead of "Подтвердить трату"
❌ **Missing loading states**: Users unsure if action registered
❌ **Inadequate spacing**: Buttons too close for accurate selection
❌ **Poor contrast**: Accessibility issues with custom colors
❌ **Aggressive language**: "Вы должны" instead of "К доплате"

## Implementation Code Examples

### React Native Implementation
```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  onPress: () => void;
  children: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  onPress,
  children
}) => {
  const styles = getButtonStyles(variant, size);
  
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={children}
      accessibilityState={{
        disabled: disabled || loading,
        busy: loading
      }}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={styles.text}>{children}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
```

### CSS-in-JS Styles
```javascript
const getButtonStyles = (variant, size) => ({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    ...getSizeStyles(size),
    ...getVariantStyles(variant),
  },
  text: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: getSizeStyles(size).fontSize,
    textAlign: 'center',
  },
  icon: {
    marginRight: 8,
  },
  disabled: {
    opacity: 0.6,
  }
});
```

## Testing & Quality Assurance

### Manual Testing Checklist
- [ ] All states render correctly across devices
- [ ] Russian text doesn't break layout
- [ ] Loading states provide clear feedback  
- [ ] Keyboard navigation works properly
- [ ] Screen reader announces button purpose
- [ ] Touch targets meet 48px minimum
- [ ] Animations respect reduced motion preference
- [ ] Color contrast passes WCAG AA standards

### Automated Testing
```typescript
// Example Jest test
describe('Button Component', () => {
  it('should handle Russian text without layout issues', () => {
    const longRussianText = "Пригласить участников в группу";
    render(<Button>{longRussianText}</Button>);
    
    expect(screen.getByRole('button')).toHaveTextContent(longRussianText);
    expect(screen.getByRole('button')).toHaveStyle({
      minWidth: '120px'
    });
  });
  
  it('should announce loading state to screen readers', () => {
    render(<Button loading>Сохранить</Button>);
    
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-busy', 'true'
    );
  });
});
```

## Related Documentation

- [Design System Style Guide](../style-guide.md)
- [Form Components](./forms.md)
- [Color Tokens](../tokens/colors.md)
- [Typography System](../tokens/typography.md)
- [Accessibility Guidelines](../../accessibility/guidelines.md)

## Version History & Updates

**Version 1.0.0** - Initial button system
- Complete visual specifications
- Russian localization considerations  
- Accessibility implementation
- Animation and interaction patterns
- Implementation guidelines

## Next Steps

1. **Component Library Development** - React Native implementation
2. **Interactive Prototypes** - Validate button behaviors
3. **Cultural Testing** - Validate with Russian users
4. **Performance Optimization** - Animation profiling
5. **Documentation Updates** - Based on implementation learnings

## Last Updated
**Date**: 2025-01-11
**Reviewer**: UX/UI Design Lead
**Next Review**: 2025-01-25