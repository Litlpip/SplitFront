# VibeSplit Frontend Implementation Plan
## Детальный план реализации фронтенд приложения

---

## 1. Обзор проекта и требований

### Краткое описание
VibeSplit - это PWA приложение для честного разделения совместных расходов между друзьями, специально адаптированное для российского рынка. Приложение решает ключевые культурные проблемы, связанные с социальной неловкостью при обсуждении денег, сложностью математических расчетов и недоверием к автоматическим системам.

### Ключевые пользовательские персоны:
- **"Социальная Алиса"** (24 года) - Маркетинг-менеджер, активная социальная жизнь
- **"Практичный Дмитрий"** (28 лет) - IT-разработчик, ценит точность и эффективность  
- **"Студентка Катя"** (20 лет) - Ограниченный бюджет, считает каждую копейку

### Основные функциональные требования:
- Регистрация через SMS с российскими номерами телефонов
- Создание групп для совместных трат
- Добавление расходов с автоматическим разделением
- Расчет оптимальных долгов с минимизацией транзакций
- Деликатные напоминания о долгах
- Погашение долгов с поддержкой российских платежных систем
- Полная офлайн-поддержка через Service Workers

### Культурные адаптации:
- Мягкие формулировки вместо прямых требований ("К доплате" вместо "Вы должны")
- Коллективная ответственность вместо персональных обвинений
- Поддержка российских социальных сценариев (дачи, рестораны, корпоративы)
- Интеграция с российскими платежными системами (СБП, Сбербанк, ЮMoney)

---

## 2. Техническая архитектура фронтенда

### Core технологический стек:
- **React 18** с TypeScript для типобезопасности
- **Vite** как сборщик с оптимизацией для PWA
- **PWA технологии**: Service Workers, Web App Manifest
- **Chakra UI** как основная UI библиотека с кастомной темой

### Архитектурные принципы:
- **Mobile-First Design**: Приоритет мобильного опыта
- **Progressive Enhancement**: Работа на всех устройствах с улучшениями
- **Offline-First**: Service Workers для работы без интернета
- **Accessibility by Design**: WCAG 2.1 AA соответствие

### Структура проекта:
```
src/
├── components/           # Переиспользуемые UI компоненты
│   ├── ui/              # Базовые компоненты на Chakra UI
│   ├── forms/           # Формы с React Hook Form
│   └── layout/          # Layout компоненты
├── pages/               # Страницы приложения
│   ├── auth/           # Аутентификация
│   ├── groups/         # Управление группами
│   ├── expenses/       # Управление тратами
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
```

---

## 3. Структура компонентов и их иерархия

### UI Component Library на базе Chakra UI:

#### Базовые компоненты (src/components/ui/):
```typescript
// Button System
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  size: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: string;
}

// Currency Input (специализированный компонент)
interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
}

// Russian Text Components
interface RussianTextProps {
  children: string;
  variant: 'heading' | 'body' | 'caption' | 'currency';
  truncate?: boolean;
}
```

#### Композитные компоненты (src/components/):

**1. UserCard** - Карточка пользователя
```typescript
interface UserCardProps {
  user: User;
  amount?: number;
  status: 'neutral' | 'owes' | 'owed';
  showActions?: boolean;
  onSettle?: () => void;
  onRemind?: () => void;
}
```

**2. GroupCard** - Карточка группы
```typescript
interface GroupCardProps {
  group: Group;
  userBalance: number;
  participantCount: number;
  lastActivity: Date;
  onClick: () => void;
}
```

**3. ExpenseCard** - Карточка траты
```typescript
interface ExpenseCardProps {
  expense: Expense;
  showDetails?: boolean;
  editable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}
```

#### Layout компоненты:

**1. AppLayout** - Основной layout с табами
```typescript
interface AppLayoutProps {
  children: React.ReactNode;
  currentTab: 'dashboard' | 'groups' | 'debts' | 'profile';
}
```

**2. PageHeader** - Заголовок страницы
```typescript
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  showBack?: boolean;
}
```

**3. FloatingActionButton** - FAB для быстрых действий
```typescript
interface FABProps {
  action: 'add-expense' | 'create-group';
  onClick: () => void;
}
```

---

## 4. План поэтапной разработки с приоритизацией

