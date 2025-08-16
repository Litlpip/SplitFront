# VibeSplit - Техническая архитектура PWA приложения

## Обзор архитектуры

### Executive Summary

VibeSplit - современное веб-приложение с Progressive Web App (PWA) технологией для разделения совместных расходов, построенное на React с TypeScript. Приложение обеспечивает кроссплатформенность через единую кодовую базу с возможностью установки на домашний экран Android, iOS и десктоп устройств.

**Ключевые архитектурные решения:**
- **React + PWA**: Кроссплатформенная веб-разработка с нативным опытом
- **TypeScript**: Строгая типизация для надежности кода
- **Vite**: Быстрая сборка с HMR и нативной TypeScript поддержкой
- **Chakra UI**: Доступная и масштабируемая система компонентов
- **Zustand + React Query**: Гибридное управление состоянием (client/server state)
- **Service Workers**: Офлайн-функциональность и кэширование
- **React Hook Form**: Эффективное управление формами
- **JWT Authentication**: Безопасная аутентификация с хранением в localStorage

### Системные компоненты

```
VibeSplit PWA
├── Build Layer (Vite + TypeScript)
├── UI Layer (React + Chakra UI)
├── State Management Layer (Zustand + React Query)  
├── API Integration Layer (Fetch API + React Query)
├── Navigation Layer (React Router)
├── PWA Layer (Service Workers + Web App Manifest)
├── Security Layer (JWT + Web Crypto API)
└── Storage Layer (localStorage + IndexedDB)
```

## 1. Технологический стек

### 1.1 Инструменты сборки и разработки

**Vite как основной сборщик:**

Выбор Vite обоснован следующими преимуществами для PWA разработки в 2025:

- **Мгновенная загрузка**: Vite использует ESM в браузере для мгновенного запуска dev-сервера
- **Молниеносный HMR**: Обновления происходят за миллисекунды независимо от размера приложения
- **Нативная TypeScript поддержка**: Встроенная поддержка без дополнительной настройки
- **PWA оптимизация**: Отличная поддержка Service Workers и Web App Manifest
- **Современный подход**: Построен с нуля для современного JavaScript/TypeScript
- **Простая конфигурация**: Минимальная настройка для большинства случаев

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24, // 24 часа
                maxEntries: 100,
              },
            },
          },
        ],
      },
      manifest: {
        name: 'VibeSplit',
        short_name: 'VibeSplit',
        description: 'Приложение для разделения расходов',
        theme_color: '#0066cc',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@chakra-ui/react', '@emotion/react'],
          utils: ['@tanstack/react-query', 'zustand'],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
    open: true,
  },
  preview: {
    port: 3000,
    host: true,
  },
});
```

### 1.2 UI-библиотека: Chakra UI

**Выбор Chakra UI обоснован следующими критериями для VibeSplit:**

✅ **Подходит для проекта:**
- **PWA совместимость**: Отлично работает в веб-среде с полной поддержкой responsive design
- **Accessibility by default**: Встроенная поддержка WCAG 2.1, что критично для финансового приложения
- **Темная/светлая тема**: Нативная поддержка ColorMode без дополнительной настройки
- **Мобильная адаптивность**: Responsive props из коробки (display={{base: 'none', md: 'block'}})
- **TypeScript поддержка**: Полная типизация всех компонентов
- **Быстрая разработка**: Богатый набор готовых компонентов
- **Кастомизация**: Гибкая система тем и tokens
- **Производительность**: Emotion под капотом с CSS-in-JS оптимизациями

```typescript
// theme/index.ts - Кастомная тема для VibeSplit
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#e6f3ff',
      100: '#b3d9ff',
      200: '#80bfff',
      300: '#4da6ff',
      400: '#1a8cff',
      500: '#0066cc', // Primary brand color
      600: '#0052a3',
      700: '#003d7a',
      800: '#002952',
      900: '#001429',
    },
    success: {
      500: '#22c55e',
    },
    error: {
      500: '#ef4444',
    },
    warning: {
      500: '#f59e0b',
    },
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
      variants: {
        solid: {
          _hover: {
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
        ghost: {
          _hover: {
            bg: 'gray.50',
            _dark: {
              bg: 'gray.700',
            },
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          boxShadow: 'sm',
          _hover: {
            boxShadow: 'md',
          },
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'gray.50',
            _dark: {
              bg: 'gray.700',
            },
            _focus: {
              bg: 'white',
              _dark: {
                bg: 'gray.600',
              },
            },
          },
        },
      },
      defaultProps: {
        variant: 'filled',
      },
    },
  },
  breakpoints: {
    sm: '30em',   // 480px
    md: '48em',   // 768px
    lg: '62em',   // 992px
    xl: '80em',   // 1280px
    '2xl': '96em', // 1536px
  },
});

export default theme;
```

**Основные компоненты Chakra UI для VibeSplit:**

```typescript
// components/ui/index.ts - Экспорт UI компонентов
export {
  Box,
  Flex,
  VStack,
  HStack,
  Stack,
  Container,
  SimpleGrid,
  Grid,
  GridItem,
} from '@chakra-ui/react'; // Layout

export {
  Button,
  IconButton,
  ButtonGroup,
} from '@chakra-ui/react'; // Buttons

export {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Textarea,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
} from '@chakra-ui/react'; // Forms

export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@chakra-ui/react'; // Cards

