import {
  Box,
  Center,
  ChakraBaseProvider,
  Container,
  Flex,
  Text,
} from "@chakra-ui/react";
import "./App.css";
import { px } from "framer-motion";

function App() {
  const records = [
    { id: 1, title: "勉強の記録1", time: 1 },
    { id: 2, title: "勉強の記録2", time: 3 },
    { id: 3, title: "勉強の記録3", time: 5 },
  ];

  return (
    <>
      <ChakraBaseProvider>
        <Box>
          <Text fontSize={"x-large"}>学習記録一覧</Text>
          <Box>
            {records.map((record) => {
              return (
                <div key={record.id}>
                  <Flex align={"center"} justifyContent={"space-between"}>
                    <Text>{record.title}</Text>
                    <Text>{record.time}</Text>
                  </Flex>
                </div>
              );
            })}
          </Box>
        </Box>
      </ChakraBaseProvider>
    </>
  );
}

export default App;
