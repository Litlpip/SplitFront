---
title: VibeSplit High-Fidelity Mockups & Russian Specifications
description: Detailed high-fidelity mockups with complete visual design, Russian localization, and cultural adaptations
feature: High-Fidelity Visual Mockups
last-updated: 2025-01-11
version: 1.0.0
related-files: 
  - screen-wireframes.md
  - ../design-system/style-guide.md
  - user-journey-analysis.md
dependencies:
  - Wireframe completion
  - Design system foundation
  - Russian cultural research
status: completed
---

# VibeSplit High-Fidelity Mockups & Russian Specifications

## Overview

Детальные high-fidelity mockups для VibeSplit с полным визуальным дизайном, российской локализацией и культурными адаптациями. Фокус на создании доверительной атмосферы и снижении социальной неловкости при обсуждении денег.

## Visual Design Mockups

### 1. Welcome Screen (Экран приветствия)

```
┌─────────────────────────────────────┐
│ ▓▓▓ 9:41 AM        100% ⚡ ▓▓▓      │ ← iOS status bar
├─────────────────────────────────────┤
│                                     │
│                                     │
│           🤝 VibeSplit              │ ← Brand logo #1B5E20
│                                     │
│          [Illustration:             │ ← Custom illustration
│         Friends at table            │   Russian context
│       sharing dinner happily]       │   Warm colors
│                                     │
│        Честно делим расходы         │ ← H1, #212121, Semibold
│          между друзьями             │   Center aligned
│                                     │
│                                     │
│  ✓ Никаких сложных расчетов        │ ← Benefits list
│  ✓ Деликатные напоминания           │   #4CAF50 checkmarks
│  ✓ Полная прозрачность              │   Body text #616161
│                                     │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │         Начать                  │ │ ← Primary button
│  │     [Linear gradient:           │ │   #1B5E20 → #4CAF50
│  │      #1B5E20 → #4CAF50]        │ │   White text, Bold
│  └─────────────────────────────────┘ │
│                                     │
│     Уже есть аккаунт? Войти        │ ← Tertiary button
│           #1976D2                   │   Medium weight
└─────────────────────────────────────┘
```

**Visual Specifications:**
- **Background**: Linear gradient from #F5F9FF to #E8F5E8
- **Illustration style**: Minimalist, friendly characters representing Russian young adults
- **Brand colors**: Primary green with trust-building blue accents
- **Typography hierarchy**: Clear Russian text hierarchy with Manrope font

### 2. Dashboard with Russian Context (Главный экран)

```
┌─────────────────────────────────────┐
│ ▓▓▓ 9:41 AM        100% ⚡ ▓▓▓      │
├─────────────────────────────────────┤
│                                     │
│ Доброе утро, Алиса! 👋             │ ← Personalized greeting
│                              [👤]  │   #212121, H3
│                                     │
│            Ваш баланс               │ ← Section header #757575
│  ┌─────────────────────────────────┐ │
│  │ ┌─────────────┐ ┌─────────────┐ │ │ ← Balance cards
│  │ │ Вам должны  │ │ Вы должны   │ │ │   Split layout
│  │ │ +2 450 ₽   │ │ -890 ₽     │ │ │   
│  │ │ [#2E7D32]  │ │ [#FF6B35]  │ │ │   Color coded
│  │ └─────────────┘ └─────────────┘ │ │
│  └─────────────────────────────────┘ │
│                                     │
│         Активные группы             │ ← Section #424242, H4
│                              ещё    │   Tertiary action
│                                     │
│  ┌─────────────────────────────────┐ │ ← Group card
│  │ 🍽️ Ужин в "Пушкине"             │ │   Card: white bg
│  │ 4 участника • Вчера             │ │   Shadow: soft
│  │ ⚠️ Ваш долг: 325 ₽              │ │   Orange accent
│  │ [А][М][Д][К]                    │ │   Avatar row
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 🎉 День рождения Кати           │ │
│  │ 8 участников • 3 дня назад      │ │
│  │ ✅ Все расчеты завершены        │ │   Success state
│  │ [А][Л][М][Д][К][А][Н][И]        │ │   #2E7D32
│  └─────────────────────────────────┘ │
│                                     │
│         Последние операции          │
│  • Алиса добавила "Кофе" - 240 ₽   │ ← Activity feed
│  • Петр погасил долг 200 ₽          │   #616161 text
│                                     │   8 minutes ago
├─────────────────────────────────────┤
│[🏠][👥][💸][👤]              [➕]   │ ← Tab bar + FAB
│ Главная Группы Долги Профиль       │   #1B5E20 active
│                                     │   #BDBDBD inactive
└─────────────────────────────────────┘
```

