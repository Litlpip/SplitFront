import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Конфигурация темы с поддержкой темного режима
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true, // Используем системную тему по умолчанию
};

// Кастомные цвета для бренда
const colors = {
  brand: {
    50: '#E6F3FF',
    100: '#CCE7FF',
    200: '#99CFFF',
    300: '#66B8FF',
    400: '#33A0FF',
    500: '#0088FF', // Основной цвет бренда
    600: '#0066CC',
    700: '#004499',
    800: '#002266',
    900: '#001133',
  },
  gray: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923',
  },
};

// Глобальные стили для светлой и темной темы
const styles = {
  global: (props: any) => ({
    'html, body': {
      bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
      color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
    },
    '#root': {
      minHeight: '100vh',
      bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
    },
    '*::placeholder': {
      color: props.colorMode === 'dark' ? 'gray.400' : 'gray.500',
    },
    '*, *::before, *::after': {
      borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
    },
  }),
};

// Кастомизация компонентов
const components = {
  Button: {
    baseStyle: {
      _focus: {
        boxShadow: 'none',
      },
      _focusVisible: {
        boxShadow: 'outline',
      },
    },
  },
  Card: {
    baseStyle: (props: any) => ({
      container: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
        boxShadow: props.colorMode === 'dark' ? 'md' : 'sm',
      },
    }),
  },
  Input: {
    variants: {
      outline: (props: any) => ({
        field: {
          bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
          borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.300',
          _hover: {
            borderColor: props.colorMode === 'dark' ? 'gray.500' : 'gray.400',
          },
          _focus: {
            borderColor: 'brand.500',
            boxShadow: `0 0 0 1px var(--chakra-colors-brand-500)`,
          },
        },
      }),
    },
  },
  Badge: {
    baseStyle: (props: any) => ({
      bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
      color: props.colorMode === 'dark' ? 'gray.200' : 'gray.700',
    }),
  },
  List: {
    baseStyle: (props: any) => ({
      item: {
        color: props.colorMode === 'dark' ? 'gray.200' : 'gray.700',
      },
    }),
  },
};

// Создаем и экспортируем тему
const theme = extendTheme({
  config,
  colors,
  styles,
  components,
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },
});

export default theme;
