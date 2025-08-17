// Application constants for VibeSplit

export const APP_CONFIG = {
  NAME: 'VibeSplit',
  DESCRIPTION: 'Честное деление расходов между друзьями',
  VERSION: '1.0.0',
  LOCALE: 'ru-RU',
  CURRENCY: 'RUB',
  PHONE_REGION: 'RU',
} as const;

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'vibesplit_auth_token',
  USER_DATA: 'vibesplit_user_data',
  THEME_MODE: 'vibesplit_theme_mode',
  LANGUAGE_SETTINGS: 'vibesplit_language_settings',
  NOTIFICATION_SETTINGS: 'vibesplit_notification_settings',
} as const;

export const ROUTES = {
  HOME: '/',
  AUTH: {
    WELCOME: '/auth/welcome',
    REGISTER: '/auth/register',
    VERIFY: '/auth/verify',
    PROFILE_SETUP: '/auth/profile-setup',
  },
  GROUPS: {
    LIST: '/groups',
    CREATE: '/groups/create',
    DETAILS: (id: string) => `/groups/${id}`,
  },
  EXPENSES: {
    ADD: '/expenses/add',
    DETAILS: (id: string) => `/expenses/${id}`,
  },
  DEBTS: {
    LIST: '/debts',
    SETTLE: (id: string) => `/debts/${id}/settle`,
  },
  PROFILE: '/profile',
  OFFLINE: '/offline',
} as const;

export const VALIDATION_RULES = {
  PHONE: {
    PATTERN: /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
    MIN_LENGTH: 10,
    MAX_LENGTH: 12,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[а-яёА-ЯЁa-zA-Z\s\-]+$/,
  },
  GROUP_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  EXPENSE_DESCRIPTION: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 200,
  },
  AMOUNT: {
    MIN: 0.01,
    MAX: 1000000,
  },
} as const;

export const RUSSIAN_MESSAGES = {
  ERRORS: {
    NETWORK: 'Временные проблемы с подключением. Попробуем ещё раз?',
    VALIDATION: 'Пожалуйста, проверьте введенные данные',
    PERMISSION: 'Нужно разрешение для этого действия',
    SERVER: 'Наши серверы немного устали. Подождем минутку?',
    PHONE_INVALID: 'Пожалуйста, введите корректный номер телефона',
    NAME_INVALID: 'Имя должно содержать только буквы',
    AMOUNT_INVALID: 'Введите корректную сумму',
  },
  SUCCESS: {
    EXPENSE_ADDED: 'Трата успешно добавлена и разделена',
    DEBT_SETTLED: 'Долг погашен! Спасибо за честность',
    GROUP_CREATED: 'Группа создана, можно приглашать друзей',
    INVITATION_SENT: 'Приглашение отправлено',
    PROFILE_UPDATED: 'Профиль обновлен',
  },
  DEBT_LANGUAGE: {
    YOU_OWE: (creditor: string, amount: string) => `К доплате ${creditor} ${amount}`,
    THEY_OWE: (debtor: string, amount: string) => `${debtor} участвовал в расходах ${amount}`,
    SETTLED: (amount: string) => `Расчет завершен: ${amount}`,
    REMINDER: 'Деликатное напоминание отправлено',
    GROUP_NEEDS_SETTLEMENT: (groupName: string) => `Группе "${groupName}" нужно урегулировать расходы`,
  },
} as const;

export const THEME_COLORS = {
  PRIMARY: '#1B5E20',
  PRIMARY_DARK: '#0D3D0F',
  PRIMARY_LIGHT: '#E8F5E8',
  SECONDARY: '#1976D2',
  SECONDARY_LIGHT: '#E3F2FD',
  ACCENT: '#FF6B35',
  ACCENT_SECONDARY: '#7B1FA2',
  SUCCESS: '#2E7D32',
  WARNING: '#F57C00',
  ERROR: '#C62828',
  INFO: '#0277BD',
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  CURRENCY_FORMAT: 300,
  SUCCESS_CELEBRATION: 600,
  GROUP_CELEBRATION: 1200,
} as const;

export const PWA_CONFIG = {
  UPDATE_INTERVAL: 60000, // 1 minute
  CACHE_NAMES: {
    STATIC: 'vibesplit-static-v1',
    DYNAMIC: 'vibesplit-dynamic-v1',
    API: 'vibesplit-api-v1',
  },
} as const;