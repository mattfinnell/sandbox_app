import { Container } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import ExampleDisplay from "./ExampleDisplay";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <div className="App">
        <header className="App-header">
          <Container padding={64}>
            <ExampleDisplay />
          </Container>
        </header>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