**Russian Cultural Elements:**
- **Restaurant name**: "Пушкин" - recognizable Russian restaurant
- **Greeting patterns**: Time-based greetings in Russian style
- **Activity language**: Natural Russian phrasing for financial actions
- **Avatar initials**: Cyrillic letters support
- **Relative dates**: "вчера", "3 дня назад" - natural Russian time expressions

### 3. Add Expense with Russian Payment Context

```
┌─────────────────────────────────────┐
│ ← Отмена    Новая трата      Готово │ ← Modal header
├─────────────────────────────────────┤
│                                     │
│           Сколько потратили?        │ ← H3, #212121
│                                     │
│  ┌─────────────────────────────────┐ │ ← Currency input
│  │         1 200,50 ₽              │ │   JetBrains Mono
│  │     [Blinking cursor]           │ │   #1B5E20, 24px
│  └─────────────────────────────────┘ │   Centered
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ Обед в ресторане "Белуга"       │ │ ← Description field
│  │ 🍽️                              │ │   Auto emoji suggestion
│  └─────────────────────────────────┘ │
│                                     │
│              Кто платил?            │ ← Payer selection
│                                     │
│  [👤Алиса] [👤Максим●] [👤Дмитрий] [👤Катя] │ ← Participant chips
│   #E3F2FD   #1976D2     #E3F2FD    #E3F2FD │   Selected state
│                                     │
│            Как разделить?           │
│                                     │
│  ⚪ Поровну между всеми             │ ← Radio buttons
│  🔘 Поровну кроме плательщика      │   Selected #1B5E20
│  ⚪ Неравномерно                    │
│                                     │
│              Участники              │
│  ☑️ Алиса        400,17 ₽          │ ← Auto-calculated
│  ☑️ Максим       —                 │   Payer excluded
│  ☑️ Дмитрий      400,17 ₽          │   JetBrains Mono
│  ☑️ Катя         400,16 ₽          │   Smart rounding
│                                     │
│  ┌─────────────────────────────────┐ │
│  │    📎 Прикрепить чек            │ │ ← Receipt option
│  │    [Camera] [Gallery]           │ │   Secondary button
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Russian Financial Context:**
- **Currency formatting**: "1 200,50 ₽" with space thousands separator
- **Restaurant names**: Real Moscow/Russian restaurant references
- **Rounding logic**: Russian kopeck handling with fair distribution
- **Payment methods**: Integration points for Russian payment systems
- **Language patterns**: "кто платил" vs "who paid" - natural Russian phrasing

### 4. Debt Settlement with Russian Payment Methods

```
┌─────────────────────────────────────┐
│ ← Отмена      Погасить долг    ✓    │
├─────────────────────────────────────┤
│                                     │
│              👤 Алисе               │ ← Creditor avatar
│           Алиса Петрова             │   Full name display
│                                     │
│           Сумма к доплате:          │ ← Debt context
│             450,00 ₽                │   Large currency display
│      за "Обед в ресторане"          │   Group context
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ Погашаю полностью               │ │ ← Amount selection
│  │         450,00 ₽                │ │   Default full amount
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ Перевел через СБП               │ │ ← Comment field
│  │                                 │ │   Russian context
│  └─────────────────────────────────┘ │
│                                     │
│            Способ оплаты            │
│                                     │
│  🏦 СБП (Система быстрых платежей)  │ ← Russian payment methods
│  💳 Перевод на карту Сбербанка     │   Localized options
│  💸 Наличными при встрече           │   Cultural norms
│  📱 ЮMoney                          │   Popular Russian wallets
│                                     │
│  ┌─────────────────────────────────┐ │
│  │         Отметить как            │ │ ← Primary action
│  │         оплаченное              │ │   Success color
│  │         [#2E7D32]               │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ℹ️ Алиса получит уведомление       │ ← Information note
│  и сможет подтвердить получение     │   #616161, Body small
└─────────────────────────────────────┘
```

**Russian Payment Integration:**
- **СБП**: Central Bank of Russia's fast payment system
- **Sberbank**: Reference to Russia's largest bank
- **YooMoney**: Major Russian digital wallet
- **Cash meetings**: Common Russian practice for debt settlement
- **Notification language**: Respectful, non-demanding tone

### 5. Groups Screen with Russian Social Context

```
┌─────────────────────────────────────┐
│ ← Группы                   + Создать │
├─────────────────────────────────────┤
│                                     │
│    [Search: 🔍 Найти группу...]     │ ← Search functionality
│                                     │
│  ┌─ Активные ─────────────────────┐  │ ← Collapsible sections
│  │ [Collapse arrow ▼]            │  │   #424242 header
│  │                               │  │
│  │  🍽️ Ужин в "Пушкине"          │  │ ← Group with debt
│  │  👤👤👤👤 4 участника          │  │   Visual participants
│  │  ⚠️ Ваш долг: 325 ₽           │  │   Orange warning
│  │  [Погасить] [Детали]          │  │   Quick actions
│  │                               │  │
│  │  🚗 Поездка на дачу           │  │ ← Travel context
│  │  👤👤👤👤👤👤 6 участников      │  │   Russian dacha culture
│  │  💰 Вам должны: 150 ₽         │  │   Positive balance
│  │  [Напомнить] [Детали]         │  │
│  │                               │  │
│  │  🎓 Сбор на подарок учителю   │  │ ← School context
│  │  👤👤👤👤👤 5 участников        │  │   Russian traditions
│  │  ⏳ Сбор в процессе...        │  │   Collection status
│  │  [Внести] [Детали]            │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌─ Завершенные ─────────────────┐   │ ← Completed section
│  │ [Collapse arrow ▶] (collapsed) │  │   Collapsed by default
│  └───────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────────┐ │ ← Quick create
│  │    ⚡ Быстро создать группу      │ │   Secondary button
│  │    для текущего события         │ │   Contextual suggestion
│  └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│[🏠][👥][💸][👤]              [➕]   │
└─────────────────────────────────────┘
```

**Russian Social Context Elements:**
- **Dacha trips**: Popular Russian weekend activity requiring group expenses
- **Teacher gifts**: Common Russian school tradition requiring collection
- **Restaurant references**: "Пушкин" - well-known upscale Moscow restaurant
- **Social dynamics**: Group sizes reflect typical Russian social gatherings
- **Action language**: "Напомнить" (remind) vs demanding payment

### 6. Debt Overview with Cultural Sensitivity

```
┌─────────────────────────────────────┐
│              Долги                  │
├─────────────────────────────────────┤
│                                     │
│           Общий баланс:             │ ← Overall balance
│             +1 560 ₽                │   Positive highlight
│         (вам больше должны)         │   Explanatory text
│                                     │
│  ┌─ К доплате ───────────────────┐   │ ← Softer language
│  │                               │   │   vs "Вы должны"
│  │  👤 Алисе Петровой    450 ₽   │   │ ← Full respectful names
│  │  "Ужин в ресторане"           │   │   Context provided
│  │  [Погасить] [СБП]             │   │ ← Quick payment options
│  │                               │   │
│  │  👤 Максиму Сидорову  125 ₽   │   │
│  │  "Поездка на дачу"            │   │
│  │  [Погасить] [Наличными]       │   │ ← Payment method hint
│  │                               │   │
│  └───────────────────────────────┘   │
│                                     │
│  ┌─ Ожидают от вас ──────────────┐   │ ← Positive framing
│  │                               │   │   vs "Вам должны"
│  │  👤 Дмитрия Козлова   325 ₽   │   │
│  │  "Ужин в ресторане"           │   │
│  │  ⏱️ 2 дня назад               │   │ ← Time context
│  │  [Деликатно напомнить]        │   │ ← Gentle reminder
│  │                               │   │
│  │  👤 Кати Смирновой    150 ₽   │   │
│  │  "День рождения"              │   │
│  │  💬 Написал вчера             │   │ ← Reminder status
│  │  [Подождать ещё]              │   │ ← Patient option
│  └───────────────────────────────┘   │
│                                     │
│  💡 Совет: напоминания отправляются │ ← Helpful tips
│     от имени группы, не от вас лично│   Cultural explanation
│                                     │
├─────────────────────────────────────┤
│[🏠][👥][💸][👤]                     │
└─────────────────────────────────────┘
```

**Cultural Sensitivity Features:**
- **Respectful naming**: Full names (Алиса Петрова) vs nicknames
- **Gentle language**: "К доплате" instead of "Вы должны" (You owe)
- **System messaging**: Reminders come from app, not person directly
- **Patience options**: "Подождать ещё" acknowledges social awkwardness
- **Context provision**: Always show what the debt is for

## Interaction Patterns & Micro-animations

### 1. Success Celebration Animation

```css
/* Debt settlement success animation */
@keyframes celebrateSuccess {
  0% { 
    transform: scale(1);
    background: #2E7D32;
  }
  25% { 
    transform: scale(1.05);
    background: linear-gradient(45deg, #2E7D32, #4CAF50);
  }
  50% { 
    transform: scale(1.1) rotate(2deg);
    box-shadow: 0 8px 25px rgba(46, 125, 50, 0.4);
  }
  75% { 
    transform: scale(1.05) rotate(-1deg);
  }
  100% { 
    transform: scale(1);
    background: #2E7D32;
  }
}

/* Confetti-like particle effect */
@keyframes celebrateParticles {
  0% { 
    opacity: 0;
    transform: translateY(0) scale(0);
  }
  50% { 
    opacity: 1;
    transform: translateY(-20px) scale(1);
  }
  100% { 
    opacity: 0;
    transform: translateY(-40px) scale(0.5);
  }
}
```

**Usage**: When debt is successfully settled or group is fully balanced

### 2. Gentle Notification Animation

```css
/* Soft pulse for debt reminders */
@keyframes gentleReminder {
  0%, 100% { 
    background: rgba(255, 107, 53, 0.1);
    transform: scale(1);
  }
  50% { 
    background: rgba(255, 107, 53, 0.2);
    transform: scale(1.02);
  }
}
```

**Usage**: Non-aggressive debt reminder notifications

### 3. Currency Input Animation

```css
/* Smooth formatting animation */
@keyframes currencyFormat {
  0% { 
    transform: translateX(0);
    opacity: 0.7;
  }
  50% { 
    transform: translateX(-5px);
    opacity: 1;
  }
  100% { 
    transform: translateX(0);
    opacity: 1;
  }
}
```

**Usage**: When Russian currency formatting is applied (1200 → 1 200,00 ₽)

## Russian Responsive Design Adaptations

### Mobile Portrait (375px)
- **Text scaling**: 16px base for comfortable Russian text reading
- **Touch targets**: 48px minimum for Cyrillic button text
- **Currency display**: Optimized for Russian ruble symbol placement

### Mobile Landscape (667px)  
- **Keyboard accommodation**: Reduced vertical spacing when Russian keyboard shown
- **Two-column layouts**: Balance cards side-by-side
- **Horizontal scrolling**: For participant selection with Russian names

### Tablet (768px+)
- **Sidebar navigation**: Russian menu labels with proper spacing
- **Multi-column lists**: 2-3 column group/debt layouts
- **Enhanced typography**: 18px base for better Russian text readability

## Accessibility with Russian Considerations

### Screen Reader Russian Support
```html
<!-- Proper Russian currency announcement -->
<span aria-label="Тысяча двести рублей пятьдесят копеек">
  1 200,50 ₽
</span>

<!-- Contextual debt information -->
<button aria-label="Погасить долг Алисе Петровой четыреста пятьдесят рублей за ужин в ресторане">
  Погасить 450 ₽
</button>

<!-- Group status announcement -->
<div aria-live="polite" aria-label="Группа Ужин в ресторане, четыре участника, ваш долг триста двадцать пять рублей">
  🍽️ Ужин в ресторане...
</div>
```

### Russian Color Accessibility
- **High contrast mode**: Enhanced contrast for Cyrillic text
- **Cultural color meanings**: Green (success) and red (caution) aligned with Russian expectations
- **Icon + text combinations**: All critical information has both visual and textual indicators

## Implementation Specifications

### Russian Font Loading
```css
@font-face {
  font-family: 'Manrope';
  src: url('./fonts/Manrope-Variable.woff2') format('woff2');
  font-display: swap;
  unicode-range: U+0400-04FF, U+0500-052F; /* Cyrillic ranges */
}
```

### Currency Formatting Logic
```javascript
const formatRussianCurrency = (amount) => {
  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return formatter.format(amount)
    .replace('₽', ' ₽') // Add space before ruble symbol
    .replace(',', ','); // Ensure Russian decimal separator
};

// Usage examples:
// 1200.50 → "1 200,50 ₽"
// 450 → "450,00 ₽"
```

### Russian Date Formatting
```javascript
const formatRussianDate = (date) => {
  const rtf = new Intl.RelativeTimeFormat('ru', { numeric: 'auto' });
  const now = new Date();
  const diffTime = date - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'сегодня';
  if (diffDays === -1) return 'вчера';
  if (diffDays > -7) return `${Math.abs(diffDays)} дня назад`;
  
  return date.toLocaleDateString('ru-RU');
};
```

## Quality Assurance Checklist

### Visual Design Validation
- [ ] All Russian text renders correctly without overflow
- [ ] Currency formatting follows Russian standards (space separator, comma decimal)
- [ ] Color combinations maintain WCAG AA contrast with Cyrillic text
- [ ] Icons are culturally appropriate and recognizable
- [ ] Animations feel natural and not jarring for financial contexts

### Cultural Validation
- [ ] Language tone is respectful and non-confrontational
- [ ] Payment methods reflect Russian market reality
- [ ] Social scenarios align with Russian cultural patterns
- [ ] Names and contexts feel authentic to Russian users
- [ ] Debt settlement language maintains social harmony

### Technical Validation  
- [ ] Responsive layouts work with longer Russian text strings
- [ ] Touch targets accommodate Cyrillic button text
- [ ] Screen readers properly announce Russian financial information
- [ ] Keyboard navigation works with Russian input methods
- [ ] Performance remains smooth with Russian font loading

## Related Documentation

- [Screen Wireframes](./screen-wireframes.md)
- [Design System Style Guide](../design-system/style-guide.md)
- [User Journey Analysis](./user-journey-analysis.md)
- [Button Component System](../design-system/components/buttons.md)
- [Accessibility Guidelines](../accessibility/guidelines.md)

## Next Steps

1. **Interactive Prototypes** - Create clickable prototypes for testing
2. **Cultural User Testing** - Validate designs with Russian target users
3. **Performance Optimization** - Optimize images and animations
4. **Developer Handoff** - Prepare detailed implementation specifications
5. **Accessibility Testing** - Validate with Russian screen readers

## Version History

**Version 1.0.0** - Initial high-fidelity mockup system
- Complete visual designs with Russian cultural adaptations
- Currency, date, and payment method localizations
- Culturally sensitive language and interaction patterns
- Accessibility considerations for Russian users
- Technical implementation specifications

## Last Updated
**Date**: 2025-01-11  
**Next Review**: 2025-01-18  
**Reviewer**: UX/UI Design Lead