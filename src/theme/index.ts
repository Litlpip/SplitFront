import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { THEME_COLORS } from '@/constants';

// Theme configuration
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

// Russian-adapted theme for VibeSplit
export const russianTheme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#E8F5E8',
      100: '#C8E6C8',
      200: '#A5D6A7',
      300: '#81C784',
      400: '#66BB6A',
      500: THEME_COLORS.PRIMARY, // #1B5E20
      600: THEME_COLORS.PRIMARY_DARK, // #0D3D0F
      700: '#0A2D0C',
      800: '#071F08',
      900: '#041204',
    },
    secondary: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: THEME_COLORS.SECONDARY, // #1976D2
      600: '#1565C0',
      700: '#0D47A1',
      800: '#0A2472',
      900: '#061854',
    },
    accent: {
      50: '#FFF3E0',
      100: '#FFE0B2',
      200: '#FFCC80',
      300: '#FFB74D',
      400: '#FFA726',
      500: THEME_COLORS.ACCENT, // #FF6B35
      600: '#F57C00',
      700: '#EF6C00',
      800: '#E65100',
      900: '#BF360C',
    },
  },
  fonts: {
    heading: 'Manrope, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    body: 'Manrope, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    mono: 'JetBrains Mono, Consolas, Monaco, monospace',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px',
    '5xl': '36px',
    '6xl': '48px',
  },
  lineHeights: {
    normal: 'normal',
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: '2',
    // Enhanced for Cyrillic readability
    russian: 1.6,
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
    // Enhanced for Russian text
    russian: '0.01em',
  },
  space: {
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 600,
        borderRadius: '8px',
        transition: 'all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        _focus: {
          boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.6)',
        },
        _disabled: {
          opacity: 0.6,
          cursor: 'not-allowed',
        },
      },
      sizes: {
        sm: {
          h: '32px',
          minW: '80px',
          fontSize: 'sm',
          px: 3,
        },
        md: {
          h: '40px',
          minW: '96px',
          fontSize: 'md',
          px: 4,
        },
        lg: {
          h: '48px',
          minW: '120px',
          fontSize: 'lg',
          px: 6,
        },
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-1px)',
            boxShadow: 'lg',
            _disabled: {
              bg: 'brand.500',
              transform: 'none',
            },
          },
          _active: {
            bg: 'brand.700',
            transform: 'translateY(0)',
          },
        },
        outline: {
          border: '2px solid',
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
            transform: 'translateY(-1px)',
            _disabled: {
              bg: 'transparent',
              transform: 'none',
            },
          },
        },
        ghost: {
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: '8px',
          fontSize: 'md',
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px rgba(27, 94, 32, 0.6)',
          },
          _placeholder: {
            color: 'gray.400',
          },
        },
      },
      sizes: {
        md: {
          field: {
            h: '40px',
            px: 3,
          },
        },
        lg: {
          field: {
            h: '48px',
            px: 4,
            fontSize: 'lg',
          },
        },
      },
      variants: {
        filled: {
          field: {
            bg: 'gray.50',
            _hover: {
              bg: 'gray.100',
            },
            _focus: {
              bg: 'white',
              borderColor: 'brand.500',
            },
          },
        },
        currency: {
          field: {
            bg: 'brand.50',
            borderColor: 'transparent',
            fontFamily: 'mono',
            fontSize: '2xl',
            fontWeight: 600,
            textAlign: 'center',
            letterSpacing: '1px',
            color: 'brand.600',
            _focus: {
              bg: 'brand.100',
              borderColor: 'brand.500',
            },
            _placeholder: {
              color: 'brand.300',
            },
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          transition: 'all 250ms ease-out',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
          },
        },
        body: {
          p: 4,
        },
        header: {
          p: 4,
          pb: 0,
        },
        footer: {
          p: 4,
          pt: 0,
        },
      },
      variants: {
        debt: {
          container: {
            borderLeft: '4px solid',
            borderLeftColor: 'accent.500',
            bg: 'accent.50',
          },
        },
        success: {
          container: {
            borderLeft: '4px solid',
            borderLeftColor: 'green.500',
            bg: 'green.50',
          },
        },
        info: {
          container: {
            borderLeft: '4px solid',
            borderLeftColor: 'secondary.500',
            bg: 'secondary.50',
          },
        },
      },
    },
    Text: {
      baseStyle: {
        lineHeight: 'russian',
        letterSpacing: 'russian',
      },
      variants: {
        currency: {
          fontFamily: 'mono',
          fontWeight: 600,
          color: 'brand.600',
        },
        debt: {
          color: 'accent.600',
          fontWeight: 500,
        },
        success: {
          color: 'green.600',
          fontWeight: 500,
        },
      },
    },
  },
  styles: {
    global: {
      'html, body': {
        fontFamily: 'body',
        lineHeight: 'russian',
        letterSpacing: 'russian',
      },
      // Enhanced focus indicators for accessibility
      '*:focus-visible': {
        outline: '3px solid',
        outlineColor: 'secondary.500',
        outlineOffset: '2px',
        borderRadius: '4px',
      },
      // Remove outline for mouse users
      '*:focus:not(:focus-visible)': {
        outline: 'none',
      },
      // High contrast mode support
      '@media (prefers-contrast: high)': {
        '*': {
          borderColor: 'ButtonText !important',
          backgroundColor: 'ButtonFace !important',
          color: 'ButtonText !important',
        },
      },
      // Reduced motion support
      '@media (prefers-reduced-motion: reduce)': {
        '*': {
          animationDuration: '0.01ms !important',
          animationIterationCount: '1 !important',
          transitionDuration: '0.01ms !important',
        },
      },
    },
  },
});