---
title: VibeSplit Design System Style Guide
description: Complete visual design system for VibeSplit expense sharing app with Russian localization considerations
feature: Complete Design System
last-updated: 2025-01-11
version: 1.0.0
related-files: 
  - tokens/colors.md
  - tokens/typography.md
  - components/buttons.md
  - components/forms.md
dependencies:
  - User journey analysis completion
  - Competitive research findings
  - Russian cultural considerations
status: completed
---

# VibeSplit Design System Style Guide

## Overview

VibeSplit Design System создана для обеспечения последовательного, доступного и культурно-адаптированного пользовательского опыта в приложении для разделения расходов. Система учитывает российские культурные особенности и поведенческие паттерны, создавая интуитивный интерфейс для честного разделения совместных трат.

## Design Philosophy

### Core Principles

#### 1. **Доверительная простота (Trust-driven Simplicity)**
Снижение когнитивной нагрузки и социальной неловкости через максимально простые и понятные интерфейсы. Каждый элемент должен способствовать созданию атмосферы доверия и открытости.

#### 2. **Культурная деликатность (Cultural Sensitivity)**
Интерфейс учитывает российские особенности общения и отношения к деньгам. Мягкие формулировки, коллективная ответственность вместо персональных обвинений.

#### 3. **Эмоциональная безопасность (Emotional Safety)**
Дизайн минимизирует стресс от финансовых обсуждений. Позитивные подкрепления, деликатные напоминания, празднование успехов.

#### 4. **Мгновенная ясность (Instant Clarity)**
Пользователь должен понимать свои финансовые обязательства с первого взгляда. Визуальная иерархия приоритизирует самую важную информацию.

#### 5. **Респективная доступность (Inclusive Accessibility)**
Соответствие WCAG AA стандартам с особым вниманием к российским пользователям разных возрастов и технической грамотности.

## 1. Color System

### Primary Colors

**Primary**: `#1B5E20` (Forest Green)
- Usage: Основные CTA, подтверждения, положительные балансы
- Emotional Association: Стабильность, рост, доверие
- Russian Context: Ассоциация с природой, безопасностью, "зелеными" деньгами

**Primary Dark**: `#0D3D0F` 
- Usage: Hover states, активные кнопки, акценты
- Application: Pressed states, navigation highlights

**Primary Light**: `#E8F5E8`
- Usage: Фоны положительных состояний, success highlights
- Application: Успешные операции, подтверждения

### Secondary Colors

**Secondary**: `#1976D2` (Professional Blue)
- Usage: Информационные элементы, нейтральные действия  
- Emotional Association: Надежность, профессионализм
- Russian Context: Корпоративные стандарты, деловое общение

**Secondary Light**: `#E3F2FD`
- Usage: Информационные блоки, нейтральные фоны
- Application: Подсказки, неактивные состояния

**Secondary Pale**: `#F5F9FF` 
- Usage: Очень деликатные фоны, выделение групп
- Application: Card backgrounds, section dividers

### Accent Colors

**Accent Primary**: `#FF6B35` (Warm Orange)
- Usage: Уведомления о долгах, важные предупреждения
- Emotional Association: Внимание без агрессии
- Russian Context: Теплота, дружелюбие вместо тревоги

**Accent Secondary**: `#7B1FA2` (Royal Purple)
- Usage: Премиум функции, особые события
- Application: Celebrations, achievements, premium content

**Gradient Start**: `#1B5E20`
**Gradient End**: `#4CAF50`
- Usage: Hero sections, successful completion states
- Application: Onboarding, success celebrations

### Semantic Colors

**Success**: `#2E7D32` (Rich Green)
- Usage: Успешные погашения долгов, подтверждения
- Contrast Ratio: 7.2:1 with white background
- Application: Success messages, completed settlements

**Warning**: `#F57C00` (Amber)
- Usage: Предупреждения о больших долгах, напоминания
- Emotional Tone: Осторожность без паники
- Application: Pending settlements, attention needed

**Error**: `#C62828` (Controlled Red)
- Usage: Ошибки, отклоненные операции
- Russian Context: Минимальное использование, только критические ситуации
- Application: Failed payments, critical errors only

**Info**: `#0277BD` (Ocean Blue)
- Usage: Нейтральная информация, обучающие подсказки
- Application: Tooltips, help messages, neutral notifications

### Neutral Palette

