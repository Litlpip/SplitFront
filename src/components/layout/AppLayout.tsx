import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { TabNavigation } from '@/components/navigation/TabNavigation';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Box minH="100vh" bg="gray.50">
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