### Фаза 1: PWA Foundation & Core Setup (Недели 1-2)

#### Неделя 1: Базовая инфраструктура
**Приоритет: Критический**

**Задачи:**
- [ ] Настройка Vite проекта с TypeScript
- [ ] Конфигурация Web App Manifest для PWA
- [ ] Настройка базового Service Worker
- [ ] Конфигурация Chakra UI с кастомной темой
- [ ] Настройка React Router для SPA навигации
- [ ] Базовая система типов TypeScript

**Результаты:** Работающий PWA шаблон с возможностью установки

#### Неделя 2: Design System Implementation
**Приоритет: Критический**

**Задачи:**
- [ ] Создание кастомной темы Chakra UI с российскими цветами
- [ ] Реализация базовых UI компонентов (Button, Input, Card)
- [ ] Настройка типографики для кириллицы
- [ ] Создание Currency Input компонента
- [ ] Responsive система с mobile-first подходом
- [ ] Базовые анимации и микроинтеракции

**Результаты:** Полная система компонентов готова к использованию

### Фаза 2: Authentication & User Management (Недели 3-4)

#### Неделя 3: Регистрация и аутентификация
**Приоритет: Критический**

**Задачи:**
- [ ] Welcome Screen с российской локализацией
- [ ] Регистрация по номеру телефона (+7 формат)
- [ ] SMS верификация с таймером
- [ ] Создание профиля пользователя
- [ ] PIN код для быстрого входа
- [ ] Интеграция с backend API аутентификации

**Результаты:** Полный onboarding flow с SMS подтверждением

#### Неделя 4: User Profile & Settings
**Приоритет: Высокий**

**Задачи:**
- [ ] Экран профиля пользователя
- [ ] Настройки уведомлений
- [ ] Настройки конфиденциальности
- [ ] Выход из аккаунта
- [ ] Восстановление доступа

**Результаты:** Управление профилем и настройками

### Фаза 3: Core Features - Groups & Expenses (Недели 5-8)

#### Неделя 5: Группы (P0 Features)
**Приоритет: Критический**

**Задачи:**
- [ ] Dashboard с балансом пользователя
- [ ] Список групп с фильтрацией
- [ ] Создание новой группы
- [ ] Приглашение участников через номер телефона
- [ ] Детальный экран группы
- [ ] Управление участниками группы

**Результаты:** Полное управление группами

#### Неделя 6: Добавление трат (P0 Features)
**Приоритет: Критический**

**Задачи:**
- [ ] Форма добавления новой траты
- [ ] Выбор плательщика и участников
- [ ] Способы деления (поровну, исключая плательщика, кастомно)
- [ ] Валидация и предпросмотр расчетов
- [ ] Прикрепление фотографий чеков
- [ ] История трат группы

**Результаты:** Полный функционал добавления и отображения трат

#### Неделя 7: Расчет долгов (P0 Features)
**Приоритет: Критический**

**Задачи:**
- [ ] Алгоритм оптимизации долгов
- [ ] Экран обзора всех долгов пользователя
- [ ] Визуализация кто кому должен
- [ ] Группировка долгов по группам
- [ ] Расчет общего баланса

**Результаты:** Автоматический расчет и отображение долгов

#### Неделя 8: Погашение долгов (P0 Features)  
**Приоритет: Критический**

**Задачи:**
- [ ] Форма погашения долга
- [ ] Поддержка частичного погашения
- [ ] Интеграция с российскими платежными системами (СБП, карты)
- [ ] Система подтверждений получения платежа
- [ ] Уведомления о погашении долгов

**Результаты:** Полный цикл погашения долгов

### Фаза 4: Advanced Features & Polish (Недели 9-12)

#### Неделя 9: Notifications & Reminders (P1 Features)
**Приоритет: Высокий**

**Задачи:**
- [ ] Push уведомления через Service Worker
- [ ] Деликатные напоминания о долгах
- [ ] Уведомления о новых тратах
- [ ] Настройки частоты уведомлений
- [ ] Российская локализация текстов уведомлений

**Результаты:** Система уведомлений с культурной адаптацией

#### Неделя 10: История и аналитика (P1 Features)
**Приоритет: Высокий**