- `Neutral-50`: `#FAFAFA` - Основные фоны
- `Neutral-100`: `#F5F5F5` - Альтернативные фоны
- `Neutral-200`: `#EEEEEE` - Границы, разделители
- `Neutral-300`: `#E0E0E0` - Неактивные элементы
- `Neutral-400`: `#BDBDBD` - Placeholder text
- `Neutral-500`: `#9E9E9E` - Вторичный текст
- `Neutral-600`: `#757575` - Основной вторичный текст
- `Neutral-700`: `#616161` - Основной текст
- `Neutral-800`: `#424242` - Заголовки
- `Neutral-900`: `#212121` - Высококонтрастный текст

### Accessibility Notes
- Все цветовые комбинации обеспечивают контраст 4.5:1 для обычного текста
- Критически важные элементы поддерживают контраст 7:1
- Палитра проверена на дальтонизм (Protanopia, Deuteranopia, Tritanopia)
- Альтернативные индикаторы (иконки, паттерны) для цветозависимой информации

## 2. Typography System

### Font Stack
**Primary**: `'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif`
**Reasoning**: Manrope обеспечивает отличную читаемость на кириллице, humanistic character, modern feel

**Monospace**: `'JetBrains Mono', 'SF Mono', Consolas, 'Liberation Mono', monospace`
**Usage**: Денежные суммы, коды, технические данные

### Font Weights
- **Light**: 300 (Редкое использование, только для больших заголовков)
- **Regular**: 400 (Основной текст)
- **Medium**: 500 (Субтитры, важная информация)
- **Semibold**: 600 (Заголовки секций)
- **Bold**: 700 (Основные заголовки, критически важные данные)

### Type Scale & Russian Localization

#### Headings
**H1**: `32px/40px, Semibold, -0.01em`
- Usage: Название экрана, главные заголовки
- Russian Example: "Мои группы", "Настройки"
- Mobile: 28px/36px

**H2**: `24px/32px, Semibold, -0.005em`
- Usage: Заголовки секций
- Russian Example: "Активные долги", "История операций"
- Mobile: 22px/28px

**H3**: `20px/28px, Medium, 0em`
- Usage: Заголовки карточек
- Russian Example: "Ужин в ресторане", "Поездка на дачу"
- Mobile: 18px/24px

**H4**: `18px/24px, Medium, 0.005em`
- Usage: Подзаголовки
- Russian Example: "Участники", "Детали платежа"

**H5**: `16px/20px, Medium, 0.01em`
- Usage: Мелкие заголовки
- Russian Example: "Общая сумма", "К доплате"

#### Body Text
**Body Large**: `18px/28px, Regular`
- Usage: Основной текст для чтения, описания
- Russian Context: Комфортный для кириллицы размер

**Body**: `16px/24px, Regular`
- Usage: Стандартный UI текст, кнопки
- Most Common: Большинство интерфейсного текста

**Body Small**: `14px/20px, Regular`
- Usage: Вторичная информация, метаданные
- Russian Example: "2 дня назад", "Обновлено"

**Caption**: `12px/16px, Regular`
- Usage: Подписи, timestamps, вспомогательная информация
- Russian Example: "Создано 15.03.2024", "Версия 1.2.1"

#### Specialized Text
**Label**: `14px/16px, Medium, uppercase`
- Usage: Метки форм, категории
- Russian Example: "СУММА", "УЧАСТНИКИ"
- Note: Осторожное использование uppercase с кириллицей

**Currency**: `'JetBrains Mono', 18px/24px, Semibold`
- Usage: Денежные суммы, расчеты
- Russian Format: "1 500,50 ₽" (пробел + запятая + рубль)
- Alignment: Табличное выравнивание для списков

### Responsive Typography Rules

#### Mobile (320-767px)
- Базовый размер: 16px
- Масштабный коэффициент: 1.2
- Межстрочный интервал: +4px к стандарту
- Особенность: Увеличенные кнопки для пальцевого управления

#### Tablet (768-1023px)  
- Базовый размер: 16px
- Масштабный коэффициент: 1.25
- Промежуточные размеры между мобильной и десктопной версиями

#### Desktop (1024px+)
- Базовый размер: 18px для улучшенной читаемости
- Оптимальная длина строки: 45-75 символов
- Увеличенные интерлиньи для комфортного чтения

### Russian Typography Considerations

#### Кириллические особенности:
- **Более широкие символы**: Увеличенный трекинг (letter-spacing) для H1-H3
- **Высота строчных букв**: Manrope оптимизирован для кириллицы
- **Ударения**: Поддержка диакритических знаков без отсечения

#### Культурные паттерны:
- **Формальность**: "Вы" с большой буквы в официальных сообщениях
- **Склонения**: Учет падежных форм в динамическом контенте
- **Числительные**: "1 рубль", "2-4 рубля", "5+ рублей"

