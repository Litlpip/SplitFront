// Application constants for VibeSplit

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
