import React from 'react';
import {
  VStack,
  Text,
  Button,
  Box,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { MdCheck } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    'Честное разделение расходов',
    'Автоматический расчет долгов',
    'Деликатные напоминания',
    'Работа без интернета',
    'Поддержка СБП и банковских карт',
  ];

  return (
    <VStack spacing={8} align="stretch">
      {/* Welcome text */}
      <VStack spacing={4} textAlign="center">
        <Text fontSize="xl" fontWeight="600" color="gray.700">
          Больше никаких неловких ситуаций с деньгами между друзьями
        </Text>
        <Text color="gray.600">
          VibeSplit помогает честно делить расходы и поддерживать дружеские
          отношения
        </Text>
      </VStack>

      {/* Features list */}
      <Box>
        <List spacing={3}>
          {features.map((feature, index) => (
            <ListItem key={index}>
              <ListIcon as={MdCheck} color="brand.500" />
              <Text as="span" color="gray.700">
                {feature}
              </Text>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* CTA buttons */}
      <VStack spacing={4} pt={4}>
        <Button
          size="lg"
          colorScheme="brand"
          w="full"
          onClick={() => navigate('/register')}
        >
          Начать пользоваться
        </Button>

        <Text fontSize="xs" color="gray.500" textAlign="center">
          Регистрируясь, вы соглашаетесь с условиями использования и политикой
          конфиденциальности
        </Text>
      </VStack>
    </VStack>
  );
};

export default Welcome;
