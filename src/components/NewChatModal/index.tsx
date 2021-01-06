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
  Text,
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
  const [isError, setIsError] = useState(false);
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
    if (selectedContacts.length > 0) {
      addChatRooms(selectedContacts);
      closeAndResetError();
    } else {
      setIsError(true);
    }
  };
  const closeAndResetError = () => {
    setIsError(false);
    handleCloseModal();
  };
  return (
    <Modal isOpen={isOpen} onClose={closeAndResetError} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Select Contact(s) to Add to Chat Room</FormLabel>
            {contacts.length === 0 && (
              <Text fontSize="xs" color="red.500">
                No contacts yet. Please add new Contact.
              </Text>
            )}
            {isError && (
              <Text fontSize="xs" color="red.500">
                No contact(s) selected
              </Text>
            )}
            <VStack alignItems="flex-start">
              {contacts.map((contact) => (
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
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreateChat}>
            Create
          </Button>
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={closeAndResetError}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewChatModal;
