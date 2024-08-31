import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import "./App.css";

function App() {
  const records = [
    { id: 1, title: "勉強の記録1", time: 1 },
    { id: 2, title: "勉強の記録2", time: 3 },
    { id: 3, title: "勉強の記録3", time: 5 },
  ];

  return (
    <>
      <ChakraProvider>
        <div>
          <Text fontSize={"x-large"} mb={"4px"}>
            学習記録一覧
          </Text>
          <Box mb={"8px"}>
            <Input placeholder="学習内容を入力" mb={"4px"} />
            <Input placeholder="学習時間を入力" mb={"4px"} type="number" />
            <Button colorScheme="teal">記録</Button>
          </Box>
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
        </div>
      </ChakraProvider>
    </>
  );
}

export default App;
