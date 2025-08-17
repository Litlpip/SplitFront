import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Icon,
  HStack,
  Slide,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdWifiOff, MdWifi } from 'react-icons/md';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  const bgColor = useColorModeValue('yellow.500', 'yellow.600');
  const onlineColor = useColorModeValue('green.500', 'green.600');

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set initial state
    if (!navigator.onLine) {
      setShowOfflineMessage(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Hide online message after 3 seconds
  useEffect(() => {
    if (isOnline && !showOfflineMessage) {
      const timer = setTimeout(() => {
        setShowOfflineMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, showOfflineMessage]);

  return (
    <>
      {/* Offline indicator */}
      <Slide direction="top" in={!isOnline} style={{ zIndex: 1001 }}>
        <Box
          bg={bgColor}
          color="white"
          py={2}
          px={4}
          textAlign="center"
          position="fixed"
          top={0}
          left={0}
          right={0}
          zIndex={1001}
        >
          <HStack justify="center" spacing={2}>
            <Icon as={MdWifiOff} boxSize={4} />
            <Text fontSize="sm" fontWeight={500}>
              Работаем офлайн. Данные синхронизируются при подключении.
            </Text>
          </HStack>
        </Box>
      </Slide>

      {/* Back online indicator */}
      <Slide
        direction="top"
        in={isOnline && showOfflineMessage}
        style={{ zIndex: 1001 }}
      >
        <Box
          bg={onlineColor}
          color="white"
          py={2}
          px={4}
          textAlign="center"
          position="fixed"
          top={0}
          left={0}
          right={0}
          zIndex={1001}
        >
          <HStack justify="center" spacing={2}>
            <Icon as={MdWifi} boxSize={4} />
            <Text fontSize="sm" fontWeight={500}>
              Подключение восстановлено. Синхронизируем данные...
            </Text>
          </HStack>
        </Box>
      </Slide>
    </>
  );
};