import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import ResultPage from "./pages/ResultPage";
import FormPage from "./pages/formPage";
const Chart = lazy(() => import("./pages/ChartPage"));

function App() {
  return (
    <Routes>
      <Route index element={<FormPage />} />
      <Route path="result" element={<ResultPage />} />
      <Route
        path="chart"
        element={
          <Suspense fallback={<Loader />}>
            <Chart />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