**Задачи:**
- [ ] Детальная история всех операций
- [ ] Фильтры по дате, участникам, суммам
- [ ] Поиск по описаниям
- [ ] Базовая аналитика трат
- [ ] Экспорт данных

**Результаты:** Полная история и поиск по операциям

#### Неделя 11: Offline Support & Performance
**Приоритет: Высокий**

**Задачи:**
- [ ] Продвинутое кеширование данных
- [ ] Офлайн добавление трат с синхронизацией
- [ ] Conflict resolution при синхронизации
- [ ] Performance оптимизация (code splitting, lazy loading)
- [ ] Lighthouse оптимизация (Performance Score > 90)

**Результаты:** Стабильная работа офлайн

#### Неделя 12: Testing & Bug Fixing
**Приоритет: Критический**

**Задачи:**
- [ ] Unit тесты для ключевых компонентов
- [ ] Integration тесты для пользовательских сценариев
- [ ] Accessibility тестирование
- [ ] Кросс-браузерное тестирование
- [ ] Mobile device тестирование
- [ ] Bug fixing и полировка

**Результаты:** Стабильное, протестированное приложение

---

## 5. Интеграция с дизайн-системой

### Кастомная тема Chakra UI:

```typescript
// theme/index.ts
const russianTheme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  colors: {
    brand: {
      50: '#E8F5E8',
      500: '#1B5E20', // Primary green - стабильность, рост
      600: '#0D3D0F',
    },
    secondary: {
      500: '#1976D2', // Professional blue
    },
    accent: {
      500: '#FF6B35', // Warm orange - внимание без агрессии
    },
    success: {
      500: '#2E7D32',
    },
    warning: {
      500: '#F57C00',
    },
    error: {
      500: '#C62828',
    },
  },
  fonts: {
    heading: 'Manrope, system-ui, sans-serif',
    body: 'Manrope, system-ui, sans-serif',
    mono: 'JetBrains Mono, Consolas, monospace',
  },
  components: {
    Button: {
      variants: {
        solid: {
          _hover: {
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
          },
        },
      },
    },
  },
});
```

### Российские компоненты:

```typescript
// components/russian/CurrencyInput.tsx
const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onChange }) => {
  const formatRussianCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
    }).format(amount);
  };

  return (
    <Input
      fontFamily="mono"
      fontSize="24px"
      textAlign="center"
      value={formatRussianCurrency(value)}
      onChange={(e) => {
        // Parse Russian currency format
        const numericValue = parseRussianCurrency(e.target.value);
        onChange(numericValue);
      }}
    />
  );
};
```

---

## 6. Роутинг и навигация

### Структура маршрутов:

```typescript
// router/routes.tsx
const routes = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'groups', element: <GroupsList /> },
      { path: 'groups/:id', element: <GroupDetails /> },
      { path: 'groups/create', element: <CreateGroup /> },
      { path: 'expenses/add', element: <AddExpense /> },
      { path: 'expenses/:id', element: <ExpenseDetails /> },
      { path: 'debts', element: <DebtsList /> },
      { path: 'debts/:id/settle', element: <SettleDebt /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'welcome', element: <Welcome /> },
      { path: 'register', element: <Register /> },
      { path: 'verify', element: <SMSVerification /> },
      { path: 'profile-setup', element: <ProfileSetup /> },
    ],
  },
  { path: '/offline', element: <OfflinePage /> },
];
```

### Navigation компоненты:

```typescript
// components/navigation/TabNavigation.tsx
const TabNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { key: 'dashboard', label: 'Главная', icon: '🏠', path: '/' },
    { key: 'groups', label: 'Группы', icon: '👥', path: '/groups' },
    { key: 'debts', label: 'Долги', icon: '💸', path: '/debts' },
    { key: 'profile', label: 'Профиль', icon: '👤', path: '/profile' },
  ];

  return (
    <Box position="fixed" bottom={0} left={0} right={0}>
      <HStack spacing={0} bg="white" borderTop="1px solid" borderColor="gray.200">
        {tabs.map((tab) => (
          <TabItem
            key={tab.key}
            isActive={location.pathname === tab.path}
            onClick={() => navigate(tab.path)}
          >
            <Text fontSize="24px">{tab.icon}</Text>
            <Text fontSize="12px">{tab.label}</Text>
          </TabItem>
        ))}
      </HStack>
    </Box>
  );
};
```

