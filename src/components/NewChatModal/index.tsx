import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useContacts, Contact } from "../../contexts/ContactProvider";
import { useChatRooms } from "../../contexts/ChatRoomsProvider";

interface Props {
  isOpen: boolean;
  handleCloseModal(): void;
}

const NewChatModal: React.FC<Props> = ({
  isOpen,
  handleCloseModal = () => {},
}) => {
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const { contacts } = useContacts();
  const { addChatRooms } = useChatRooms();
  const handleChangeCheckbox = (contact: Contact) => {
    setSelectedContacts((prev) => {
      if (prev.find((prevC) => prevC.id === contact.id)) {
        return prev.filter((prevC) => prevC.id !== contact.id);
      } else {
        return [...prev, contact];
      }
    });
  };
  const handleCreateChat = () => {
    addChatRooms(selectedContacts);
    handleCloseModal();
  };
  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Select Friend(s) to Add to Chat Room</FormLabel>
            <VStack alignItems="flex-start">
              {contacts.map((contact: Contact) => (
                <Checkbox
                  colorScheme="blue"
                  key={contact.id}
                  checked={
                    selectedContacts.find((c) => c.id === contact.id) !== null
                  }
                  onChange={() => handleChangeCheckbox(contact)}
                >
                  {contact.name}
                </Checkbox>
              ))}
            </VStack>
          </FormControl>
          <code>{JSON.stringify(selectedContacts)}</code>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreateChat}>
            Create
          </Button>
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewChatModal;
