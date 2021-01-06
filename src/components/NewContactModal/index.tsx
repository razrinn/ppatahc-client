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
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { SyntheticEvent, useRef } from "react";
import { useContacts } from "../../contexts/ContactProvider";

interface Props {
  isOpen: boolean;
  handleCloseModal(): void;
}

const NewContactModal: React.FC<Props> = ({
  isOpen,
  handleCloseModal = () => {},
}) => {
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const { addContact } = useContacts();
  const handleCreateContact = (event: SyntheticEvent) => {
    event.preventDefault();
    if (idRef && idRef.current && nameRef && nameRef.current) {
      console.log("masuk");
      addContact({ id: idRef.current.value, name: nameRef.current.value });
      handleCloseModal();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Contact</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="create-contact" onSubmit={handleCreateContact}>
            <FormControl isRequired>
              <FormLabel>User ID</FormLabel>
              <Input
                type="text"
                placeholder="Example: 'aysdh23-21663gb-asdhsabh'"
                ref={idRef}
              />
              <FormHelperText>Your new friend user ID.</FormHelperText>
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Example: 'John Doe'"
                ref={nameRef}
              />
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} type="submit" form="create-contact">
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

export default NewContactModal;
