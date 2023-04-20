import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const Student = lazy(() => import("./pages/Student"));
const Teacher = lazy(() => import("./pages/Teacher"));
function App() {
  return (
    <BrowserRouter>
      <Routes>
    <Route path="/student" element={<Student />} />
      </Routes>
      <Routes>
    <Route path="/teacher" element={<Teacher />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
