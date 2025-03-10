import {
  Box,
  Input,
  Text,
  HStack,
  IconButton,
  CloseButton,
} from '@chakra-ui/react'
import { FiSend } from 'react-icons/fi'
import { useState } from 'react'
import { AnimatedLogo } from './AnimatedLogo'

interface Message {
  text: string;
  sender: string;
}

interface ChatProps {
  isOpen: boolean
  onClose: () => void
}

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSend: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

const ChatInput = ({ message, setMessage, handleSend, handleKeyPress }: ChatInputProps) => (
  <Box p={4} borderTop="1px" borderColor="gray.100">
    <HStack spacing={2}>
      <Input
        placeholder="Message AI Assistant..."
        bg="gray.50"
        border="none"
        size="md"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        _focus={{ 
          bg: 'white',
          ring: 1,
          ringColor: '#9C6CFE'
        }}
        _placeholder={{
          color: 'gray.400'
        }}
      />
      <IconButton
        aria-label="Send message"
        icon={<FiSend />}
        onClick={handleSend}
        bg="#9C6CFE"
        color="white"
        size="md"
        _hover={{ bg: '#8A5EE3' }}
      />
    </HStack>
  </Box>
);

export const Chat = ({ isOpen, onClose }: ChatProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleClose = () => {
    onClose();
    setMessage('');
    setMessages([]);
  };

  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      height="100vh"
      width="30%"
      bg="white"
      boxShadow="-4px 0 12px rgba(0, 0, 0, 0.1)"
      transform={isOpen ? 'translateX(0)' : 'translateX(100%)'}
      transition="transform 0.3s ease-in-out"
      zIndex={1000}
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <Box p={4} borderBottom="1px" borderColor="gray.100">
        <HStack spacing={3} align="center">
          <AnimatedLogo size={20} />
          <Text fontSize="lg" fontWeight="medium">
            Chatbot
          </Text>
          <Box flex={1} />
          <CloseButton onClick={handleClose} />
        </HStack>
      </Box>

      {/* Title */}
      <Box py={6}>
        <Text fontSize="2xl" fontWeight="medium" textAlign="center">
          How can I help you today?
        </Text>
      </Box>

      {/* Content Area */}
      <Box flex={1} overflowY="auto" display="flex" justifyContent="center">
        {messages.map((msg, index) => (
          <Box key={index} p={2}>
            <Text>{msg.text}</Text>
          </Box>
        ))}
      </Box>

      {/* Chat Input */}
      <ChatInput
        message={message}
        setMessage={setMessage}
        handleSend={handleSend}
        handleKeyPress={handleKeyPress}
      />
    </Box>
  );
};
