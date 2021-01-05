import * as React from "react";
import { Box, ChakraProvider, Grid, Text, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./utils/ColorModeSwitcher";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

export const App = () => {
  const [userId, setUserId] = useLocalStorage("uuid", "");
  return (
    <ChakraProvider theme={theme}>
      <Grid p={3} bg="rgba(0,0,0,0.1)" position="fixed" w="100%">
        <ColorModeSwitcher justifySelf="flex-end" border="1px" />
      </Grid>
      <Box pt="64px" h="100vh">
        {userId ? <Dashboard /> : <Login onFormSubmit={setUserId} />}
      </Box>
    </ChakraProvider>
  );
};