export {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react'; // Overlays

export {
  Text,
  Heading,
  Link,
  Code,
  Kbd,
  Mark,
  List,
  ListItem,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'; // Typography

export {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Badge,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from '@chakra-ui/react'; // Display

export {
  Spinner,
  Progress,
  CircularProgress,
  CircularProgressLabel,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react'; // Feedback

export {
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'; // Notifications

export {
  useColorMode,
  useColorModeValue,
  ColorModeScript,
} from '@chakra-ui/react'; // Color Mode

export {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'; // Navigation
```

## 2. Архитектура приложения

### 2.1 Общая структура PWA проекта

```
src/
├── components/           # Переиспользуемые UI компоненты
│   ├── ui/              # Кастомные компоненты на базе Chakra UI
│   ├── forms/           # Form компоненты с Chakra UI + React Hook Form
│   └── layout/          # Layout компоненты на Chakra UI
├── pages/               # Страницы приложения
│   ├── auth/           # Аутентификация
│   ├── groups/         # Управление группами (events)  
│   ├── expenses/       # Управление тратами (purchases)
│   └── debts/          # Управление долгами
├── router/             # React Router конфигурация
├── services/           # API сервисы и внешние интеграции
│   ├── api/           # HTTP клиент и API методы
│   ├── auth/          # Сервисы аутентификации
│   ├── sw/            # Service Worker логика
│   └── storage/       # Веб-хранилище (localStorage, IndexedDB)
├── store/             # Zustand stores
├── types/             # TypeScript типы и интерфейсы
├── utils/             # Утилиты и helpers
├── hooks/             # Custom hooks
├── theme/             # Chakra UI тема и конфигурация
├── constants/         # Константы и конфигурация
public/
├── manifest.json      # Web App Manifest
├── sw.js             # Service Worker
├── icons/            # PWA иконки
└── offline.html      # Офлайн страница
vite.config.ts         # Конфигурация Vite
tsconfig.json          # TypeScript конфигурация
```

### 2.2 Архитектурные принципы PWA

**Progressive Enhancement**: Приложение работает на всех устройствах с постепенным улучшением
**Mobile-First Design**: Приоритет мобильного опыта с адаптацией под большие экраны
**Offline-First**: Возможность работы без интернета через Service Workers
**Feature-Based Architecture**: Организация по функциональности, а не по типу файлов
**Separation of Concerns**: Четкое разделение UI, бизнес-логики и состояния
**Single Responsibility**: Каждый компонент отвечает за одну задачу
**Dependency Injection**: Использование React Context и custom hooks

### 2.3 Ключевые архитектурные паттерны PWA

- **Container/Presentation Pattern**: Разделение логики и отображения
- **Custom Hooks Pattern**: Инкапсуляция бизнес-логики
- **Provider Pattern**: Глобальное состояние через Context
- **Repository Pattern**: Абстракция работы с API
- **Service Worker Pattern**: Кэширование и офлайн-функциональность
- **Responsive Design Pattern**: Адаптивный дизайн для всех устройств

## 3. State Management Architecture

### 3.1 Стратегия управления состоянием

**Гибридный подход**: Zustand для client state + React Query для server state

```typescript
// Разделение ответственности состояния
Client State (Zustand):
- Состояние UI (модалки, формы, навигация)
- Пользовательские настройки
- Локальные флаги и временные данные

Server State (React Query):
- Данные с сервера (groups, expenses, debts, users)
- Кэширование и синхронизация
- Оптимистичные обновления
```

### 3.2 Zustand Store Architecture

```typescript
// store/index.ts
interface AppState {
  // UI State
  ui: UIState;
  // Auth State  
  auth: AuthState;
  // User Preferences
  preferences: PreferencesState;
}

// store/slices/authSlice.ts
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

// store/slices/uiSlice.ts  
interface UIState {
  activeSheet: string | null;
  isOffline: boolean;
  notifications: Notification[];
  theme: 'light' | 'dark';
}
```

### 3.3 React Query Configuration

```typescript
// services/queryClient.ts
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 минут
      cacheTime: 10 * 60 * 1000,     // 10 минут  
      retry: 3,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Ключевые query keys
export const queryKeys = {
  users: ['users'] as const,
  groups: ['groups'] as const,
  groupDetail: (id: string) => ['groups', id] as const,
  expenses: (groupId: string) => ['expenses', groupId] as const,
  debts: ['debts'] as const,
} as const;
```

### 3.4 Кэширование и синхронизация

**Стратегии кэширования:**
- **Groups**: Кэш на 10 минут, фоновые обновления
- **Expenses**: Кэш на 5 минут, оптимистичные обновления  
- **Debts**: Кэш на 3 минуты, автоматическое обновление при изменениях
- **User Profile**: Кэш на 30 минут

## 4. PWA Navigation Architecture

### 4.1 Структура маршрутизации

```typescript
// router/types.ts
export interface RouteParams {
  '/': undefined;
  '/auth/login': undefined;
  '/auth/register': undefined;
  '/auth/forgot-password': undefined;
  '/groups': undefined;
  '/groups/:groupId': { groupId: string };
  '/groups/:groupId/add-expense': { groupId: string };
  '/expenses/:expenseId': { expenseId: string };
  '/debts': undefined;
  '/profile': undefined;
  '/settings': undefined;
}

// Маршруты для PWA
export const routes = {
  home: '/',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
  },
  groups: {
    list: '/groups',
    detail: (id: string) => `/groups/${id}`,
    addExpense: (id: string) => `/groups/${id}/add-expense`,
  },
  expenses: {
    detail: (id: string) => `/expenses/${id}`,
  },
  debts: '/debts',
  profile: '/profile',
  settings: '/settings',
} as const;
```

### 4.2 Иерархия PWA маршрутов

```
PWA App
├── /auth/* (маршруты аутентификации)
│   ├── /auth/login
│   ├── /auth/register
│   └── /auth/forgot-password
├── / (главная страница)
├── /groups (список групп)
│   ├── /groups/:groupId (детали группы)
│   └── /groups/:groupId/add-expense (добавление траты)
├── /expenses/:expenseId (детали траты)
├── /debts (список долгов)
├── /profile (профиль пользователя)
└── /settings (настройки)

Мобильная навигация:
├── Bottom Navigation (на мобильных)
│   ├── Группы (/groups)
│   ├── Долги (/debts)
│   └── Профиль (/profile)
└── Sidebar Navigation (на десктопе)
```

### 4.3 PWA Маршрутизация и Deep Links

```typescript
// router/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';

const AppRouter = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Защищенные маршруты */}
        <Route path="/" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/groups" replace />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="groups/:groupId" element={<GroupDetailPage />} />
          <Route path="groups/:groupId/add-expense" element={<AddExpensePage />} />
          <Route path="expenses/:expenseId" element={<ExpenseDetailPage />} />
          <Route path="debts" element={<DebtsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

// Поддерживаемые PWA URLs:
// https://vibesplit.com/groups/123 - переход к группе
// https://vibesplit.com/expenses/456 - переход к трате
// https://vibesplit.com/groups/123/add-expense - добавление траты
```

## 5. API Integration Layer

### 5.1 PWA HTTP Client Architecture

```typescript
// services/api/client.ts
import { useAuthStore } from '@/store/auth';

class ApiClient {
  private baseURL = import.meta.env.VITE_API_URL || 'https://api.vibesplit.com';
  
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = useAuthStore.getState().token;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      // PWA оптимизации
      cache: 'no-cache',
      credentials: 'include',
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }

    return response.json();
  }

  // CRUD методы с поддержкой офлайн
  get = <T>(endpoint: string, params?: Record<string, any>) => 
    this.request<T>(this.buildUrl(endpoint, params));
    
  post = <T>(endpoint: string, data?: any) =>
    this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
  put = <T>(endpoint: string, data?: any) =>
    this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    
  delete = <T>(endpoint: string) =>
    this.request<T>(endpoint, { method: 'DELETE' });
    
  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.baseURL);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    return url.toString().replace(this.baseURL, '');
  }
}

export const apiClient = new ApiClient();
```

### 5.2 API Services

```typescript
// services/api/groups.ts (Events в терминах API)
export const groupsApi = {
  // Получение списка групп
  getGroups: (params: GetGroupsParams = {}) =>
    apiClient.get<EventShortEntryResponse>('/api/events', params),

  // Создание группы  
  createGroup: (data: CreateGroupData) =>
    apiClient.post<EventShortEntry>('/api/events', {
      name: data.name,
      description: data.description,
      eventDateStart: new Date().toISOString(),
    }),

  // Получение деталей группы
  getGroupDetail: (groupId: string) =>
    apiClient.get<GetEventEntry>(`/api/events/${groupId}`),

  // Добавление участника
  addParticipant: (data: AddParticipantData) =>
    apiClient.post('/api/participants', data),
};

// services/api/expenses.ts (Purchases в терминах API)
export const expensesApi = {
  // Получение трат группы
  getExpenses: (groupId: string, params: GetExpensesParams = {}) =>
    apiClient.get<GetPurchaseEntryResponse>('/api/purchases', {
      eventId: groupId,
      ...params,
    }),

  // Создание траты
  createExpense: (data: CreateExpenseData) =>
    apiClient.post<GetPurchaseEntry>('/api/purchases', {
      name: data.description,
      cost: data.amount,
      amount: 1, // Всегда 1 для простых трат
      eventId: data.groupId,
      participantId: data.payerId,
      unitTypeId: data.unitTypeId,
      isPartial: false,
    }),
};

// services/api/debts.ts
export const debtsApi = {
  // Получение долгов пользователя
  getDebts: (params: GetDebtsParams = {}) =>
    apiClient.get<GetDebtEntryResponse>('/api/debts', params),

  // Отметка о погашении долга
  payDebt: (debtId: string) =>
    apiClient.post(`/api/debts/${debtId}/send`),

  // Подтверждение погашения долга
  confirmDebt: (debtId: string) =>
    apiClient.post(`/api/debts/${debtId}/confirm`),
};
```

### 5.3 TypeScript интерфейсы на основе Swagger

```typescript
// types/api.ts - адаптация Swagger схем
export interface User {
  id: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  imageUri?: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  eventDateStart: string;
  eventDateEnd?: string;
  isCompleted: boolean;
  imageUri?: string;
  participants: Participant[];
  expenses: Expense[];
}

export interface Expense {
  id: string;
  name: string;
  cost: number;
  amount: number;
  isPartial: boolean;
  isComplete: boolean;
  payer: Participant;
  unitType: UnitType;
  purchaseTags?: PurchaseTag[];
}

export interface Debt {
  id: string;
  amount: number;
  isSent: boolean;
  isConfirmed: boolean;
  event: Group;
  lender: User;
  debtor: User;
}

// Client-side модели (упрощенные для UI)
export interface SimpleExpense {
  id: string;
  description: string;
  amount: number;
  payerName: string;
  date: string;
  participants: string[];
}
```

### 5.4 PWA Error Handling Strategy

```typescript
// services/api/errors.ts
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Ошибка сети') {
    super(message);
    this.name = 'NetworkError';
  }
}

