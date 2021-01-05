import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdChat, MdPersonAdd } from "react-icons/md";
import NewChatModal from "../NewChatModal";
import NewContactModal from "../NewContactModal";

const Dashboard = () => {
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [isOpenContact, setIsOpenContact] = useState(false);
  return (
    <Flex h="100%" position="relative">
      <Box h="100%" width="25%">
        asd
      </Box>
      <Box h="100%" w="75%" bg="rgba(0,0,0,0.25)">
        asd
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
