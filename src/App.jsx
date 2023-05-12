import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register"
import File from "./pages/File"
import './style/style.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/file/:send_number/to/:number" element={<File/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
