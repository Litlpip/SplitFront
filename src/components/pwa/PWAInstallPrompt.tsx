import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Icon,
  useToast,
  Slide,
} from '@chakra-ui/react';
import { MdInstallMobile, MdClose } from 'react-icons/md';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Save the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show our custom install prompt after a delay
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
      toast({
        title: 'Приложение установлено!',
        description: 'VibeSplit теперь доступен с главного экрана',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [toast]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      toast({
        title: 'Установка началась',
        description: 'Приложение будет добавлено на главный экран',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    }

    // Clear the deferredPrompt variable
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Don't show again for this session
    setDeferredPrompt(null);
  };

  if (!showInstallPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <Slide direction="bottom" in={showInstallPrompt} style={{ zIndex: 1000 }}>
      <Box
        bg="white"
        p={4}
        mx={4}
        mb={4}
        borderRadius="12px"
        boxShadow="0 8px 25px rgba(0, 0, 0, 0.15)"
        border="1px solid"
        borderColor="gray.200"
      >
        <HStack spacing={4} align="flex-start">
          <Icon as={MdInstallMobile} boxSize={6} color="brand.500" mt={1} />
          <VStack spacing={3} flex={1} align="flex-start">
            <Text fontWeight={600} fontSize="md">
              Установить VibeSplit?
            </Text>
            <Text fontSize="sm" color="gray.600">
              Быстрый доступ с главного экрана, работа офлайн и уведомления о долгах.
            </Text>
            <HStack spacing={2} w="full">
              <Button
                size="sm"
                variant="solid"
                colorScheme="brand"
                onClick={handleInstallClick}
                flex={1}
              >
                Установить
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
                flex={1}
              >
                Позже
              </Button>
            </HStack>
          </VStack>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDismiss}
            minW="auto"
            p={1}
          >
            <Icon as={MdClose} boxSize={4} />
          </Button>
        </HStack>
      </Box>
    </Slide>
  );
};