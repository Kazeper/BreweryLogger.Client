import { Home, Sidebar, BatchList, Storeroom } from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StoreroomProvider, BatchProvider } from "./hooks/context";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Sidebar />
        <div className="content">
          <Routes>
            <Route index element={<Home />} />
            <Route
              path="batches"
              element={
                <BatchProvider>
                  <BatchList />
                </BatchProvider>
              }
            />
            <Route
              path="storeroom"
              element={
                <StoreroomProvider>
                  <Storeroom />
                </StoreroomProvider>
              }
            />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
