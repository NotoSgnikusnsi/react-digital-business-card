import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import "./App.css";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

type Record = {
  id?: string;
  title: string;
  time: number;
};

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [records, setRecords] = useState<Record[]>([]);
  const [title, setTitle] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);

  const fetchRecords = async () => {
    try {
      const { data, error } = await supabase.from("study_record").select("*");
      if (error) throw error;
      return data;
    } catch (error) {
      alert("データの取得に失敗しました");
      return [];
    }
  };

  const insertRecord = async (record: Record) => {
    try {
      const { data, error } = await supabase
        .from("study_record")
        .insert([record])
        .select();
      if (error) throw error;
      return data;
    } catch (error) {
      alert("データの記録に失敗しました");
      return [];
    }
  };

  const loadRecords = async () => {
    setLoading(true);
    const records = await fetchRecords();
    setRecords(records);
    setTotalTime(records.reduce((acc, record) => acc + record.time, 0));
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
              value={time === 0 ? "" : time}
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
                  <div key={record.id}>
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
