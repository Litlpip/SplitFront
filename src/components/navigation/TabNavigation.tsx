import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  HStack,
  VStack,
  Text,
  Icon,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  MdHome,
  MdGroups,
  MdAccountBalanceWallet,
  MdPerson,
} from 'react-icons/md';
import { ROUTES } from '@/constants';

interface TabItem {
  key: string;
  label: string;
  icon: typeof MdHome;
  path: string;
}

const tabs: TabItem[] = [
  {
    key: 'dashboard',
    label: 'Главная',
    icon: MdHome,
    path: ROUTES.HOME,
  },
  {
    key: 'groups',
    label: 'Группы',
    icon: MdGroups,
    path: ROUTES.GROUPS.LIST,
  },
  {
    key: 'debts',
    label: 'Долги',
    icon: MdAccountBalanceWallet,
    path: ROUTES.DEBTS.LIST,
  },
  {
    key: 'profile',
    label: 'Профиль',
    icon: MdPerson,
    path: ROUTES.PROFILE,
  },
];

export const TabNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const isTabActive = (tabPath: string): boolean => {
    if (tabPath === ROUTES.HOME) {
      return location.pathname === ROUTES.HOME;
    }
    return location.pathname.startsWith(tabPath);
  };

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg={bgColor}
      borderTop="1px solid"
      borderColor={borderColor}
      py={2}
      px={4}
      zIndex={10}
      // Safe area for iOS devices
      paddingBottom="env(safe-area-inset-bottom)"
    >
      <HStack spacing={0} justify="space-around" maxW="container.sm" mx="auto">
        {tabs.map(tab => {
          const isActive = isTabActive(tab.path);

          return (
            <Button
              key={tab.key}
              variant="ghost"
              size="sm"
              h="auto"
              py={2}
              px={2}
              minW="60px"
              borderRadius="8px"
              onClick={() => navigate(tab.path)}
              bg={isActive ? 'brand.50' : 'transparent'}
              _hover={{
                bg: isActive ? 'brand.100' : 'gray.100',
              }}
              _active={{
                bg: isActive ? 'brand.200' : 'gray.200',
              }}
            >
              <VStack spacing={1}>
                <Icon
                  as={tab.icon}
                  boxSize={5}
                  color={isActive ? 'brand.500' : 'gray.500'}
                />
                <Text
                  fontSize="xs"
                  fontWeight={isActive ? 600 : 400}
                  color={isActive ? 'brand.600' : 'gray.600'}
                  lineHeight="1"
                >
                  {tab.label}
                </Text>
              </VStack>
            </Button>
          );
        })}
      </HStack>
    </Box>
  );
};