// utils/errorHandling.ts
import { toast } from '@/components/ui/Toast';

export const handleApiError = (error: unknown) => {
  if (!navigator.onLine) {
    toast.error('Нет соединения с интернетом');
    return;
  }
  
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        // Redirect to login
        useAuthStore.getState().logout();
        window.location.href = '/auth/login';
        break;
      case 403:
        toast.error('Недостаточно прав для выполнения действия');
        break;
      case 422:
        // Show validation errors
        return error.errors;
      case 500:
        toast.error('Ошибка сервера. Попробуйте позже.');
        break;
      default:
        toast.error('Произошла ошибка. Попробуйте еще раз.');
        break;
    }
  }
  
  // Log to web analytics / error tracking
  if (import.meta.env.PROD) {
    console.error('API Error:', error);
    // Здесь можно интегрировать Sentry или другой сервис
  }
};
```

## 6. PWA UI/Component Architecture

### 6.1 Система компонентов на базе CSS Modules

```typescript
// components/ui/index.ts - Design System
export { Button, IconButton, ButtonGroup } from './Button';
export { Input, TextArea, Select } from './Form';
export { Card, CardHeader, CardBody } from './Card';
export { Modal, Dialog, Toast } from './Overlay';
export { Avatar, Badge, Spinner } from './Feedback';
export { Layout, Header, Sidebar, BottomNav } from './Layout';

// styles/tokens.css - CSS Custom Properties (Design Tokens)
:root {
  /* Цветовая палитра */
  --color-primary-50: #e6f3ff;
  --color-primary-100: #b3d9ff;
  --color-primary-500: #0066cc;
  --color-primary-600: #0052a3;
  --color-primary-900: #003366;
  
  --color-gray-50: #f9f9f9;
  --color-gray-100: #ededed;
  --color-gray-500: #8e8e93;
  --color-gray-900: #1c1c1e;
  
  --color-success: #22c55e;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
  
  /* Отступы */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  
  /* Размеры шрифтов */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  
  /* Медиа-запросы */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  
  /* Z-index слои */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal: 1040;
  --z-popover: 1050;
  --z-tooltip: 1060;
}

/* Темная тема */
@media (prefers-color-scheme: dark) {
  :root {
    --color-gray-50: #1c1c1e;
    --color-gray-100: #2c2c2e;
    --color-gray-500: #8e8e93;
    --color-gray-900: #f2f2f7;
  }
}
```

### 6.2 PWA Компонентная архитектура

```typescript
// components/forms/ExpenseForm.tsx
import styles from './ExpenseForm.module.css';
import { FormField } from '@/components/ui/FormField';

interface ExpenseFormProps {
  groupId: string;
  onSubmit: (data: ExpenseFormData) => void;
  initialData?: Partial<ExpenseFormData>;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  groupId,
  onSubmit,
  initialData,
}) => {
  const { control, handleSubmit, formState } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: initialData,
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <Controller
          control={control}
          name="description"
          render={({ field, fieldState }) => (
            <FormField
              label="Описание"
              error={fieldState.error?.message}
              required
            >
              <input
                className={styles.input}
                placeholder="Описание траты"
                value={field.value || ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            </FormField>
          )}
        />
      </div>
      
      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={!formState.isValid}
      >
        Добавить трату
      </button>
    </form>
  );
};

// ExpenseForm.module.css
.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-4);
}

.formGroup {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.input {
  padding: var(--space-3);
  border: 1px solid var(--color-gray-100);
  border-radius: 8px;
  font-size: var(--font-size-md);
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-50);
}

.submitButton {
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-primary-500);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: var(--font-size-md);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submitButton:hover:not(:disabled) {
  background-color: var(--color-primary-600);
}

.submitButton:disabled {
  background-color: var(--color-gray-500);
  cursor: not-allowed;
}

// components/layout/PageLayout.tsx
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  header, 
  loading, 
  className
}) => {
  return (
    <div className={`${styles.page} ${className || ''}`}>
      {header && (
        <header className={styles.header}>
          {header}
        </header>
      )}
      <main className={styles.main}>
        {loading ? <LoadingSpinner /> : children}
      </main>
    </div>
  );
};

// PageLayout.module.css
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-gray-50);
}

.header {
  background-color: white;
  border-bottom: 1px solid var(--color-gray-100);
  padding: var(--space-4);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}

