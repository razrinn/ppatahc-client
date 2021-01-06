import { Box, Textarea, VStack } from "@chakra-ui/react";
import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { useChatRooms } from "../../contexts/ChatRoomsProvider";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const ChatRoom = () => {
  const [currentMessage, setCurrentMessage] = useLocalStorage(
    "current-message",
    ""
  );
  const { selectedChatRoom } = useChatRooms();

  const handlePressEnter = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      alert(currentMessage);
      setCurrentMessage("");
    }
  };
  return (
    <VStack h="inherit">
      <Box flexGrow={1} overflow="auto">
        {JSON.stringify(selectedChatRoom)}
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
