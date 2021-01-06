import { Box, Text, useColorMode } from "@chakra-ui/react";
import React from "react";
import { useChatRooms } from "../../contexts/ChatRoomsProvider";

const ChatList = () => {
  const { chatRooms, selectChatRoom } = useChatRooms();
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "dark" ? "blue.200" : "blue.500";
  const textColor = colorMode === "dark" ? "gray.800" : "white";
  const borderColor = colorMode === "dark" ? "gray.700" : "gray.50";
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
          <Text fontSize={12}>Lorem ipsum dolor sit amet.</Text>
        </Box>
      ))}
    </>
  );
};

export default ChatList;
