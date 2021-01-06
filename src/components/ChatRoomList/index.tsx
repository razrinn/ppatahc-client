import { Box, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useChatRooms } from "../../contexts/ChatRoomsProvider";

const ChatList = () => {
  const { chatRooms, selectChatRoom } = useChatRooms();
  const bgColor = useColorModeValue("blue.500", "blue.200");
  const textColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("#E2E8F0", "#2D3748");
  return (
    <>
      {chatRooms.map((chatRoom, idx) => (
        <Box
          key={idx}
          p={6}
          borderBottomWidth="1px"
          borderStyle="solid"
          borderBottomColor={borderColor}
          bg={chatRoom.selected ? bgColor : ""}
          color={chatRoom.selected ? textColor : ""}
          cursor="pointer"
          onClick={() => selectChatRoom(idx)}
          zIndex={0}
        >
          <Text fontWeight="bold">
            {chatRoom.recipients
              .map((recipient) => recipient.name || recipient.id)
              .join(", ")}
          </Text>
          {chatRoom.messages.length > 0 && (
            <Text fontSize={12}>
              {chatRoom.messages[chatRoom.messages.length - 1].text}
            </Text>
          )}
        </Box>
      ))}
    </>
  );
};

export default ChatList;
