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
  Select,
  VStack,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  isOpen: boolean;
  handleCloseModal(): void;
}

const NewChatModal: React.FC<Props> = ({
  isOpen,
  handleCloseModal = () => {},
}) => {
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
              <Checkbox colorScheme="blue" defaultIsChecked>
                Checkbox
              </Checkbox>
            </VStack>
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

export default NewChatModal;
