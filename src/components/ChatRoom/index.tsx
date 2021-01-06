import { Box, Tag, Text, Textarea, VStack } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useChatRooms } from "../../contexts/ChatRoomsProvider";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const ChatRoom = () => {
  const [currentMessage, setCurrentMessage] = useLocalStorage(
    "current-message",
    ""
  );
  const { selectedChatRoom, sendMessage } = useChatRooms();
  const setRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      node.scrollIntoView();
    }
  }, []);
  const handlePressEnter = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmitMessage();
      setCurrentMessage("");
    }
  };
  const handleSubmitMessage = () => {
    if (selectedChatRoom?.recipients && currentMessage !== "") {
      sendMessage(selectedChatRoom.recipients, currentMessage);
    }
  };
  return (
    <VStack h="inherit">
      <Box flexGrow={1} overflow="auto" p={6} w="100%">
        <VStack
          display="flex "
          alignItems="flex-start"
          justifyContent="flex-end"
          minH="100%"
        >
          {selectedChatRoom?.messages.map((message, idx) => (
            <VStack
              alignItems={message.isMine ? "flex-end" : "flex-start"}
              w="100%"
              key={idx}
              ref={selectedChatRoom.messages.length - 1 === idx ? setRef : null}
            >
              <Text fontSize="xs" fontWeight="bold" mb={2}>
                {message.isMine ? "You" : message.senderName}
              </Text>
              <Tag
                colorScheme={!message.isMine ? "blue" : "gray"}
                fontSize="16px"
                px={4}
                py={2}
              >
                {message.text}
              </Tag>
            </VStack>
          ))}
        </VStack>
      </Box>
      <Box p={6} w="100%">
        <Textarea
          placeholder="Write a message. Press 'enter' to send. Press 'shift + enter' to add new line."
          resize="none"
          value={currentMessage}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={handlePressEnter}
        />
      </Box>
    </VStack>
  );
};

export default ChatRoom;
