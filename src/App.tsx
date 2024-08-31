import { ChakraBaseProvider, Text } from '@chakra-ui/react'
import './App.css'

function App() {
  return (
    <>
      <ChakraBaseProvider>
        <Text fontSize={"x-large"}>学習記録一覧</Text>
      </ChakraBaseProvider>
    </>
  )
}

export default App
