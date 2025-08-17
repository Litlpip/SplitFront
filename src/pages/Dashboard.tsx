import React from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Card,
  CardBody,
  HStack,
  Icon,
  Badge,
} from '@chakra-ui/react';
import { MdAdd, MdAccountBalance } from 'react-icons/md';

const Dashboard: React.FC = () => {
  return (
    <VStack spacing={6} align="stretch">
      {/* Welcome header */}
      <Box>
        <Text fontSize="2xl" fontWeight="700" color="brand.600" mb={2}>
          Добро пожаловать!
        </Text>
        <Text color="gray.600">
          Ваш баланс и последние активности
        </Text>
      </Box>

      {/* Balance overview */}
      <Card>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between" align="center">
              <HStack spacing={3}>
                <Icon as={MdAccountBalance} boxSize={6} color="brand.500" />
                <VStack spacing={0} align="flex-start">
                  <Text fontSize="sm" color="gray.600">
                    Общий баланс
                  </Text>
                  <Text fontSize="2xl" fontWeight="700" color="brand.600">
                    0,00 ₽
                  </Text>
                </VStack>
              </HStack>
              <Badge colorScheme="green" variant="subtle">
                Все погашено
              </Badge>
            </HStack>
            
            <Button
              leftIcon={<MdAdd />}
              colorScheme="brand"
              size="lg"
              w="full"
            >
              Добавить трату
            </Button>
          </VStack>
        </CardBody>
      </Card>

      {/* Quick actions */}
      <VStack spacing={3} align="stretch">
        <Text fontSize="lg" fontWeight="600" color="gray.700">
          Быстрые действия
        </Text>
        
        <HStack spacing={3}>
          <Button flex={1} variant="outline" colorScheme="brand">
            Создать группу
          </Button>
          <Button flex={1} variant="outline" colorScheme="secondary">
            Посмотреть долги
          </Button>
        </HStack>
      </VStack>

      {/* Recent activity placeholder */}
      <VStack spacing={3} align="stretch">
        <Text fontSize="lg" fontWeight="600" color="gray.700">
          Последняя активность
        </Text>
        
        <Card>
          <CardBody textAlign="center" py={8}>
            <Text color="gray.500" fontSize="sm">
              Пока нет активности.
              <br />
              Создайте первую группу или добавьте трату!
            </Text>
          </CardBody>
        </Card>
      </VStack>
    </VStack>
  );
};

export default Dashboard;