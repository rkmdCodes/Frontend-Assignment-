import Home from "./pages/Home";
import DataProvider from "../src/contex/DataProvider";

const App = () => {
  return (
    <DataProvider>
      <Home />
    </DataProvider>
  );
};

export default App;
