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
import React from "react";

interface Props {
  isOpen: boolean;
  handleCloseModal(): void;
}

const NewContactModal: React.FC<Props> = ({
  isOpen,
  handleCloseModal = () => {},
}) => {
  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Contact</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>User ID</FormLabel>
            <Input
              type="text"
              placeholder="Example: 'aysdh23-21663gb-asdhsabh'"
            />
            <FormHelperText>Your new friend user ID.</FormHelperText>
          </FormControl>
          <FormControl mt={6}>
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="Example: 'John Doe'" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
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
