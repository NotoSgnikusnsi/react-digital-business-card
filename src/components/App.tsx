import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import "../styles//App.css";
import { useEffect, useState } from "react";
import {
  fetchRecords,
  insertRecord,
  deleteRecord,
} from "../services/supabaseClient.ts";
import { Record } from "../types/Record.ts";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [records, setRecords] = useState<Record[]>([]);
  const [title, setTitle] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);

  const loadRecords = async () => {
    setLoading(true);
    const records = await fetchRecords();
    setRecords(records);
    setTotalTime(
      records ? records.reduce((acc, record) => acc + record.time, 0) : 0
    );
    setLoading(false);
  };

  const handleAddRecord = async () => {
    if (title.trim() === "" || time <= 0) {
      alert("学習内容と時間を入力してください");
      return;
    }
    const newRecord: Record = {
      title,
      time,
    };
    const result = await insertRecord(newRecord);
    if (result.length === 0) {
      return;
    } else {
      setRecords((prevRecords) => [...prevRecords, result[0]]);
      setTotalTime((prevTotalTime) => prevTotalTime + result[0].time);
    }
    setTitle("");
    setTime(0);
  };

  const handleDeleteRecord = async (id: string, title: string) => {
    const confirm = window.confirm(`「${title}」を削除しますか？`);
    if (!confirm) return;
    const result = await deleteRecord(id);
    if (result.length === 0) {
      return;
    } else {
      setRecords((prevRecords) =>
        prevRecords.filter((record) => record.id !== id)
      );
      setTotalTime((prevTotalTime) => prevTotalTime - result[0].time);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder="学習時間(h)を入力"
              mb={"4px"}
              type="number"
              value={time === 0 ? "" : time || ""}
              onChange={(e) => setTime(Number(e.target.value))}
            />
            <Flex align={"center"} justifyContent={"space-between"}>
              <Button colorScheme="teal" onClick={handleAddRecord}>
                記録
              </Button>
              <Text>合計学習時間：{totalTime}</Text>
            </Flex>
          </Box>
          <Box>
            {loading ? (
              <Text>読み込み中...</Text>
            ) : (
              records.map((record) => {
                return (
                  <div
                    key={record.id}
                    onClick={() => handleDeleteRecord(record.id!, record.title)}
                  >
                    <Flex align={"center"} justifyContent={"space-between"}>
                      <Text>{record.title}</Text>
                      <Text>{record.time}</Text>
                    </Flex>
                  </div>
                );
              })
            )}
          </Box>
        </div>
      </ChakraProvider>
    </>
  );
}

export default App;