## 3. Spacing & Layout System

### Base Unit
**Base Unit**: `8px` (iOS/Android standard)
**Micro Unit**: `4px` для fine-tuning

### Spacing Scale
- **xs**: `4px` - Внутренние отступы иконок, borders
- **sm**: `8px` - Минимальные отступы элементов
- **md**: `16px` - Стандартные отступы компонентов
- **lg**: `24px` - Отступы между секциями
- **xl**: `32px` - Отступы между крупными блоками
- **2xl**: `48px` - Screen padding, отступы от краев
- **3xl**: `64px` - Hero sections, major separations

### Layout Patterns

#### Mobile-First Grid System
- **Columns**: 4 (mobile), 8 (tablet), 12 (desktop)
- **Gutters**: 16px (mobile), 20px (tablet), 24px (desktop)
- **Margins**: 16px (mobile), 32px (tablet), auto-center (desktop)

#### Container Sizes
- **Mobile**: Full width - 32px margins
- **Tablet**: 768px max-width
- **Desktop**: 1200px max-width
- **Wide**: 1440px max-width with content centering

#### Safe Areas & Russian Context
- **iOS**: Учет Dynamic Island, notches
- **Android**: Navigation gesture areas
- **Cultural**: Достаточно места для длинных русских текстов

## 4. Component Specifications

### Buttons

#### Primary Button
**Visual Specifications**:
- Height: `48px` (mobile), `40px` (desktop)
- Padding: `16px` horizontal, `12px` vertical
- Border Radius: `8px`
- Background: `Primary (#1B5E20)`
- Text: `16px, Medium, White`
- Shadow: `0 2px 4px rgba(27, 94, 32, 0.2)`

**States**:
- **Default**: Primary color, subtle shadow
- **Hover**: Primary Dark (`#0D3D0F`), increased shadow
- **Active**: Deeper press state, reduced shadow
- **Focus**: 3px outline `Primary` color, offset 2px
- **Disabled**: `Neutral-300` background, `Neutral-500` text
- **Loading**: Spinner animation, disabled interaction

**Russian Context**:
- Text: "Добавить трату", "Погасить долг", "Создать группу"
- Width: Flexible to accommodate longer Russian text

#### Secondary Button  
**Visual Specifications**:
- Height: `48px` (mobile), `40px` (desktop)
- Padding: `16px` horizontal, `12px` vertical  
- Border: `2px solid Primary`
- Background: `Transparent`
- Text: `16px, Medium, Primary`
- Border Radius: `8px`

#### Tertiary/Ghost Button
**Visual Specifications**:
- Height: `48px` (mobile), `40px` (desktop)
- Padding: `16px` horizontal, `12px` vertical
- Background: `Transparent`
- Text: `16px, Medium, Primary`
- No border, subtle hover background

### Form Elements

#### Text Input Fields
**Visual Specifications**:
- Height: `48px` minimum
- Padding: `12px 16px`
- Border: `1px solid Neutral-300`
- Border Radius: `8px`
- Background: `White`
- Font: `Body (16px)` to prevent iOS zoom

**States & Russian Localization**:
- **Default**: Neutral border, placeholder in `Neutral-500`
- **Focus**: `Primary` border, no outline (custom focus ring)
- **Filled**: Darker text, maintained focus state
- **Error**: `Error` border, error message below in `Error` color
- **Disabled**: `Neutral-100` background, `Neutral-400` text

**Russian Placeholders**:
- "Введите сумму..." (денежные поля)
- "Описание траты..." (текстовые поля)
- "Имя участника..." (пользовательские данные)

#### Currency Input (Special)
**Visual Specifications**:
- Font: `JetBrains Mono, 18px, Semibold`
- Placeholder: "0,00 ₽"
- Input mask: Automatic formatting "1 500,50 ₽"
- Alignment: Right-aligned for better UX

### Cards & Containers

#### Primary Card
**Visual Specifications**:
- Background: `White`
- Border Radius: `12px`
- Shadow: `0 2px 8px rgba(0, 0, 0, 0.08)`
- Padding: `16px` (mobile), `20px` (desktop)
- Border: None

**Usage**: Группы трат, детали операций, профиль

#### List Item Card
**Visual Specifications**:
- Background: `White`
- Border: `1px solid Neutral-200`
- Border Radius: `8px`  
- Padding: `12px 16px`
- Min-height: `56px`

**Usage**: Списки трат, участники, история

### Navigation Elements

#### Tab Bar (Primary Navigation)
**Visual Specifications**:
- Height: `80px` (safe area included)
- Background: `White`
- Border Top: `1px solid Neutral-200`
- Tab Item Size: `24px` icon + `12px` label
- Active Color: `Primary`
- Inactive Color: `Neutral-500`