---

## 7. Управление состоянием

### Zustand Store Architecture:

```typescript
// store/authStore.ts
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  
  login: (phone: string, pin: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  verifyPhone: (phone: string, code: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  
  login: async (phone, pin) => {
    set({ isLoading: true });
    try {
      const response = await authAPI.login(phone, pin);
      set({ 
        isAuthenticated: true, 
        user: response.user, 
        token: response.token,
        isLoading: false 
      });
      localStorage.setItem('token', response.token);
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: () => {
    set({ isAuthenticated: false, user: null, token: null });
    localStorage.removeItem('token');
  },
}));
```

### React Query для Server State:

```typescript
// services/api/groupsAPI.ts
export const groupsAPI = {
  getAll: (): Promise<Group[]> => 
    api.get('/api/groups').then(res => res.data),
  
  getById: (id: string): Promise<Group> => 
    api.get(`/api/groups/${id}`).then(res => res.data),
  
  create: (groupData: CreateGroupData): Promise<Group> => 
    api.post('/api/groups', groupData).then(res => res.data),
  
  addParticipant: (groupId: string, phone: string): Promise<void> => 
    api.post(`/api/groups/${groupId}/participants`, { phone }),
};

// hooks/useGroups.ts
export const useGroups = () => {
  return useQuery({
    queryKey: ['groups'],
    queryFn: groupsAPI.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: groupsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
};
```

### Form State с React Hook Form:

```typescript
// components/forms/AddExpenseForm.tsx
interface ExpenseFormData {
  amount: number;
  description: string;
  payerId: string;
  participants: string[];
  splitMethod: 'equal' | 'equal_except_payer' | 'custom';
  customSplits?: Record<string, number>;
}

const AddExpenseForm: React.FC = () => {
  const { register, handleSubmit, watch, control, formState: { errors } } = 
    useForm<ExpenseFormData>();
  
  const splitMethod = watch('splitMethod');
  const amount = watch('amount');
  
  const onSubmit = (data: ExpenseFormData) => {
    const expenseData = {
      ...data,
      amount: parseFloat(data.amount.toString()),
    };
    
    createExpense(expenseData);
  };
  
  return (
    <VStack spacing={6} as="form" onSubmit={handleSubmit(onSubmit)}>
      <CurrencyInput
        {...register('amount', { 
          required: 'Сумма обязательна',
          min: { value: 1, message: 'Минимальная сумма 1 рубль' }
        })}
        error={errors.amount?.message}
      />
      
      <Input
        {...register('description', { required: 'Описание обязательно' })}
        placeholder="На что потратили?"
        error={errors.description?.message}
      />
      
      <ParticipantSelector
        name="participants"
        control={control}
        groupId={groupId}
      />
      
      <Button type="submit" size="lg" width="full">
        Добавить трату
      </Button>
    </VStack>
  );
};
```

---

## 8. API интеграция

### HTTP Client Setup:

```typescript
// services/api/client.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  timeout: 10000,
});

// Request interceptor для добавления токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/auth/welcome';
    }
    return Promise.reject(error);
  }
);
```

### API Services:

