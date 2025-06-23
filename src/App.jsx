import { Home, Sidebar, BatchList, Storeroom } from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StoreroomProvider, BatchProvider } from "./hooks/context";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

function App() {
  return (
    <MantineProvider>
      <ModalsProvider>
        <BrowserRouter>
          <Notifications />
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
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
