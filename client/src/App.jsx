import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const Home = lazy(() => import("./pages/Home"));
function App() {
  return (
    <BrowserRouter>
      <Routes>
    <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