**Russian Labels**:
- "Главная" (Home/Dashboard)
- "Группы" (Groups)
- "Долги" (Debts)
- "Профиль" (Profile)

#### Floating Action Button (FAB)
**Visual Specifications**:
- Size: `56px` diameter
- Position: 16px from bottom-right (above tab bar)
- Background: `Primary`
- Icon: `Plus` or `Add`, 24px, White
- Shadow: `0 4px 12px rgba(27, 94, 32, 0.3)`
- Elevation: 6dp (Material Design)

## 5. Motion & Animation System

### Timing Functions & Russian UX Preferences

#### Easing Curves
**Ease-out**: `cubic-bezier(0.0, 0, 0.2, 1)`
- Usage: Входящие элементы, раскрытие меню
- Russian Context: Быстрое появление информации о долгах

**Ease-in-out**: `cubic-bezier(0.4, 0, 0.6, 1)`
- Usage: Переходы между экранами
- Cultural Note: Плавные переходы снижают стресс от финансовых данных

**Spring**: `tension: 300, friction: 30`
- Usage: Успешные операции, положительный фидбек
- Emotional: Празднование погашенных долгов

### Duration Scale
- **Micro**: 150ms - Hover states, button press feedback
- **Short**: 300ms - Modal появление, dropdown menus  
- **Medium**: 500ms - Screen transitions, card animations
- **Long**: 700ms - Onboarding sequences, success celebrations

### Animation Patterns

#### Success Celebrations
```css
@keyframes celebrateSuccess {
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.05) rotate(2deg); }
  100% { transform: scale(1) rotate(0deg); }
}
```
**Usage**: Успешное погашение долгов, создание группы
**Duration**: 500ms
**Cultural**: Позитивное подкрепление успешных действий

#### Loading States
```css
@keyframes pulseLoading {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
```
**Usage**: Загрузка данных, синхронизация
**Duration**: 1200ms infinite
**UX**: Снижение тревожности при обработке финансовых данных

#### Smooth Transitions
- **Page transitions**: Slide left/right (iOS), slide up (Android)
- **Modal presentations**: Fade in background + slide up content
- **List updates**: Fade in new items, slide out removed

### Performance Standards
- **60fps minimum** для всех анимаций
- **Hardware acceleration**: transform и opacity приоритет
- **Reduced motion**: Уважение к `prefers-reduced-motion`
- **Battery awareness**: Снижение анимаций при низком заряде

## 6. Icon System & Russian Context

### Icon Style
**Style**: Outlined (stroke-based) для консистентности
**Weight**: 2px stroke width
**Size Grid**: 16px, 20px, 24px, 32px
**Fill Variant**: Для активных состояний

### Core Icons & Meanings

#### Financial Icons
- **Wallet**: Общий баланс, финансовый профиль
- **Receipt**: Добавление траты, чеки
- **Users**: Группы участников
- **Calculator**: Расчеты, деление сумм
- **Check Circle**: Успешные операции, погашенные долги

#### Russian Cultural Icons  
- **Ruble Symbol**: ₽ для российских пользователей
- **Friends Group**: Дружеские компании (не формальные)
- **Restaurant**: Популярный контекст трат
- **Car**: Поездки, командировки, дачи

#### Emotional State Icons
- **Happy**: Успешные погашения
- **Neutral Info**: Нейтральная информация
- **Gentle Warning**: Мягкие напоминания о долгах
- **Celebration**: Закрытие группы без долгов

## 7. Platform-Specific Adaptations

### iOS Adaptations
- **SF Symbols**: Integration where appropriate
- **Navigation patterns**: Swipe back gesture support
- **Safe areas**: Dynamic Island, notch handling
- **Haptic feedback**: Success vibrations, selection feedback
- **Typography**: San Francisco fallback for system elements

### Android Adaptations  
- **Material 3**: Elevation system, dynamic color theming
- **Navigation**: Back button behavior, navigation drawer
- **Typography**: Roboto fallback, support for system fonts
- **Status bar**: Adaptive coloring based on content
- **Adaptive icons**: Support for various launcher icon shapes

### Cross-Platform Consistency
- **Core colors** остаются идентичными
- **Typography scale** адаптируется под платформенные нормы
- **Component behaviors** следуют platform conventions
- **Animation timings** оптимизированы для каждой платформы

## 8. Accessibility Implementation

### WCAG AA Compliance

