import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { v4 as uuid } from "uuid";

interface Props {
  onFormSubmit?(id: string): void;
}

const Login: React.FC<Props> = ({ onFormSubmit = () => {} }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onLogin = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (inputRef && inputRef.current) {
      onFormSubmit(inputRef.current.value);
    }
  };
  const onCreateNewId = () => {
    onFormSubmit(uuid());
  };
  return (
    <Container h="100%">
      <Flex justifyContent="center" h="100%" flexDir="column">
        <Heading as="h1" size="xl">
          Login to ChatApp
        </Heading>
        <Text>(Currently only supports desktop)</Text>
        <Box mt={4}>
          <form onSubmit={onLogin}>
            <FormControl id="userId">
              <FormLabel>User ID</FormLabel>
              <Input
                type="text"
                placeholder="Example: 'aysdh23-21663gb-asdhsabh'"
                ref={inputRef}
              />
            </FormControl>
            <ButtonGroup spacing="6" mt={4}>
              <Button colorScheme="blue" type="submit">
                Login
              </Button>
              <Button
                variant="outline"
                colorScheme="blue"
                onClick={onCreateNewId}
              >
                Create a New ID
              </Button>
            </ButtonGroup>
          </form>
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;
