import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import "./App.css";
import { useState } from "react";

type Record = {
  id: number;
  title: string;
  time: number;
};

function App() {
  const [records, setRecords] = useState<Record[]>([]);
  const [title, setTitle] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);

  const addLearningRecord = () => {
    if (title === "") {
      alert("学習内容を入力してください");
      return;
    }
    if (time === 0) {
      alert("学習時間を入力してください");
      return;
    }

    const newRecord: Record = {
      id: records.length + 1,
      title: title,
      time: time,
    };
    setRecords([...records, newRecord]);
    setTitle("");
    setTime(0);
    setTotalTime(records.reduce((acc, record) => acc + record.time, 0) + time);
  };

  return (
    <>
      <ChakraProvider>
        <div>
          <Text fontSize={"x-large"} mb={"4px"}>
            学習記録一覧
          </Text>
          <Box mb={"8px"}>
            <Input
              placeholder="学習内容を入力"
              mb={"4px"}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <Input
              placeholder="学習時間(h)を入力"
              mb={"4px"}
              type="number"
              onChange={(e) => setTime(Number(e.target.value))}
              value={time || ""}
            />
            <Flex align={"center"} justifyContent={"space-between"}>
              <Button colorScheme="teal" onClick={addLearningRecord}>
                記録
              </Button>
              <Text>合計学習時間：{totalTime}</Text>
            </Flex>
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
