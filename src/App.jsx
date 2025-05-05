import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./conmponents/ui/Navbar";
import Home from "./conmponents/pages/Home";
import AddTask from "./conmponents/pages/AddTask";
import UpdateTask from "./conmponents/pages/UpdateTask";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/update-task/:id" element={<UpdateTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