#### Color Contrast Requirements
- **Normal text**: 4.5:1 minimum ratio
- **Large text** (18px+): 3:1 minimum ratio  
- **Critical elements**: 7:1 preferred ratio
- **Non-text elements**: 3:1 for UI components

#### Russian Accessibility Considerations
- **Cyrillic readability**: Manrope optimized for Russian characters
- **Cultural literacy**: Clear, simple language avoiding financial jargon
- **Age inclusivity**: Readable sizes for 40+ demographic
- **Technical literacy**: Intuitive icons with text labels

### Keyboard Navigation
- **Tab order**: Logical flow through financial information
- **Focus indicators**: 3px outline with 2px offset
- **Skip links**: "Перейти к основному содержимому"
- **Shortcut keys**: Common actions accessible via keyboard

### Screen Reader Support
- **Semantic HTML**: Proper headings, lists, landmarks
- **ARIA labels**: Russian language descriptions
- **Live regions**: Announce balance changes, debt updates
- **Currency announcements**: "Тысяча пятьсот рублей пятьдесят копеек"

### Motor Accessibility
- **Touch targets**: 44px minimum (iOS), 48dp (Android)
- **Spacing**: 8px minimum between interactive elements
- **Gesture alternatives**: All swipe actions have button equivalents
- **Timeout extensions**: Extended time for complex financial forms

## 9. Content Strategy & Russian Localization

### Voice & Tone Guidelines

#### Core Voice Attributes
- **Trustworthy** но не холодный
- **Helpful** без поучительности  
- **Friendly** с соблюдением личных границ
- **Clear** без финансового жаргона

#### Tone Variations by Context

**Success States**: Радостный и празднующий
```
✅ "Отлично! Долг погашен"
🎉 "Группа полностью расчиталась!"
```

**Error States**: Полезный без обвинений
```
⚠️ "Проверьте сумму и попробуйте снова"
❌ "Не удалось подключиться. Повторим?"
```

**Debt Reminders**: Деликатный и мягкий
```
💙 "Дмитрий отметил оплату общего счета"
📱 "В группе 'Ужин' есть неоплаченные расходы"
```

### Russian Cultural Adaptations

#### Communication Patterns
- **Избегание прямых обвинений**: "Группе нужно урегулировать расходы"
- **Коллективная ответственность**: "Мы разделили счет"
- **Позитивные формулировки**: "Доплатить" вместо "Долг"

#### Contextual Scenarios
- **Ресторанные счета**: Поддержка чаевых, service charges
- **Дачные поездки**: Групповые закупки, транспорт
- **Студенческая жизнь**: Мелкие суммы, общие покупки
- **Корпоративные траты**: Командировки, рабочие обеды

## Implementation Guidelines

### Design Token Structure
```json
{
  "color": {
    "primary": {
      "500": "#1B5E20",
      "600": "#0D3D0F",
      "100": "#E8F5E8"
    }
  },
  "typography": {
    "heading": {
      "h1": {
        "fontSize": "32px",
        "lineHeight": "40px",
        "fontWeight": "600"
      }
    }
  },
  "spacing": {
    "md": "16px",
    "lg": "24px"
  }
}
```

### Component Development Priority
1. **Core components**: Button, Input, Card (Week 1)
2. **Layout components**: Header, Tab Bar, FAB (Week 2)  
3. **Complex components**: Form, Modal, List (Week 3)
4. **Specialized components**: Currency Input, Debt Card (Week 4)

### Quality Assurance Checklist
- [ ] All color combinations tested for accessibility
- [ ] Typography renders correctly with Russian text
- [ ] Animations respect reduced motion preferences
- [ ] Components work across iOS and Android
- [ ] Voice and tone consistent throughout
- [ ] Cultural sensitivity review completed

## Related Documentation

- [Color Tokens](./tokens/colors.md)
- [Typography System](./tokens/typography.md)
- [Component Library](./components/)
- [Accessibility Guidelines](../accessibility/guidelines.md)
- [Platform Adaptations](./platform-adaptations/)

## Version History

**Version 1.0.0** - Initial comprehensive design system
- Complete color system with Russian cultural considerations
- Typography system optimized for Cyrillic
- Core component specifications
- Animation and motion guidelines
- Accessibility implementation plan

## Next Steps

1. **Design Tokens Export** - JSON/CSS for development team
2. **Component Library Development** - Detailed specifications
3. **Prototype Creation** - Interactive demos for testing
4. **Cultural Validation** - Testing with Russian users
5. **Developer Handoff** - Implementation guidelines

## Last Updated
**Date**: 2025-01-11  
**Next Review**: 2025-01-25  
**Reviewer**: UX/UI Design Lead