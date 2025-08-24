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
  const [showRestoredMessage, setShowRestoredMessage] = useState(false);

  const bgColor = useColorModeValue('yellow.500', 'yellow.600');
  const onlineColor = useColorModeValue('green.500', 'green.600');

  useEffect(() => {
    let wasOfflineRef = false;
    let restoreTimeoutId: number;

    const handleOnline = () => {
      console.log('Connection restored. Was offline:', wasOfflineRef);
      setIsOnline(true);

      // Only show restored message if we were actually offline before
      if (wasOfflineRef) {
        setShowRestoredMessage(true);
        // Hide the restored message after 3 seconds
        restoreTimeoutId = setTimeout(() => {
          setShowRestoredMessage(false);
          wasOfflineRef = false;
        }, 3000);
      }
    };

    const handleOffline = () => {
      console.log('Connection lost');
      setIsOnline(false);
      wasOfflineRef = true;
      setShowRestoredMessage(false);
      // Clear any pending restore message timeout
      if (restoreTimeoutId) {
        clearTimeout(restoreTimeoutId);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (restoreTimeoutId) {
        clearTimeout(restoreTimeoutId);
      }
    };
  }, []);

  // Debug logging
  console.log('OfflineIndicator render:', { isOnline, showRestoredMessage });

  return (
    <>
      {/* Offline indicator - only show when actually offline and not showing restore message */}
      {!isOnline && !showRestoredMessage && (
        <Slide
          direction="top"
          in={!isOnline && !showRestoredMessage}
          style={{ zIndex: 1001 }}
        >
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
      )}

      {/* Back online indicator - only show when explicitly showing restore message */}
      {showRestoredMessage && (
        <Slide
          direction="top"
          in={showRestoredMessage}
          style={{ zIndex: 1002 }}
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
            zIndex={1002}
          >
            <HStack justify="center" spacing={2}>
              <Icon as={MdWifi} boxSize={4} />
              <Text fontSize="sm" fontWeight={500}>
                Подключение восстановлено. Синхронизируем данные...
              </Text>
            </HStack>
          </Box>
        </Slide>
      )}
    </>
  );
};
