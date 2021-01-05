import * as React from "react";
import { Box, ChakraProvider, Grid, Heading, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./utils/ColorModeSwitcher";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UserIdPopover from "./components/UserIdPopover";

const App = () => {
  const [userId, setUserId] = useLocalStorage("uuid", "");
  return (
    <ChakraProvider theme={theme}>
      <Grid
        templateColumns="repeat(2, 1fr)"
        p={3}
        bg="rgba(0,0,0,0.1)"
        position="fixed"
        w="100%"
      >
        <Heading as="h1" size="s" alignSelf="center">
          Your ID: <UserIdPopover userId={userId} />
        </Heading>
        <ColorModeSwitcher justifySelf="flex-end" border="1px" />
      </Grid>
      <Box pt="64px" h="100vh">
        {userId ? <Dashboard /> : <Login onFormSubmit={setUserId} />}
      </Box>
    </ChakraProvider>
  );
};

export default App;