.main {
  flex: 1;
  padding: var(--space-4);
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 768px) {
  .main {
    padding: var(--space-2);
  }
}
```

### 6.3 PWA Form Handling с React Hook Form

```typescript
// hooks/forms/useExpenseForm.ts
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const expenseFormSchema = z.object({
  description: z.string().min(1, 'Описание обязательно'),
  amount: z.number().min(0.01, 'Сумма должна быть больше 0'),
  payerId: z.string().min(1, 'Выберите плательщика'),
  participantIds: z.array(z.string()).min(1, 'Выберите участников'),
  splitType: z.enum(['equal', 'custom']),
  customSplits: z.record(z.number()).optional(),
});

export type ExpenseFormData = z.infer<typeof expenseFormSchema>;

export const useExpenseForm = (
  initialData?: Partial<ExpenseFormData>
) => {
  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      splitType: 'equal',
      ...initialData,
    },
  });

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      // API call logic
      await createExpense(data);
    } catch (error) {
      // Error handling
    }
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
```

### 6.4 Темизация и стили

```typescript
// theme/index.ts (уже в разделе выше)
// см. раздел 1.2 UI-библиотека: Chakra UI

export const theme = extendTheme({
  colors: {
    primary: {
      50: '#e6f3ff',
      100: '#b3d9ff',
      200: '#80bfff',
      300: '#4da6ff',
      400: '#1a8cff',
      500: '#0066cc',  // Main brand color
      600: '#0052a3',
      700: '#003d7a',
      800: '#002952',
      900: '#001429',
    },
    success: {
      500: '#22c55e',
    },
    error: {
      500: '#ef4444',
    },
    warning: {
      500: '#f59e0b',
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'primary',
      },
      variants: {
        solid: {
          _pressed: {
            opacity: 0.8,
          },
        },
      },
    },
  },
  config: {
    useSystemColorMode: true,
    initialColorMode: 'light',
  },
});
```

## 7. PWA Service Workers Architecture

### 7.1 Service Worker Configuration

```typescript
// public/sw.js - Service Worker
const CACHE_NAME = 'vibesplit-v1';
const STATIC_CACHE_URLS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/offline.html'
];

const API_CACHE_NAME = 'vibesplit-api-v1';
const API_CACHE_URLS = [
  '/api/groups',
  '/api/debts',
  '/api/user/profile'
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_CACHE_URLS)),
      caches.open(API_CACHE_NAME)
    ])
  );
  self.skipWaiting();
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Стратегия кэширования
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API запросы - Network First с Fallback на кэш
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(request));
  }
  // Статические ресурсы - Cache First
  else if (STATIC_CACHE_URLS.includes(url.pathname)) {
    event.respondWith(cacheFirstStrategy(request));
  }
  // HTML страницы - Network First с Fallback на offline.html
  else if (request.destination === 'document') {
    event.respondWith(networkFirstWithOfflineFallback(request));
  }
  // Остальные запросы
  else {
    event.respondWith(fetch(request));
  }
});

// Network First стратегия
async function networkFirstStrategy(request) {
  const cache = await caches.open(API_CACHE_NAME);
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Cache First стратегия
async function cacheFirstStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  const response = await fetch(request);
  if (response.ok) {
    cache.put(request, response.clone());
  }
  return response;
}

// Network First с офлайн страницей
async function networkFirstWithOfflineFallback(request) {
  try {
    return await fetch(request);
  } catch (error) {
    const cache = await caches.open(CACHE_NAME);
    return await cache.match('/offline.html');
  }
}
```

### 7.2 Offline Storage Strategy

```typescript
// services/sw/offlineStorage.ts
interface OfflineAction {
  id: string;
  type: 'CREATE_EXPENSE' | 'SETTLE_DEBT' | 'UPDATE_PROFILE';
  data: any;
  timestamp: number;
  groupId?: string;
}

class OfflineStorageManager {
  private dbName = 'vibesplit-offline';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Хранилище для офлайн действий
        if (!db.objectStoreNames.contains('actions')) {
          const actionStore = db.createObjectStore('actions', { keyPath: 'id' });
          actionStore.createIndex('timestamp', 'timestamp');
          actionStore.createIndex('type', 'type');
        }
        
        // Хранилище для кэшированных данных
        if (!db.objectStoreNames.contains('cache')) {
          db.createObjectStore('cache', { keyPath: 'key' });
        }
      };
    });
  }

  async addAction(action: Omit<OfflineAction, 'id' | 'timestamp'>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    const fullAction: OfflineAction = {
      ...action,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    
    const transaction = this.db.transaction(['actions'], 'readwrite');
    const store = transaction.objectStore('actions');
    await store.add(fullAction);
  }

  async getPendingActions(): Promise<OfflineAction[]> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['actions'], 'readonly');
      const store = transaction.objectStore('actions');
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async removeAction(actionId: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    const transaction = this.db.transaction(['actions'], 'readwrite');
    const store = transaction.objectStore('actions');
    await store.delete(actionId);
  }

  async cacheData(key: string, data: any): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    const transaction = this.db.transaction(['cache'], 'readwrite');
    const store = transaction.objectStore('cache');
    await store.put({ key, data, timestamp: Date.now() });
  }

  async getCachedData(key: string): Promise<any> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['cache'], 'readonly');
      const store = transaction.objectStore('cache');
      const request = store.get(key);
      
      request.onsuccess = () => {
        const result = request.result;
        resolve(result ? result.data : null);
      };
      request.onerror = () => reject(request.error);
    });
  }
}

