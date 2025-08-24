import React from 'react';
import { Box, Container, VStack, Text } from '@chakra-ui/react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box minH="100vh" bg="brand.50">
      <Container maxW="container.sm" px={4} py={8}>
        <VStack spacing={8} align="stretch">
          {/* Logo and branding */}
          <VStack spacing={4} textAlign="center" pt={8}>
            <Box
              w="80px"
              h="80px"
              bg="brand.500"
              borderRadius="20px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={2}
            >
              <Text fontSize="2xl" fontWeight="bold" color="white">
                VS
              </Text>
            </Box>
            <VStack spacing={2}>
              <Text fontSize="2xl" fontWeight="700" color="brand.600">
                VibeSplit
              </Text>
              <Text
                fontSize="md"
                color="gray.600"
                textAlign="center"
                maxW="280px"
              >
                Честное деление расходов между друзьями
              </Text>
            </VStack>
          </VStack>

          {/* Auth content */}
          <Box>{children}</Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default AuthLayout;
