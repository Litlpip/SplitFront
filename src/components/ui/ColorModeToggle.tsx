import React from 'react';
import {
  IconButton,
  useColorMode,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

interface ColorModeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost';
}

export const ColorModeToggle: React.FC<ColorModeToggleProps> = ({
  size = 'md',
  variant = 'ghost',
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  // Адаптивные цвета иконки
  const iconColor = useColorModeValue('gray.600', 'gray.300');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  const tooltipLabel = isDark
    ? 'Переключить на светлую тему'
    : 'Переключить на темную тему';

  return (
    <Tooltip label={tooltipLabel} placement="bottom">
      <IconButton
        aria-label={tooltipLabel}
        icon={isDark ? <MdLightMode /> : <MdDarkMode />}
        onClick={toggleColorMode}
        size={size}
        variant={variant}
        color={iconColor}
        _hover={{
          bg: hoverBg,
        }}
        _focus={{
          boxShadow: 'none',
        }}
        _focusVisible={{
          boxShadow: 'outline',
        }}
      />
    </Tooltip>
  );
};