export const offlineStorage = new OfflineStorageManager();
```

### 7.3 Background Sync

```typescript
// services/sw/backgroundSync.ts
class BackgroundSyncManager {
  async registerBackgroundSync(): Promise<void> {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register('vibesplit-sync');
    }
  }

  async syncOfflineActions(): Promise<void> {
    const actions = await offlineStorage.getPendingActions();
    
    for (const action of actions) {
      try {
        await this.executeAction(action);
        await offlineStorage.removeAction(action.id);
      } catch (error) {
        console.error('Failed to sync action:', action, error);
        // Действие остается в очереди для следующей попытки
      }
    }
  }

  private async executeAction(action: OfflineAction): Promise<void> {
    switch (action.type) {
      case 'CREATE_EXPENSE':
        await this.createExpense(action.data);
        break;
      case 'SETTLE_DEBT':
        await this.settleDebt(action.data);
        break;
      case 'UPDATE_PROFILE':
        await this.updateProfile(action.data);
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  private async createExpense(data: any): Promise<void> {
    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  }

  private async settleDebt(data: any): Promise<void> {
    const response = await fetch(`/api/debts/${data.debtId}/settle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  }

  private async updateProfile(data: any): Promise<void> {
    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  }
}

export const backgroundSync = new BackgroundSyncManager();

// В Service Worker
self.addEventListener('sync', (event) => {
  if (event.tag === 'vibesplit-sync') {
    event.waitUntil(backgroundSync.syncOfflineActions());
  }
});
```

### 7.4 Web App Manifest

```json
// public/manifest.json - PWA манифест
{
  "name": "VibeSplit - Разделение расходов",
  "short_name": "VibeSplit",
  "description": "Приложение для честного разделения совместных расходов",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#0066cc",
  "background_color": "#ffffff",
  "categories": ["finance", "productivity", "social"],
  "lang": "ru",
  "scope": "/",
  
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  
  "screenshots": [
    {
      "src": "/screenshots/mobile-1.png",
      "sizes": "390x844",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "Список групп"
    },
    {
      "src": "/screenshots/mobile-2.png",
      "sizes": "390x844",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "Детали группы"
    },
    {
      "src": "/screenshots/desktop-1.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide",
      "label": "Десктоп версия"
    }
  ],
  
  "shortcuts": [
    {
      "name": "Мои группы",
      "short_name": "Группы",
      "description": "Просмотр активных групп",
      "url": "/groups",
      "icons": [
        {
          "src": "/icons/shortcut-groups.png",
          "sizes": "96x96"
        }
      ]
    },
    {
      "name": "Мои долги",
      "short_name": "Долги",
      "description": "Просмотр долгов",
      "url": "/debts",
      "icons": [
        {
          "src": "/icons/shortcut-debts.png",
          "sizes": "96x96"
        }
      ]
    },
    {
      "name": "Добавить трату",
      "short_name": "Трата",
      "description": "Быстрое добавление траты",
      "url": "/quick-expense",
      "icons": [
        {
          "src": "/icons/shortcut-expense.png",
          "sizes": "96x96"
        }
      ]
    }
  ],
  
  "related_applications": [],
  "prefer_related_applications": false,
  
  "edge_side_panel": {
    "preferred_width": 400
  }
}
```

### 7.5 Push Notifications для PWA

```typescript
// services/sw/pushNotifications.ts
class PWAPushNotificationsManager {
  private vapidPublicKey = process.env.VITE_VAPID_PUBLIC_KEY;

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Проверяем существующую подписку
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        return existingSubscription;
      }

      // Создаем новую подписку
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey!)
      });

      // Отправляем подписку на сервер
      await this.sendSubscriptionToServer(subscription);
      
      return subscription;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      return null;
    }
  }

  async unsubscribeFromPush(): Promise<boolean> {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        await subscription.unsubscribe();
        await this.removeSubscriptionFromServer(subscription);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Failed to unsubscribe from push notifications:', error);
      return false;
    }
  }

  private async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscription: subscription.toJSON(),
        userAgent: navigator.userAgent,
      }),
    });
  }

  private async removeSubscriptionFromServer(subscription: PushSubscription): Promise<void> {
    await fetch('/api/push/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscription: subscription.toJSON(),
      }),
    });
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

export const pwaPushNotifications = new PWAPushNotificationsManager();

// В Service Worker (public/sw.js)
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    image: data.image,
    data: data.data,
    actions: [
      {
        action: 'view',
        title: 'Открыть',
        icon: '/icons/action-view.png'
      },
      {
        action: 'dismiss',
        title: 'Закрыть',
        icon: '/icons/action-dismiss.png'
      }
    ],
    tag: data.tag || 'default',
    renotify: true,
    requireInteraction: data.urgent || false,
    timestamp: Date.now(),
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'VibeSplit', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll().then(windowClients => {
      // Проверяем, открыто ли уже приложение
      for (let client of windowClients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(urlToOpen);
          return client.focus();
        }
      }
      
      // Открываем новое окно/вкладку
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
```

## 8. PWA Security Architecture

### 8.1 Web Authentication Flow

```typescript
// services/auth/authService.ts
class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    const response = await apiClient.post<GetUserEntry>('/api/auth/login', {
      username: credentials.email,
      password: credentials.password,
    });

    // Извлекаем токен из cookie или header
    const token = this.extractTokenFromResponse(response);
    
    if (token) {
      await this.storeToken(token);
      await this.storeUser(response);
    }

    return { user: response, token };
  }

  async register(data: RegisterData): Promise<void> {
    await apiClient.post('/api/auth/register', {
      username: data.name,
      email: data.email,
      password: data.password,
    });
  }

  async logout(): Promise<void> {
    await apiClient.post('/api/auth/logout');
    await this.clearTokens();
  }

  private async storeToken(token: string): Promise<void> {
    localStorage.setItem('auth_token', token);
  }

  private async clearTokens(): Promise<void> {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  }
}

export const authService = new AuthService();
```

### 8.2 Web Token Management

```typescript
// services/auth/tokenManager.ts
class TokenManager {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';

  async getAccessToken(): Promise<string | null> {
    return localStorage.getItem(TokenManager.TOKEN_KEY);
  }

  async setTokens(accessToken: string, refreshToken?: string): Promise<void> {
    localStorage.setItem(TokenManager.TOKEN_KEY, accessToken);
    if (refreshToken) {
      localStorage.setItem(TokenManager.REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  async clearTokens(): Promise<void> {
    localStorage.removeItem(TokenManager.TOKEN_KEY);
    localStorage.removeItem(TokenManager.REFRESH_TOKEN_KEY);
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
}

export const tokenManager = new TokenManager();
```

### 8.3 PWA Безопасность данных

**Принципы безопасности:**
- Все sensitive данные хранятся в localStorage с шифрованием
- JWT токены валидируются на стороне клиента
- Автоматический logout при истечении токена
- Шифрование локальных данных через Web Crypto API
- Валидация всех пользовательских вводов
- HTTPS принудительно для всех запросов
- Content Security Policy (CSP) для защиты от XSS

```typescript
// utils/security.ts
import CryptoJS from 'crypto-js';

export const securityUtils = {
  // Шифрование локальных данных
  encrypt: (data: string, key: string): string => {
    return CryptoJS.AES.encrypt(data, key).toString();
  },

  decrypt: (encryptedData: string, key: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  },

  // Валидация ввода
  sanitizeInput: (input: string): string => {
    return input.replace(/[<>\"'%;()&+]/g, '');
  },
};
```

## 9. Performance & Optimization

### 9.1 Lazy Loading Strategy

```typescript
// navigation/LazyScreens.ts
import { lazy } from 'react';

// Ленивая загрузка экранов
export const GroupDetailScreen = lazy(() => 
  import('../screens/groups/GroupDetailScreen')
);

export const AddExpenseScreen = lazy(() =>
  import('../screens/expenses/AddExpenseScreen')
);

// Обертка с Suspense
const LazyScreen = ({ 
  children, 
  fallback = <LoadingSpinner /> 
}: LazyScreenProps) => (
  <Suspense fallback={fallback}>
    {children}
  </Suspense>
);
```

### 9.2 Caching Strategy

```typescript
// services/cache/cacheManager.ts
class CacheManager {
  private cacheKeys = {
    groups: 'cache_groups',
    userProfile: 'cache_user_profile',
    preferences: 'cache_preferences',
  };

  async get<T>(key: keyof typeof this.cacheKeys): Promise<T | null> {
    try {
      const cached = localStorage.getItem(this.cacheKeys[key]);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  async set<T>(
    key: keyof typeof this.cacheKeys, 
    data: T, 
    ttl?: number
  ): Promise<void> {
    const cacheItem = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    
    localStorage.setItem(
      this.cacheKeys[key],
      JSON.stringify(cacheItem)
    );
  }

  async isExpired(key: keyof typeof this.cacheKeys): Promise<boolean> {
    const cached = await this.get(key);
    if (!cached || !cached.ttl) return false;
    
    return Date.now() - cached.timestamp > cached.ttl;
  }
}

export const cacheManager = new CacheManager();
```

### 9.3 Memory Management

```typescript
// hooks/useMemoryOptimization.ts
export const useMemoryOptimization = () => {
  const [isLowMemory, setIsLowMemory] = useState(false);

  useEffect(() => {
    // Мониторинг памяти через Performance Observer API
    const checkMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedPercent = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
        
        if (usedPercent > 0.8) {
          setIsLowMemory(true);
          // Очистка кэшей
          queryClient.clear();
          // Очистка localStorage от старых данных
          cacheManager.clearExpired();
        } else {
          setIsLowMemory(false);
        }
      }
    };

    const interval = setInterval(checkMemoryUsage, 30000); // Каждые 30 секунд
    
    return () => clearInterval(interval);
  }, []);

  return { isLowMemory };
};
```

### 9.4 Offline Capabilities

```typescript
// hooks/useOfflineSync.ts
export const useOfflineSync = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [pendingActions, setPendingActions] = useState<Action[]>([]);

  useEffect(() => {
    const handleOnline = () => {
      const wasOffline = isOffline;
      setIsOffline(false);
      
      // Когда восстанавливается соединение
      if (wasOffline) {
        syncPendingActions();
      }
    };
    
    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOffline]);

  const syncPendingActions = async () => {
    for (const action of pendingActions) {
      try {
        await executeAction(action);
        // Удаляем успешно выполненное действие
        setPendingActions(prev => prev.filter(a => a.id !== action.id));
      } catch (error) {
        console.error('Failed to sync action:', error);
      }
    }
  };

  return { isOffline, addPendingAction };
};
```

## 10. Data Models & Types

### 10.1 Маппинг API на клиентские модели

```typescript
// utils/mappers.ts

// Маппер для группы (Event -> Group)
export const mapEventToGroup = (event: GetEventEntry): Group => ({
  id: event.id,
  name: event.name,
  description: event.description || '',
  dateCreated: event.createdDate,
  dateStart: event.eventDateStart,
  dateEnd: event.eventDateEnd,
  isCompleted: event.isCompleted,
  imageUri: event.mediaUri,
  createdBy: mapUserShortToUser(event.user),
  participants: event.participants?.map(mapParticipantShortToParticipant) || [],
  expenses: event.purchases?.map(mapPurchaseToExpense) || [],
});

// Маппер для траты (Purchase -> Expense)
export const mapPurchaseToExpense = (purchase: PurchaseShortEntry): Expense => ({
  id: purchase.id,
  description: purchase.name,
  amount: purchase.cost,
  isPartial: purchase.isPartial,
  isComplete: purchase.isComplete,
  tags: purchase.purchaseTags?.map(tag => tag.name) || [],
  unitType: purchase.unitType?.name || 'шт',
});

// Маппер для долга
export const mapDebtToClientDebt = (debt: GetDebtEntry): ClientDebt => ({
  id: debt.id,
  amount: debt.amount,
  isPaid: debt.isSent,
  isConfirmed: debt.isComfirmed,
  groupName: debt.event.name,
  groupId: debt.event.id,
  lender: {
    id: debt.lender.id || '',
    name: debt.lender.name || '',
    avatar: debt.lender.imageUri,
  },
  debtor: {
    id: debt.debtor.id || '',
    name: debt.debtor.name || '',
    avatar: debt.debtor.imageUri,
  },
});
```

### 10.2 Клиентские типы данных

```typescript
// types/client.ts

export interface Group {
  id: string;
  name: string;
  description: string;
  dateCreated: string;
  dateStart: string;
  dateEnd?: string;
  isCompleted: boolean;
  imageUri?: string;
  createdBy: User;
  participants: Participant[];
  expenses: Expense[];
  totalAmount: number;
  myBalance: number;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  payer: Participant;
  participants: Participant[];
  splitType: 'equal' | 'custom';
  customSplits?: Record<string, number>;
  tags: string[];
  isPartial: boolean;
  isComplete: boolean;
}

export interface ClientDebt {
  id: string;
  amount: number;
  isPaid: boolean;
  isConfirmed: boolean;
  groupName: string;
  groupId: string;
  lender: SimpleUser;
  debtor: SimpleUser;
  description?: string;
}

export interface SimpleUser {
  id: string;
  name: string;
  avatar?: string;
}

export interface Participant extends SimpleUser {
  role: 'creator' | 'member';
  joinedAt: string;
}
```

### 10.3 Form типы

```typescript
// types/forms.ts
export interface CreateGroupFormData {
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
}

export interface ExpenseFormData {
  description: string;
  amount: number;
  payerId: string;
  participantIds: string[];
  splitType: 'equal' | 'custom';
  customSplits?: Record<string, number>;
  tags?: string[];
  date?: Date;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
```

## 11. Ключевые User Flows

### 11.1 Onboarding Flow

```typescript
// screens/onboarding/OnboardingFlow.tsx
const OnboardingFlow = () => {
  const [step, setStep] = useState(0);
  
  const steps = [
    <WelcomeStep onNext={() => setStep(1)} />,
    <RegisterStep onNext={() => setStep(2)} />,
    <TutorialStep onComplete={() => navigate('Main')} />,
  ];

  return (
    <Box flex={1}>
      <Progress value={(step + 1) * 33.33} />
      {steps[step]}
    </Box>
  );
};
```

### 11.2 Создание группы

```typescript
// screens/groups/CreateGroupScreen.tsx
const CreateGroupScreen = () => {
  const navigate = useNavigation();
  const createGroupMutation = useCreateGroup();
  
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateGroupFormData>();

  const onSubmit = async (data: CreateGroupFormData) => {
    try {
      const group = await createGroupMutation.mutateAsync({
        name: data.name,
        description: data.description,
        eventDateStart: data.startDate.toISOString(),
      });
      
      navigate('GroupDetail', { groupId: group.id });
    } catch (error) {
      // Error handling
    }
  };

  return (
    <Screen header={<HeaderWithBackButton title="Создать группу" />}>
      <VStack space={4} px={4}>
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Название обязательно' }}
          render={({ field }) => (
            <Input
              placeholder="Название группы"
              value={field.value}
              onChangeText={field.onChange}
              isInvalid={!!errors.name}
            />
          )}
        />
        
        <Button 
          onPress={handleSubmit(onSubmit)}
          isDisabled={!isValid}
          isLoading={createGroupMutation.isLoading}
        >
          Создать группу
        </Button>
      </VStack>
    </Screen>
  );
};
```

### 11.3 Добавление траты

```typescript
// screens/expenses/AddExpenseScreen.tsx
const AddExpenseScreen = ({ route }) => {
  const { groupId } = route.params;
  const { data: group } = useGroup(groupId);
  const addExpenseMutation = useAddExpense();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
  } = useForm<ExpenseFormData>();

  const splitType = watch('splitType');

  const onSubmit = async (data: ExpenseFormData) => {
    const expenseData = {
      ...data,
      groupId,
      // Маппинг на API формат
      name: data.description,
      cost: data.amount,
      amount: 1,
      eventId: groupId,
      participantId: data.payerId,
      unitTypeId: 'default-unit-id', // Получаем из справочника
      isPartial: false,
    };

    await addExpenseMutation.mutateAsync(expenseData);
    navigate('GroupDetail', { groupId });
  };

  return (
    <Screen header={<HeaderWithBackButton title="Добавить трату" />}>
      <VStack space={4} px={4}>
        <Controller
          control={control}
          name="description"
          rules={{ required: 'Описание обязательно' }}
          render={({ field }) => (
            <Input
              placeholder="На что потратили?"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="amount"
          rules={{ 
            required: 'Сумма обязательна',
            min: { value: 0.01, message: 'Сумма должна быть больше 0' }
          }}
          render={({ field }) => (
            <Input
              placeholder="Сумма"
              keyboardType="numeric"
              value={field.value?.toString()}
              onChangeText={(text) => field.onChange(parseFloat(text) || 0)}
            />
          )}
        />

        <Text>Кто платил?</Text>
        <Controller
          control={control}
          name="payerId"
          rules={{ required: 'Выберите плательщика' }}
          render={({ field }) => (
            <Select
              selectedValue={field.value}
              onValueChange={field.onChange}
            >
              {group?.participants.map(participant => (
                <Select.Item 
                  key={participant.id}
                  label={participant.name}
                  value={participant.id}
                />
              ))}
            </Select>
          )}
        />

        <Text>Как разделить?</Text>
        <Radio.Group
          value={splitType}
          onChange={(value) => setValue('splitType', value as 'equal' | 'custom')}
        >
          <Radio value="equal">Поровну между всеми</Radio>
          <Radio value="custom">Неравномерно</Radio>
        </Radio.Group>

        <Button
          onPress={handleSubmit(onSubmit)}
          isLoading={addExpenseMutation.isLoading}
        >
          Добавить трату
        </Button>
      </VStack>
    </Screen>
  );
};
```

## 12. Архитектура уведомлений

### 12.1 Push Notifications

```typescript
// services/notifications/notificationService.ts
class NotificationService {
  private registration: ServiceWorkerRegistration | null = null;

  async initialize(): Promise<void> {
    if ('serviceWorker' in navigator) {
      this.registration = await navigator.serviceWorker.ready;
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      throw new Error('Уведомления не поддерживаются');
    }

    if (Notification.permission === 'denied') {
      throw new Error('Уведомления заблокированы');
    }

    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      return permission;
    }

    return Notification.permission;
  }

  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!this.registration) {
      await this.initialize();
    }

    if (!this.registration) {
      throw new Error('Service Worker не зарегистрирован');
    }

    const subscription = await this.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY)
    });

    return subscription;
  }

  async sendLocalNotification(
    title: string,
    body: string,
    options?: NotificationOptions
  ): Promise<void> {
    if (!this.registration) {
      // Fallback к обычному уведомлению
      new Notification(title, { body, ...options });
      return;
    }

    await this.registration.showNotification(title, {
      body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      tag: 'vibesplit-notification',
      ...options
    });
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

export const notificationService = new NotificationService();
```

## 13. Тестирование

### 13.1 Стратегия тестирования

```typescript
// __tests__/components/ExpenseForm.test.tsx
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ExpenseForm } from '../components/forms/ExpenseForm';

describe('ExpenseForm', () => {
  it('should validate required fields', async () => {
    const onSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <ExpenseForm groupId="test-id" onSubmit={onSubmit} />
    );

    fireEvent.press(getByText('Добавить трату'));

    await waitFor(() => {
      expect(getByText('Описание обязательно')).toBeTruthy();
      expect(getByText('Сумма обязательна')).toBeTruthy();
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should submit with valid data', async () => {
    const onSubmit = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <ExpenseForm groupId="test-id" onSubmit={onSubmit} />
    );

    fireEvent.changeText(getByPlaceholderText('На что потратили?'), 'Ужин');
    fireEvent.changeText(getByPlaceholderText('Сумма'), '1000');
    fireEvent.press(getByText('Добавить трату'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        description: 'Ужин',
        amount: 1000,
        // ... other fields
      });
    });
  });
});
```

### 13.2 API тестирование

```typescript
// __tests__/services/api/groupsApi.test.ts
import { groupsApi } from '../../../services/api/groups';
import { apiClient } from '../../../services/api/client';

jest.mock('../../../services/api/client');
const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('groupsApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getGroups', () => {
    it('should fetch groups successfully', async () => {
      const mockGroups = [
        { id: '1', name: 'Test Group 1' },
        { id: '2', name: 'Test Group 2' },
      ];

      mockApiClient.get.mockResolvedValueOnce({
        data: mockGroups,
        totalPages: 1,
        total: 2,
      });

      const result = await groupsApi.getGroups();

      expect(mockApiClient.get).toHaveBeenCalledWith('/api/events', {});
      expect(result.data).toEqual(mockGroups);
    });
  });
});
```

## 14. DevOps и деплой

### 14.1 Vite Build конфигурация

```json
// package.json - PWA build scripts
{
  "scripts": {
    "dev": "vite --host",
    "build": "vite build",
    "build:staging": "vite build --mode staging",
    "build:production": "vite build --mode production",
    "preview": "vite preview --host",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "analyze": "npx vite-bundle-analyzer dist/stats.html",
    "lighthouse": "lhci autorun"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@chakra-ui/react": "^2.8.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "framer-motion": "^10.16.0",
    "react-router-dom": "^6.15.0",
    "zustand": "^4.4.0",
    "@tanstack/react-query": "^4.32.0",
    "react-hook-form": "^7.45.0",
    "@hookform/resolvers": "^3.2.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5",
    "vite-plugin-pwa": "^0.16.4",
    "vitest": "^0.34.0",
    "@lhci/cli": "^0.12.0"
  }
}
```

```typescript
// .github/workflows/deploy.yml - GitHub Actions для PWA
name: Build and Deploy PWA

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run type check
        run: npm run type-check
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm run test

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build PWA
        run: npm run build:production
        env:
          VITE_API_URL: ${{ secrets.API_URL }}
          VITE_VAPID_PUBLIC_KEY: ${{ secrets.VAPID_PUBLIC_KEY }}
      
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli@0.12.x
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
      
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2.0
        with:
          publish-dir: './dist'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### 14.2 Environment Configuration

```typescript
// config/env.ts - PWA Environment Configuration
export const env = {
  API_URL: import.meta.env.VITE_API_URL || 'https://api.vibesplit.com',
  STAGE: import.meta.env.VITE_STAGE || 'development',
  VERSION: import.meta.env.VITE_VERSION || '1.0.0',
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  ANALYTICS_KEY: import.meta.env.VITE_ANALYTICS_KEY,
  VAPID_PUBLIC_KEY: import.meta.env.VITE_VAPID_PUBLIC_KEY,
};

// Валидация переменных окружения
const validateEnv = () => {
  if (!env.API_URL) {
    throw new Error('VITE_API_URL is required');
  }
  
  if (env.STAGE === 'production' && !env.VAPID_PUBLIC_KEY) {
    throw new Error('VITE_VAPID_PUBLIC_KEY is required for production');
  }
};

validateEnv();
```

```bash
# .env.development
VITE_API_URL=http://localhost:8080
VITE_STAGE=development
VITE_VERSION=1.0.0-dev

# .env.staging  
VITE_API_URL=https://api-staging.vibesplit.com
VITE_STAGE=staging
VITE_VERSION=1.0.0-rc
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project
VITE_ANALYTICS_KEY=staging-analytics-key
VITE_VAPID_PUBLIC_KEY=staging-vapid-key

# .env.production
VITE_API_URL=https://api.vibesplit.com
VITE_STAGE=production
VITE_VERSION=1.0.0
VITE_SENTRY_DSN=https://your-production-sentry-dsn@sentry.io/project
VITE_ANALYTICS_KEY=production-analytics-key
VITE_VAPID_PUBLIC_KEY=production-vapid-key
```

## 15. Мониторинг и аналитика

### 15.1 Crash Reporting

```typescript
// services/monitoring/crashReporting.ts
import * as Sentry from '@sentry/react';

class CrashReporting {
  init(): void {
    Sentry.init({
      dsn: env.SENTRY_DSN,
      environment: env.STAGE,
    });
  }

  logError(error: Error, context?: Record<string, any>): void {
    Sentry.withScope((scope) => {
      if (context) {
        scope.setContext('error_context', context);
      }
      Sentry.captureException(error);
    });
  }

  logEvent(event: string, properties?: Record<string, any>): void {
    Sentry.addBreadcrumb({
      message: event,
      data: properties,
      level: 'info',
    });
  }
}

export const crashReporting = new CrashReporting();
```

### 15.2 Analytics

```typescript
// services/analytics/analyticsService.ts - PWA Analytics
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    ym?: (counterId: number, action: string, ...args: any[]) => void;
  }
}

class PWAAnalyticsService {
  private isInitialized = false;

  init(): void {
    if (this.isInitialized) return;
    
    // Google Analytics 4 для PWA
    if (env.ANALYTICS_KEY) {
      this.initGoogleAnalytics();
    }
    
    // Яндекс.Метрика для российской аудитории
    this.initYandexMetrica();
    
    this.isInitialized = true;
  }

  private initGoogleAnalytics(): void {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${env.ANALYTICS_KEY}`;
    document.head.appendChild(script);

    window.gtag = window.gtag || function() {
      (window.gtag as any).dataLayer = (window.gtag as any).dataLayer || [];
      (window.gtag as any).dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', env.ANALYTICS_KEY!, {
      // PWA-специфичные настройки
      send_page_view: true,
      app_name: 'VibeSplit',
      app_version: env.VERSION,
    });
  }

  private initYandexMetrica(): void {
    // Яндекс.Метрика код инициализации
    const counterId = 94567890; // Заменить на реальный ID
    
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode?.insertBefore(k,a)
    })(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");

    window.ym?.(counterId, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
    });
  }

  track(event: string, properties?: Record<string, any>): void {
    if (!this.isInitialized) return;

    // Google Analytics
    if (window.gtag) {
      window.gtag('event', event, {
        ...properties,
        app_name: 'VibeSplit',
        timestamp: Date.now(),
      });
    }

    // Яндекс.Метрика
    if (window.ym) {
      window.ym(94567890, 'reachGoal', event, properties);
    }
  }

  identify(userId: string, traits?: Record<string, any>): void {
    if (!this.isInitialized) return;

    if (window.gtag) {
      window.gtag('config', env.ANALYTICS_KEY!, {
        user_id: userId,
        custom_map: traits,
      });
    }
  }

  page(path: string, title?: string): void {
    if (!this.isInitialized) return;

    if (window.gtag) {
      window.gtag('config', env.ANALYTICS_KEY!, {
        page_path: path,
        page_title: title || document.title,
      });
    }

    if (window.ym) {
      window.ym(94567890, 'hit', path);
    }
  }

  // PWA-специфичные метрики
  trackPWAInstall(): void {
    this.track('pwa_install', {
      platform: navigator.platform,
      user_agent: navigator.userAgent,
    });
  }

  trackPWAShare(): void {
    this.track('pwa_share', {
      method: 'native_share',
    });
  }

  trackOfflineUsage(): void {
    this.track('offline_usage', {
      timestamp: Date.now(),
      connection_type: (navigator as any).connection?.effectiveType || 'unknown',
    });
  }
}

export const analytics = new PWAAnalyticsService();

// Использование
analytics.track('expense_created', {
  amount: 1000,
  groupId: 'group-123',
  splitType: 'equal',
  platform: 'pwa',
});
```

## Заключение

Данная техническая архитектура представляет собой comprehensive blueprint для разработки PWA приложения VibeSplit. Архитектура построена на современных принципах PWA разработки с акцентом на:

### Ключевые преимущества PWA архитектуры:

1. **Кроссплатформенность**: Одно приложение для Android, iOS и десктоп
2. **Производительность**: Service Workers, кэширование и оптимизация загрузки
3. **Безопасность**: Web Crypto API, CSP, HTTPS и современные стандарты безопасности
4. **Типобезопасность**: Полная типизация с TypeScript и автогенерация из Swagger
5. **Офлайн-функциональность**: IndexedDB, Background Sync и офлайн-первый подход
6. **Нативный опыт**: Установка на домашний экран, push-уведомления, адаптивный дизайн
7. **Легкость распространения**: Низкие барьеры входа, мгновенные обновления

### Рекомендации по PWA внедрению:

1. **PWA Foundation**: Начать с настройки Service Workers, Web App Manifest и HTTPS
2. **Progressive Enhancement**: Сначала базовая функциональность, затем офлайн возможности
3. **Мобильно-первый подход**: Оптимизация под мобильные устройства с адаптацией
4. **Web Vitals Monitoring**: Отслеживание Lighthouse метрик с первых релизов
5. **Security First**: Безопасность как приоритет с первых дней разработки
6. **Cross-Browser Testing**: Тестирование на всех основных браузерах и устройствах

### Преимущества перехода на PWA:

1. **Быстрая разработка**: 8-12 недель вместо 15+ для нативных приложений
2. **Меньше рисков**: Одна кодовая база вместо трех
3. **Мгновенные обновления**: Не нужно ждать модерации в App Store
4. **Меньшая стоимость**: Одна команда вместо нескольких
5. **Легкость тестирования**: A/B тесты можно запускать мгновенно

Архитектура готова для передачи команде разработки и может служить техническим фундаментом для успешной реализации PWA MVP VibeSplit.