```typescript
// services/api/expensesAPI.ts
export const expensesAPI = {
  create: async (expenseData: CreateExpenseData): Promise<Expense> => {
    const response = await api.post('/api/expenses', expenseData);
    return response.data;
  },
  
  getByGroup: async (groupId: string): Promise<Expense[]> => {
    const response = await api.get(`/api/groups/${groupId}/expenses`);
    return response.data;
  },
  
  update: async (id: string, updates: Partial<Expense>): Promise<Expense> => {
    const response = await api.put(`/api/expenses/${id}`, updates);
    return response.data;
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/expenses/${id}`);
  },
  
  uploadReceipt: async (expenseId: string, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('receipt', file);
    
    const response = await api.post(
      `/api/expenses/${expenseId}/receipt`, 
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    );
    
    return response.data.url;
  },
};
```

### Offline Support:

```typescript
// services/storage/offlineStorage.ts
class OfflineStorage {
  private db: IDBDatabase | null = null;
  
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('VibeSplitDB', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create stores for offline data
        if (!db.objectStoreNames.contains('expenses')) {
          db.createObjectStore('expenses', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('groups')) {
          db.createObjectStore('groups', { keyPath: 'id' });
        }
      };
    });
  }
  
  async saveExpense(expense: Expense): Promise<void> {
    if (!this.db) await this.init();
    
    const transaction = this.db!.transaction(['expenses'], 'readwrite');
    const store = transaction.objectStore('expenses');
    
    return new Promise((resolve, reject) => {
      const request = store.put(expense);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  
  async getPendingSync(): Promise<Expense[]> {
    // Получить все несинхронизированные данные
    // Для отправки на сервер при восстановлении сети
  }
}

export const offlineStorage = new OfflineStorage();
```

---

## 9. Тестирование

### Unit Testing с Jest + React Testing Library:

```typescript
// components/__tests__/CurrencyInput.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { CurrencyInput } from '../CurrencyInput';

describe('CurrencyInput', () => {
  it('formats Russian currency correctly', () => {
    const mockOnChange = jest.fn();
    
    render(
      <CurrencyInput 
        value={1250.50} 
        onChange={mockOnChange} 
      />
    );
    
    expect(screen.getByDisplayValue('1 250,50 ₽')).toBeInTheDocument();
  });
  
  it('handles Russian number input', () => {
    const mockOnChange = jest.fn();
    
    render(
      <CurrencyInput 
        value={0} 
        onChange={mockOnChange} 
      />
    );
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '1 500,75 ₽' } });
    
    expect(mockOnChange).toHaveBeenCalledWith(1500.75);
  });
  
  it('handles long Russian text without overflow', () => {
    const longText = "Совместный ужин в ресторане 'Пушкин' с коллегами";
    
    render(
      <Button variant="primary">
        {longText}
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('min-width: 120px');
    expect(button.scrollWidth).toBeLessThanOrEqual(button.clientWidth + 5);
  });
});
```

### Integration Testing:

```typescript
// __tests__/addExpense.integration.test.tsx
describe('Add Expense Flow', () => {
  it('completes full expense creation flow', async () => {
    const user = userEvent.setup();
    
    render(
      <Router>
        <QueryClient>
          <App />
        </QueryClient>
      </Router>
    );
    
    // Navigate to expense creation
    await user.click(screen.getByRole('button', { name: /добавить трату/i }));
    
    // Fill expense form
    const amountInput = screen.getByPlaceholderText(/сумма/i);
    await user.type(amountInput, '1500');
    
    const descriptionInput = screen.getByPlaceholderText(/описание/i);
    await user.type(descriptionInput, 'Ужин в ресторане');
    
    // Select participants
    await user.click(screen.getByText('Алиса'));
    await user.click(screen.getByText('Максим'));
    
    // Submit form
    await user.click(screen.getByRole('button', { name: /добавить/i }));
    
    // Verify success
    expect(await screen.findByText(/трата добавлена/i)).toBeInTheDocument();
  });
});
```

### Accessibility Testing:

```typescript
// __tests__/accessibility.test.tsx
import { axe } from 'jest-axe';

