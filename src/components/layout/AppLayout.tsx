import React from 'react';
import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import { TabNavigation } from '@/components/navigation/TabNavigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  
  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Main content area */}
      <Container
        maxW="container.sm"
        px={4}
        py={4}
        pb="80px" // Space for bottom navigation
      >
        {children}
      </Container>

      {/* Bottom tab navigation */}
      <TabNavigation />
    </Box>
  );
};

export default AppLayout;
