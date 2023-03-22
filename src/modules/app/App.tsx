import styles from "./app.module.css";
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import { ProtectedComponent } from "../components/ProtectedComponent";
import { LoginPage } from "../../pages/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "../../layouts/Header";
import { ToastContainer } from 'react-toastify';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <QueryClientProvider client={queryClient}>
              <Header/>
              <ProtectedComponent />
              <ToastContainer />
            </QueryClientProvider>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