describe('Accessibility', () => {
  it('meets WCAG standards for currency display', async () => {
    const { container } = render(
      <CurrencyInput value={1500.50} onChange={() => {}} />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('announces currency correctly to screen readers', () => {
    render(
      <span aria-label="Тысяча пятьсот рублей пятьдесят копеек">
        1 500,50 ₽
      </span>
    );
    
    expect(screen.getByLabelText(/тысяча пятьсот рублей/i)).toBeInTheDocument();
  });
});
```

### E2E Testing с Playwright:

```typescript
// e2e/expenseFlow.spec.ts
import { test, expect } from '@playwright/test';

test('creates expense and settles debt', async ({ page }) => {
  await page.goto('/');
  
  // Login flow
  await page.fill('[data-testid="phone-input"]', '+79161234567');
  await page.click('text=Получить код');
  
  // SMS verification mock
  await page.fill('[data-testid="sms-code"]', '1234');
  await page.click('text=Подтвердить');
  
  // Create group
  await page.click('text=Создать группу');
  await page.fill('[data-testid="group-name"]', 'Тестовая группа');
  await page.click('text=Создать');
  
  // Add expense
  await page.click('[data-testid="add-expense-fab"]');
  await page.fill('[data-testid="amount-input"]', '1500');
  await page.fill('[data-testid="description-input"]', 'Тестовая трата');
  await page.click('text=Добавить');
  
  // Verify expense appears
  await expect(page.locator('text=1 500,00 ₽')).toBeVisible();
  
  // Settle debt
  await page.click('text=Погасить');
  await page.click('text=Отметить как оплаченное');
  
  // Verify settlement
  await expect(page.locator('text=Долг погашен')).toBeVisible();
});
```

---

## 10. Развертывание и сборка

### Vite Production Build:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'VibeSplit - Честное деление расходов',
        short_name: 'VibeSplit',
        description: 'Приложение для разделения совместных расходов между друзьями',
        theme_color: '#1B5E20',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
                maxEntries: 100,
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@chakra-ui/react'],
          utils: ['@tanstack/react-query', 'zustand'],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
```

### CI/CD Pipeline (GitHub Actions):

```yaml
# .github/workflows/deploy.yml
name: Deploy VibeSplit PWA

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run type checking
        run: npm run type-check
      
      - name: Run linting
        run: npm run lint
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run accessibility tests
        run: npm run test:a11y
      
      - name: Build application
        run: npm run build
      
      - name: Run Lighthouse CI
        run: npm run lighthouse

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build for production
        run: npm run build
        env:
          REACT_APP_API_URL: ${{ secrets.API_URL }}
      
      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Environment Configuration:

```bash
# .env.local
REACT_APP_API_URL=http://localhost:5000
REACT_APP_WS_URL=ws://localhost:5000
REACT_APP_SENTRY_DSN=your_sentry_dsn
REACT_APP_VERSION=$npm_package_version

# .env.production
REACT_APP_API_URL=https://api.vibesplit.ru
REACT_APP_WS_URL=wss://api.vibesplit.ru
REACT_APP_SENTRY_DSN=your_production_sentry_dsn
```

### Package.json Scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test:unit": "jest",
    "test:e2e": "playwright test",
    "test:a11y": "jest --testPathPattern=accessibility",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "lighthouse": "lhci autorun",
    "analyze": "npx vite-bundle-analyzer"
  }
}
```

### Performance Monitoring:

```typescript
// services/monitoring/performance.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = (metric: any) => {
  // Отправка метрик в аналитику
  if (process.env.NODE_ENV === 'production') {
    analytics.track('Core Web Vital', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
    });
  }
};

// Измерение Core Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);

// Кастомные метрики для Russian UX
const measureRussianTextRendering = () => {
  const start = performance.now();
  
  // Измерение времени рендеринга кириллицы
  const testElement = document.createElement('div');
  testElement.style.visibility = 'hidden';
  testElement.innerHTML = 'Тест рендеринга кириллических символов';
  document.body.appendChild(testElement);
  
  requestAnimationFrame(() => {
    const end = performance.now();
    const renderTime = end - start;
    
    sendToAnalytics({
      name: 'russian-text-render',
      value: renderTime,
      rating: renderTime < 16 ? 'good' : 'poor', // 60fps = 16ms
    });
    
    document.body.removeChild(testElement);
  });
};
```

---

## Заключение

Данный план предоставляет детальное руководство для реализации VibeSplit PWA приложения с полным учетом российских культурных особенностей и современных стандартов веб-разработки. 

### Ключевые преимущества архитектуры:
- **PWA-первый подход** обеспечивает кроссплатформенность и простую установку
- **Российская локализация** на всех уровнях - от UI компонентов до бизнес-логики
- **Offline-first** архитектура гарантирует работу в любых условиях
- **Accessibility by design** обеспечивает доступность для всех пользователей
- **Performance-oriented** подход с метриками и мониторингом

### Критические факторы успеха:
1. **Культурная адаптация** - мягкие формулировки и деликатные напоминания
2. **Российские платежные системы** - интеграция с СБП, Сбербанк, ЮMoney
3. **Mobile-first UX** - оптимизация для российских мобильных паттернов
4. **Быстрая ценность** - пользователь получает пользу в первые 5 минут
5. **Надежность** - стабильная работа офлайн и быстрая синхронизация

План рассчитан на 12 недель разработки с возможностью параллельного выполнения задач и итеративного тестирования с российскими пользователями.