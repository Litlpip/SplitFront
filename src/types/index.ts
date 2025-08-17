// Core domain types for VibeSplit application

export interface User {
  id: string;
  phone: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  participants: GroupParticipant[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GroupParticipant {
  userId: string;
  user: User;
  joinedAt: Date;
  isAdmin: boolean;
}

export interface Expense {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  currency: 'RUB';
  payerId: string;
  payer: User;
  participants: ExpenseParticipant[];
  receiptUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExpenseParticipant {
  userId: string;
  user: User;
  share: number; // Amount this user owes
}

export interface Debt {
  id: string;
  fromUserId: string;
  fromUser: User;
  toUserId: string;
  toUser: User;
  amount: number;
  currency: 'RUB';
  groupId?: string;
  group?: Group;
  status: 'pending' | 'settled';
  settledAt?: Date;
  createdAt: Date;
}

export interface Settlement {
  id: string;
  debtId: string;
  amount: number;
  paymentMethod: 'cash' | 'sbp' | 'card' | 'other';
  confirmedAt?: Date;
  createdAt: Date;
}

// Form data types
export interface RegisterFormData {
  phone: string;
  name: string;
  verificationCode: string;
}

export interface CreateGroupFormData {
  name: string;
  description?: string;
}

export interface AddExpenseFormData {
  description: string;
  amount: number;
  payerId: string;
  participants: string[];
  splitMethod: 'equal' | 'equal_except_payer' | 'custom';
  customSplits?: Record<string, number>;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Russian cultural types
export interface RussianLanguageOptions {
  currency: 'formal' | 'informal'; // "рублей" vs "руб"
  politeness: 'formal' | 'friendly'; // "Вы" vs "ты"
  debtLanguage: 'direct' | 'indirect'; // "должен" vs "к доплате"
}

export interface NotificationSettings {
  reminders: boolean;
  reminderInterval: 'daily' | 'weekly' | 'never';
  debtUpdates: boolean;
  groupActivity: boolean;
  pushEnabled: boolean;
}