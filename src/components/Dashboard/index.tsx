import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdChat, MdPersonAdd } from "react-icons/md";
import { useChatRooms } from "../../contexts/ChatRoomsProvider";
import ChatRoom from "../ChatRoom";
import ChatList from "../ChatRoomList";
import NewChatModal from "../NewChatModal";
import NewContactModal from "../NewContactModal";

const Dashboard = () => {
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [isOpenContact, setIsOpenContact] = useState(false);
  const { chatRooms, selectedChatRoom } = useChatRooms();
  return (
    <Flex h="100%" position="relative">
      <Box h="inherit" w="25%">
        {chatRooms.length > 0 ? (
          <ChatList />
        ) : (
          <Text p={6}>No chat chat room yet. Please create a new one.</Text>
        )}
      </Box>
      <Box h="inherit" w="75%" bg="rgba(0,0,0,0.25)">
        {selectedChatRoom ? (
          <ChatRoom />
        ) : (
          <Text p={6}>
            No chat chat room selected. Please click a chat room to select.
          </Text>
        )}
      </Box>
      <ButtonGroup spacing="6" position="absolute" bottom={8} left={8}>
        <Button
          colorScheme="blue"
          type="submit"
          leftIcon={<MdChat />}
          onClick={() => setIsOpenChat(true)}
        >
          New Chat
        </Button>
        <Button
          variant="outline"
          colorScheme="blue"
          leftIcon={<MdPersonAdd />}
          onClick={() => setIsOpenContact(true)}
        >
          New Contact
        </Button>
      </ButtonGroup>
      <NewChatModal
        isOpen={isOpenChat}
        handleCloseModal={() => setIsOpenChat(false)}
      />
      <NewContactModal
        isOpen={isOpenContact}
        handleCloseModal={() => setIsOpenContact(false)}
      />
    </Flex>
  );
};

export default Dashboard;
